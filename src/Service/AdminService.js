import axios from "axios";

const BASE_API_URL = "http://localhost:8080/api/admin"
class AdminService {
    static getTotalNumberPlots(){
        return axios.get(BASE_API_URL +"/plots/total",{})
    }
    static getTotalNumberPlotOwner(){
        return axios.get(BASE_API_URL + "/plot-owner/total",{})
    }
    static getTotalNumberClient(){
        return axios.get(BASE_API_URL + "/client/total",{})
    }
}
export default AdminService;