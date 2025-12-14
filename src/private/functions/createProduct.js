import fetchAxios from "../axios/config";

export default async function createProduct({target, thumbnails, advertisings}){
  const formData = new FormData(target);
  
  const conURL = "/product/crud/create";
  const headers = {"Content-Type": "multpart/form-data"}

  if(thumbnails.length > 0) insertImagesFile(thumbnails, 'thumbnails', formData) ;
  if(advertisings.length > 0) insertImagesFile(advertisings, "thumbnails", formData);

  try {
    return await fetchAxios.post(
      conURL,
      formData,
      headers
    );
  } catch (error) {
    return {error:true, error};
  }
};

function insertImagesFile(array, string ,dataToInsert){
  array.forEach( file => dataToInsert.append(string, file));
};