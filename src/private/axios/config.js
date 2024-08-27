import axios from "axios";

const sessionToken = sessionStorage.getItem('token');
const localToken = localStorage.getItem('token');

const token = localToken ? localToken : sessionToken ;

const fetchAxios =  axios.create({
  baseURL:'http://localhost:1515/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

export default fetchAxios;
