import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

class AccountService {
    static async registerClient(client) {
        try {
            const response = await axios.post(`${BASE_URL}/client/auth/register`, client);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async authenticate({ email, password, isLandlord }) {
        try {
            const endpoint = isLandlord ? 'plot-owner/auth/authenticate' : 'client/auth/authenticate';
            const response = await axios.post(`${BASE_URL}/${endpoint}`, { email, password });
            const decodedToken = parseJwt(response.data.token);
            sessionStorage.setItem("token", response.data.token);
            localStorage.setItem("token", response.data.token)
            sessionStorage.setItem("authorities", decodedToken.authorities);
            sessionStorage.setItem("id", decodedToken.id);
            sessionStorage.setItem("userName", decodedToken.userName);
            const expiration = decodedToken.exp * 1000;
            const logoutTimeout = expiration - Date.now();
            console.log("logout timeout", logoutTimeout);
            setTimeout(logout, logoutTimeout);
            return decodedToken.sub;
        } catch (error) {
            throw error;
        }
    }

    static async registerPlotOwner(plotOwner) {
        try {
            const response = await axios.post(`${BASE_URL}/plot-owner/auth/register`, plotOwner);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const logout = async () => {
    try {
        await axios.post(`${BASE_URL}/logout`, {});
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("authorities");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("userName");
        localStorage.removeItem("token");
    } catch (error) {
        console.error('Error logging out', error);
        throw error;
    }
};

// Helper function to decode JWT token
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decoding JWT token", error);
        throw error;
    }
}

export default AccountService;
