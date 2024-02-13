import axios from 'axios';
import React from 'react'
const PRODUCT_API_BASE_URL = "http://localhost:8080/api/";

class AppService{
   static getAllPlots(){
    return axios.get(PRODUCT_API_BASE_URL + "plots/all",{});
   }
}

export default AppService;