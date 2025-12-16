import fetchAxios from "../axios/config";

export default async function deleteProductApi({product_id}){
  if(!product_id){
    return {error:true, msg: "Product ID is required"};
  }

  const conURL = "/product/crud/destroy";
  const headers = {product_id: product_id}

  try {
    return await fetchAxios.delete(conURL , {headers: headers});
  } catch (error) {
    return {error:true, msg:error};
  }
};