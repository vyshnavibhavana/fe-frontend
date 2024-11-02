import { postApi } from "../../helpers/api";

export const loginUser = (data) => {
    return postApi('auth/login', data);
};

export const registerUser = (data) => {
    return postApi('auth/register', data);
};