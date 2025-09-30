import axios from "axios";

const sessionToken = sessionStorage.getItem('token');
const localToken = localStorage.getItem('token');
let token = null;

if(localToken){
  token = localToken;
}
else if(sessionToken){
  token = sessionToken;
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Baerer ' + JSON.parse(token)
}

const fetchAxios =  axios.create({
  baseURL:'http://localhost:1515/api',
  headers: headers,
});

export default fetchAxios;
