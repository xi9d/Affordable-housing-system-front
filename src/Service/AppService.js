import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

class AppService {
    static getAllPlots() {
        return axios.get(`${BASE_URL}/plots/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    }

    static getPlotById(id) {
        return axios.get(`${BASE_URL}/plots/plot-details/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.data);
    }

    static addPlotByPlotOwnerId(id, plot) {
        return axios.post(`${BASE_URL}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
    }

    static async getAllPlotsByRoomType(room) {
        return axios.get(`${BASE_URL}/plots/room-type${room}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    }

    static async getPlotOwnerDetails(id) {
        return axios.get(`${BASE_URL}/plot-owner/${id}/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
}

export default AppService;
