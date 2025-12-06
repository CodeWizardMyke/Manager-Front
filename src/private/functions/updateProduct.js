import fetchAxios from "../axios/config";

export default async function updateProduct({htmlForm}){
  const formData = new FormData(htmlForm);
  const conURL = "/product/crud/update";
  const headers = {"Content-Type": "multpart/form-data"}

  console.log('formData', formData);


  try {
    console.log('UPDATE PRODUCT')
    const response =  await fetchAxios.post(
      conURL,
      formData,
      headers
    );
    
    console.log('response', response);

    return null;

  } catch (error) {
    return {error:true, error};
  }
};

