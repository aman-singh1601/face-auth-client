import axios from "axios";

const instance = axios.create({
    baseURL: 'https://face-auth-server-fsp0.onrender.com',
    // baseURL: "http://localhost:6969"
});


// instance.interceptors.request.use((req) => {
//     if (localStorage.getItem("token")) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`;
//     }
//     return req;
// });


export default instance;