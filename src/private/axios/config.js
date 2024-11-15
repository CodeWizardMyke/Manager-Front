import axios from "axios";

const sessionToken = sessionStorage.getItem('token');
const localToken = localStorage.getItem('token');

const token = localToken ? localToken : sessionToken ;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Baerer ' + JSON.parse(token)
}

const fetchAxios =  axios.create({
  baseURL:'http://localhost:1515/api',
  headers: headers,
});

export default fetchAxios;
