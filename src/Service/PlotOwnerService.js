import axios from "axios";

const BASE_API_URL = "http://localhost:8080/api/plot-owner"
class PlotOwnerService {

    static async makeAvailable(id) {
        return axios.post(BASE_API_URL +`/available?id=${id}`,{})
    }
    static async makeUnavailable(id) {
        return axios.post(BASE_API_URL +`/unavailable?id=${id}`,{})
    }
}
export default PlotOwnerService;