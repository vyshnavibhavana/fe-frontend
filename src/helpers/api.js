import axios from "axios";
import Config from "../Config";

export const getToken = () => {
    try {
        const data = localStorage.getItem('token');;
        console.log("token456", data)
        return data.token;
    } catch (error) {
        // logout()
        return "";
    }
}
export const storeToken = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
}
export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    // window.location.href = "/auth/login";
}
const baseUrl = Config.baseUrl;
const getHeaders = () => {
    return {
        'x-auth-token': getToken()
    };
};

const formatResponse = (data) => {
    return new Promise((resolve, reject) => {
        data
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};
export const getApi = (url, params = "") => {
    const headers = getHeaders();
    const axiosCall = axios.get(baseUrl + url + params, { headers });
    return formatResponse(axiosCall);
};

export const postApi = (url, json) => {
    const headers = getHeaders();
    const axiosCall = axios.post(baseUrl + url, json, { headers });
    return formatResponse(axiosCall);
};

export const putApi = (url, json) => {
    const headers = getHeaders();
    const axiosCall = axios.put(baseUrl + url, json, { headers });
    return formatResponse(axiosCall);
};

export const deleteApi = (url) => {
    const headers = getHeaders();
    const axiosCall = axios.delete(baseUrl + url, { headers });
};