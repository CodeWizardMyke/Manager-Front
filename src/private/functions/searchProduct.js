import fetchAxios from "../axios/config";

export default async function searchProduc({searchBy, query, size, page }) {
  try {
    let httpURL = "";

    
    if(searchBy ){ httpURL = `/product/search/${searchBy}`; };
    if(!searchBy || searchBy === "" || searchBy === "default"){ httpURL = '/product/crud/read'; };

    const headers = { query:query, size:size, page:page};
    return await fetchAxios.get(httpURL, {headers:headers});

  } catch (error) {
    return {error:true, message:error.message};
  }
}
