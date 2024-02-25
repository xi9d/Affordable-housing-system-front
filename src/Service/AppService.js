import axios from 'axios';
const PRODUCT_API_BASE_URL = "";

class AppService{
   static getAllPlots(){
    return axios.get(PRODUCT_API_BASE_URL + "plots/all",{});
   }
   static getPlotById(id){
      return axios.get(PRODUCT_API_BASE_URL+"plots/plot-details/"+id,{});
   }
   
}

export default AppService;