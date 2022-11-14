import axios from "axios";
import {toast} from "react-toastify";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["x-branch-id"] = localStorage.getItem("branch_id");
// axios.defaults.headers.common["x-branch-id"] =7;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
axios.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return req;
}, null);
axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        toast.error(error.response, {
            position: 'top-right',
            closeOnClick: true
        })
    } else {
        console.log(error)
    }
    return Promise.reject(error.response)
})

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
};