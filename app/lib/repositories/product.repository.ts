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

export async function getAllProduct() {
  const result = await pool.query(
    ` SELECT product_id, a.product_cat_id, product_code, product_name, product_price, product_desc, features, segment_desc, 
      specification, product_image, product_icon, b.category_name 
    FROM public.products a JOIN public.product_cat b ON a.product_cat_id=b.product_cat_id
    WHERE is_active=1
    `,
    []
  );

  return result.rows;
}


/* -------------------- Category ---------------------- */

export async function getProductCategory() {
  const result = await pool.query(
    ` SELECT product_cat_id, category_name, category_desc
    FROM public.product_cat order by ord_num
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
      p.product_name, p.product_code, s.prodstream_name, t.prodtype_name
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


export async function deleteActiveOrder(user_id, sku_id, session_id = 0) {
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


  // Dihapus
  const result = await pool.query(
    ` delete from order_product where user_id=$1 and sku_id=$2 and order_status_id=1
      RETURNING user_id, sku_id
    `,
    [user_id, sku_id]
  );

  // Check All product per product_id
  const rescheck = await pool.query(
    ` select o.sku_id, p.product_id, s.sku_name
      from order_product o 
      join product_sku s on o.sku_id=s.sku_id 
      join products p on s.product_id=p.product_id
      where o.user_id=$1 and o.order_status_id=1 
        and p.product_id= $2 and o.sku_id not in (260098, 260099)
    `,
    [user_id, prodId]
  );


  if(! (rescheck.rowCount || 0 > 0)) {
    const resultIncUT = await pool.query(
      ` delete from order_product where user_id=$1 and sku_id=$2 and order_status_id=1 
        RETURNING user_id, sku_id
      `,
      [user_id, candSKUId]
    );
  }

  return result.rows[0];
}



export async function sendOrderToSales(user_id, session_id=0) {
  const orders = await getSKUByProductOrder(user_id);
  
  const result = await pool.query(
    ` update order_product set order_status_id=2
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