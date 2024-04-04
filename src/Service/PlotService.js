import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

class PlotService {
    static getAllPlots(currentPage, pageSize) {
        return axios.get(`${BASE_URL}/plots/all?page=${currentPage}&size=${pageSize}`, {

        });
    }


    static getPlotById(id) {
        return axios.get(`${BASE_URL}/plots/plot-details?plot-id=${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'withCredentials':true
            },
        });
    }

    static addPlotByPlotOwnerId(id, form_data) {
        console.log(form_data);
        return axios.post(`${BASE_URL}/plot-owner/profile/add?owner-id=${id}`,form_data, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'withCredentials': true
            },
        });
    }

    static async getAllPlotsByRoomType(room) {
        return axios.get(`${BASE_URL}/plots/room-type?type=${room}`, {});
    }

    static async getPlotOwnerDetails(id) {
        return axios.get(`${BASE_URL}/plot-owner/profile?ownerId=${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'withCredentials': true
            },

        });
    }

    static async searchPlots(searchTerm) {
        return axios.get(`${BASE_URL}/plots/search?q=${searchTerm}`,)
    }

    static async getAllCommentsByPlotId(id) {
        return axios.get(BASE_URL +`/plots/comments?id=${id}`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'withCredentials': true
            },
        })

    }

    static async getPlotByFilter(roomType, location2, minPrice, maxPrice) {
        return axios.get(BASE_URL+`/plots/filter?roomType=${roomType}&location2=${location2}&minPrice=${minPrice}&maxPrice=${maxPrice}`,{

        })
    }

    static async addCommentByPlotId(id) {
        
    }

    static async checkIfBookedByPlotId(id) {
        
    }

    static async getPlotOwnerDetailsByPlotId(id) {
        return axios.get(BASE_URL+`/plots/plot-owner/details?plot-id=${id}`,{

        })

    }


    static async getPlotByPlotOwnerId(id) {
        return axios.get(BASE_URL +`/plots/plot-owner?plot-owner-id=${id}`,{})
    }

    static async getRecentlyAddedPlot() {
        return axios.get(BASE_URL +`/plots/recent?limit=6`)
    }

    static async deletePlotByPlotId(ownerId, plotId) {
        return axios.post(BASE_URL+`/profile/delete/plot?ownerId=${ownerId}&plotId=${plotId}`)
    }
}

export default PlotService;
