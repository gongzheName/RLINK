import axios from "axios";

// axios.defaults.baseURL = 'http://127.0.0.1/rl/php/';
axios.defaults.baseURL = 'http://127.0.0.1:8888/src/server';
if(window.location.hostname == "127.0.0.1"){
	axios.defaults.baseURL = 'http://127.0.0.1:8888/src/server';
}else if(window.location.hostname == "localhost"){
	axios.defaults.baseURL = 'http://localhost:8888/src/server';
}

axios.defaults.baseURL = "http://101.236.40.233/";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';





export default axios;
