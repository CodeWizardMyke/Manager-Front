import fetchAxios from "../axios/config";

export default async function searchClients({searchBy, query, size, page }) {
  try {
    let httpURL = "";
    
    if(searchBy ){ httpURL = `/client/search/${searchBy}`; };
    if(!searchBy || searchBy === "" || searchBy === "default"){ httpURL = '/client/search/'; };

    const headers = { clientInstagram:query, size:size, page:page};
    return await fetchAxios.get(httpURL, {headers:headers});

  } catch (error) {
    return {error:true, message:error.message};
  }
}
