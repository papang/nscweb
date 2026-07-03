import { pool } from "../db";
import bcrypt from "bcryptjs";


export async function getProductById(product_id: number) {
  const result = await pool.query(
    ` SELECT product_id, product_cat_id, product_code, product_name, product_price, product_desc, features, segment_desc, 
      specification, product_image, product_icon 
    FROM public.products
    WHERE product_id = $1 
    `,
    [product_id]
  );

  return result.rows[0];
}

export async function getProductByCode(product_code: string) {
  const result = await pool.query(
    ` SELECT product_id, product_cat_id, product_code, product_name, product_price, product_desc, features, segment_desc, 
      specification, product_image, product_icon 
    FROM public.products
    WHERE product_code = $1 
    `,
    [product_code]
  );

  return result.rows[0];
}

export async function getProductByCategory(product_cat_id: number) {
  const result = await pool.query(
    ` SELECT product_id, product_cat_id, product_code, product_name, product_price, product_desc, features, segment_desc, 
      specification, product_image, product_icon 
    FROM public.products
    WHERE product_cat_id = $1 
    `,
    [product_cat_id]
  );

  return result.rows;
}

export async function getAllService() {
  const result = await pool.query(
    ` select s.service_id, s.service_cat_id, s.service_code, s.service_name, s.service_desc, 
      s.service_img, s.service_icon, s.spec_attributes, c.cat_name, c.cat_desc
      from services s JOIN p_service_cat c ON s.service_cat_id=c.service_cat_id 
      where s.isactive=1 and s.hier_code='SERV'
      order by s.ord_num
    `,
    []
  );

  return result.rows;
}


/* -------------------- Category ---------------------- */

export async function getServiceCategory() {
  const result = await pool.query(
    ` SELECT service_cat_id, cat_name, cat_desc
    FROM public.p_service_cat order by ord_num
    `,
    []
  );

  return result.rows;
}



/* -------------------- SKU ---------------------- */

export async function getSKUProduct() {
  const result = await pool.query(
    ` select sku.sku_id, sku.product_id, sku.prodstream_code, sku.prodtype_code, 
      sku.spec_mir_up, sku.spec_mir_down, sku.unit_price, sku.sku_name, 
      p.product_name, p.product_code, s.prodstream_name, t.prodtype_name
      from product_sku sku
      join products p on sku.product_id=p.product_id
      join product_stream s on sku.prodstream_code=s.prodstream_code
      join product_type t on sku.prodtype_code=t.prodtype_code;
    `,
    []
  );

  return result.rows;
}


export async function getSKUByProduct() {
  const tmpresult = await pool.query(
    ` select sku.sku_id, sku.product_id, sku.prodstream_code, sku.prodtype_code, 
      sku.spec_mir_up, sku.spec_mir_down, sku.unit_price, sku.sku_name, 
      p.product_name, p.product_code, s.prodstream_name, t.prodtype_name
      from product_sku sku
      join products p on sku.product_id=p.product_id
      join product_stream s on sku.prodstream_code=s.prodstream_code
      join product_type t on sku.prodtype_code=t.prodtype_code;
    `,
    []
  );

  const grouped = tmpresult.rows.reduce((acc, item) => {
    if (!acc[item.product_id]) {
      acc[item.product_id] = [];
    }

    acc[item.product_id].push(item);

    return acc;
  }, {});

  return grouped;
}

export async function getSKUByProductNoOTC() {
  const tmpresult = await pool.query(
    ` select sku.sku_id, sku.product_id, sku.prodstream_code, sku.prodtype_code, 
      sku.spec_mir_up, sku.spec_mir_down, sku.unit_price, sku.sku_name, 
      p.product_name, p.product_code, s.prodstream_name, t.prodtype_name, 'M' as territory, 'Dedicated' as type
      from product_sku sku
      join products p on sku.product_id=p.product_id
      join product_stream s on sku.prodstream_code=s.prodstream_code
      join product_type t on sku.prodtype_code=t.prodtype_code 
      where sku.sku_id not in (260098, 260099);
    `,
    []
  );

  const grouped = tmpresult.rows.reduce((acc, item) => {
    if (!acc[item.product_id]) {
      acc[item.product_id] = [];
    }

    acc[item.product_id].push(item);

    return acc;
  }, {});

  return grouped;
}



export async function getServiceLine() {
  const tmpresult = await pool.query(
    ` select s.service_id sku_id, s.service_code, s.service_name, 
      s.unit_price, s.sales_price,
      s.service_img, s.charge_type_code, s.hier_code, s.spec_attributes, 
      bw.service_name service_bw_name, t.service_code territory_code, 
      t.service_name territory_name, net.service_id net_service_id
      from services s 
      JOIN services bw ON s.service_parent_id=bw.service_id
      JOIN services t ON bw.service_parent_id=t.service_id
      JOIN services net ON t.service_parent_id=net.service_id
      where s.hier_code in ('LINE', 'CPE') and s.isactive=1 
    `,
    []
  );

  const grouped = tmpresult.rows.reduce((acc, item) => {
    if (!acc[item.net_service_id]) {
      acc[item.net_service_id] = [];
    }

    acc[item.net_service_id].push(item);

    return acc;
  }, {});

  return grouped;
}


/**
 * Order Product
 */

export async function insertOrder(user_id, sku_id, session_id = 0) {
  const checkProdId = await pool.query(
    ` select s.product_id from product_sku s 
      where s.sku_id=$1 and s.sku_id not in (260098, 260099) 
    `, 
    [sku_id]
  );

  const prodId = checkProdId.rows[0].product_id || 0;

  let candSKUId = 0;

  if(prodId == 1) {
    candSKUId = 260098;
  } else if(prodId == 2) {
    candSKUId = 260099;
  }

  const result = await pool.query(
    ` insert into order_product(user_id, session_id, sku_id) 
      values($1, $2, $3)
      RETURNING user_id, session_id, sku_id
    `,
    [user_id, session_id, sku_id]
  );


  const rescheck = await pool.query(
    ` select o.sku_id, p.product_id, s.sku_name
      from order_product o 
      join product_sku s on o.sku_id=s.sku_id 
      join products p on s.product_id=p.product_id
      where o.user_id=$1 and o.sku_id=$2 and o.order_status_id=1 
        and p.product_id= $3
    `,
    [user_id, candSKUId, prodId]
  );

  // const isIncludedUT = (rescheck.rowCount || 0 > 0);

  if(! (rescheck.rowCount || 0 > 0)) {
    const resultIncUT = await pool.query(
      ` insert into order_product(user_id, session_id, sku_id) 
        values($1, $2, $3)
        RETURNING user_id, session_id, sku_id
      `,
      [user_id, session_id, candSKUId]
    );
  }

  return result.rows[0];
}

export async function deleteActiveOrder(user_id, sku_id, session_id) {
  // Dihapus
  const result = await pool.query(
    ` delete from order_items 
      where user_id=$1 and ref_sku_id=$2 and session_id=$3 and order_status_id=1
      RETURNING user_id, sku_id
    `,
    [user_id, sku_id, session_id]
  );

  return result.rows[0];
}




// ---- New Sales Order
export async function insertNewOrder(user_id, session_id, sku_id, ref_sku_id, sku_code, sku_name, sales_price) {
  const result = await pool.query(
    ` insert into order_items(user_id, session_id, sku_id, ref_sku_id, sku_code, sku_name, sales_price) 
      values($1, $2, $3, $4, $5, $6, $7)
    `,
    [user_id, session_id, sku_id, ref_sku_id, sku_code, sku_name, sales_price]
  );

  return result.rows[0];
}



export async function sendOrderToSales(user_id, session_id="0") {
  const orders = await getSKUCurrentOrder(user_id, session_id);
  
  const result = await pool.query(
    ` update order_items set order_status_id=2
      where (user_id=$1 or session_id=$2) and order_status_id=1  
    `,
    [user_id, session_id]
  );

  const result2 = await pool.query(
    ` select id, username, email, phone_no from users 
      where id = $1 
    `,
    [user_id]
  );  

  const hasil = { 
    "person" : result2.rows[0],
    "orders" : orders,
  }

  return hasil;
}


export async function getSKUByProductOrder(user_id, session_id='0') {
  const result = await pool.query(
    ` select sku.sku_id, sku.product_id, sku.prodstream_code, sku.prodtype_code, 
      sku.spec_mir_up, sku.spec_mir_down, sku.unit_price, sku.sku_name, 
      p.product_name, p.product_code, s.prodstream_name, t.prodtype_name
      from product_sku sku
      join products p on sku.product_id=p.product_id
      join product_stream s on sku.prodstream_code=s.prodstream_code
      join product_type t on sku.prodtype_code=t.prodtype_code 
      join order_product o on o.sku_id=sku.sku_id
      where order_status_id=1 and (o.user_id=$1 or o.session_id=$2)
      order by sku.product_id, sku.sku_id
    `,
    [user_id, session_id]
  );

  // const grouped = tmpresult.rows.reduce((acc, item) => {
  //   if (!acc[item.product_id]) {
  //     acc[item.product_id] = [];
  //   }

  //   acc[item.product_id].push(item);

  //   return acc;
  // }, {});

  return result.rows;
}

export async function getSKUCurrentOrder(user_id, session_id='0') {
  const result = await pool.query(
    ` select o.order_item_id, o.sku_id, o.ref_sku_id, o.sku_code, 
      o.sku_name, o.sales_price, o.sku_notes, o.sales_price, 
      s.spec_attributes, s.charge_type_code, 
      bw.service_name service_bw_name, 
      t.service_code territory_code, t.service_name territory_name, 
      net.service_id net_service_id, net.service_name net_service_name
      from order_items o 
      JOIN services s ON o.sku_id=s.service_id
      JOIN services bw ON s.service_parent_id=bw.service_id
      JOIN services t ON bw.service_parent_id=t.service_id
      JOIN services net ON t.service_parent_id=net.service_id
      where o.order_status_id=1 and (o.user_id=$1 or o.session_id=$2)
      order by net.service_id, o.sku_id
    `,
    [user_id, session_id]
  );

  return result.rows;
}


export async function getSKUOrderSummaryByService(user_id, session_id='0') {
  const result = await pool.query(
    ` select net.service_id, net.service_name, net.service_icon, 
      sum(o.sales_price) total_price
      from order_items o 
      JOIN services s ON o.sku_id=s.service_id
      JOIN services bw ON s.service_parent_id=bw.service_id
      JOIN services t ON bw.service_parent_id=t.service_id
      JOIN services net ON t.service_parent_id=net.service_id
      where o.order_status_id=1 and (o.user_id=$1 or o.session_id=$2)
      group by net.service_id, net.service_name, net.service_icon
      order by net.service_id
    `,
    [user_id, session_id]
  );

  return result.rows;
}

export async function getSKUOrderSummaryByChargeType(user_id, session_id='0') {
  const result = await pool.query(
    ` select s.charge_type_code, 
      sum(o.sales_price) total_price
      from order_items o 
      JOIN services s ON o.sku_id=s.service_id
      JOIN services bw ON s.service_parent_id=bw.service_id
      JOIN services t ON bw.service_parent_id=t.service_id
      JOIN services net ON t.service_parent_id=net.service_id
      where o.order_status_id=1 and (o.user_id=$1 or o.session_id=$2)
      group by s.charge_type_code
    `,
    [user_id, session_id]
  );

  return result.rows;
}


export async function getSKUByProductSum(user_id, session_id='0') {
  const result = await pool.query(
    ` select 
      p.product_name, p.product_icon, sum(sku.unit_price) total_price
      from product_sku sku
      join products p on sku.product_id=p.product_id
      join product_stream s on sku.prodstream_code=s.prodstream_code
      join product_type t on sku.prodtype_code=t.prodtype_code 
      join order_product o on o.sku_id=sku.sku_id
      where order_status_id=1 and (o.user_id=$1 or o.session_id=$2) 
      group by p.product_name, p.product_icon;
    `,
    [user_id, session_id]
  );

  return result.rows;
}