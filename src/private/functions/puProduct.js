import fetchAxios from "../axios/config";

export default async function putProduct({htmlForm}) {
  const conURL = "/product/crud/update";
  const headers = {headers:{"Content-Type": "multipart/form-data"}}

  try {
    return await fetchAxios.put(
      conURL,
      htmlForm,
      headers
    );
    
  } catch (error) {
    console.log('error', error)
    return error;
  }
};

