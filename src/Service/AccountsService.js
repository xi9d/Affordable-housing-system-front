import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

class AccountService {
    static async registerClient(client) {
        try {
            const response = await axios.post(`${BASE_URL}/client/auth/register`, client);
            return response.data;
        } catch (error) {
            throw new Error(`Error registering client: ${error.message}`);
        }
    }

    static async registerPlotOwner(plotOwner) {
        try {
            const response = await axios.post(`${BASE_URL}/plot-owner/auth/register`, plotOwner);
            return response.data;
        } catch (error) {
            throw new Error(`Error registering plot owner: ${error.message}`);
        }
    }

    static async authenticate({ email, password, isLandlord }) {
        try {
            const endpoint = isLandlord ? 'plot-owner/auth/authenticate' : 'client/auth/authenticate';
            const response = await axios.post(`${BASE_URL}/${endpoint}`, { email, password });
            const decodedToken = parseJwt(response.data.token);
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("role", decodedToken.role);
            sessionStorage.setItem("id", decodedToken.id);
            sessionStorage.setItem("username", decodedToken.name);
            const expiration = decodedToken.exp * 1000;
            const logoutTimeout = expiration - Date.now();
            setTimeout(logout, logoutTimeout);

            return decodedToken.sub;
        } catch (error) {
            throw new Error(`Authentication failed: ${error.message}`);
        }
    }

    static editPlotOwner(name, email, password, telephone) {
        return undefined;
    }

    static editAdmin(name, email, password, telephone) {
        return undefined;
    }

    static editClient(name, email, password, telephone) {

        return null;
    }
}

export const logout = async () => {
    try {
        await axios.post(`${BASE_URL}/logout`, {});
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("username");
       sessionStorage.removeItem("model");
    } catch (error) {
        console.error('Error logging out', error);
        throw new Error(`Error logging out: ${error.message}`);
    }
};

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decoding JWT token", error);
        throw new Error(`Error decoding JWT token: ${error.message}`);
    }
}

export default AccountService;
