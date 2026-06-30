import {getSKUProduct} from "@/app/lib/repositories/product.repository"

export function getListSKUProduct() {
  
    const list = getSKUProduct();

  return list;
}