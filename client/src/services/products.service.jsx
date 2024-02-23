import { useContext} from "react";
import { ContextConfig } from "../context/ContextConfig.jsx";


// TODO aca poner todos los fetch products
export default class ServiceProducts {
  constructor () {
    const { uriBase } = useContext ( ContextConfig );
    this.uriBase =  uriBase;
    this.headers = { "Content-Type": "application/json" };
  }

  get = async () => await (await fetch(`${this.uriBase}api/products/`)).json();
  
}

// import dotenv from "dotenv";

// dotenv.config();

// const URI_BASE = process.env.REACT_APP_API_URL;

// class ApiService {

//   constructor() {
//     this.headers = {
//       "Content-Type": "application/json",
//     };
//   }

//   async get(endpoint) {
//     const response = await fetch(`${URI_BASE}${endpoint}`, {
//       method: "GET",
//       headers: this.headers,
//     });
//     return await response.json();
//   }

//   async post(endpoint, data) {
//     const response = await fetch(`${URI_BASE}${endpoint}`, {
//       method: "POST",
//       headers: this.headers,
//       body: JSON.stringify(data),
//     });
//     return await response.json();
//   }

//   async put(endpoint, data) {
//     const response = await fetch(`${URI_BASE}${endpoint}`, {
//       method: "PUT",
//       headers: this.headers,
//       body: JSON.stringify(data),
//     });
//     return await response.json();
//   }

//   async delete(endpoint) {
//     const response = await fetch(`${URI_BASE}${endpoint}`, {
//       method: "DELETE",
//       headers: this.headers,
//     });
//     return await response.json();
//   }
// }

// export default new ApiService();
