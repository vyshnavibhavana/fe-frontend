import { getApi, postApi } from "../../../helpers/api";

export const addUserTask = (data) => {
    return postApi('api/createTask', data);
};
export const getBoardDetails = () => {
    return getApi('api/getAllTaskData');
};
export const getAssignees = () => {
    return getApi('api/getAllAssignePpl');
};
export const getAnalytics = () => {
    return getApi('api/analytics');
};

export const updateRegister = (data) => {
    return postApi('api/updateRegisteredUser', data);
};
export const addPeople = (data) => {
    return postApi('api/assignpeople', data);
};