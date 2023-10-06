import axios from "axios";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
// import { useDispatch } from 'react-redux'
import { setUser } from "./redux/userSlice"
import { store } from  "./redux/store"

// const dispatch = useDispatch()

const cookies = new Cookies();

export const axiosJWT = axios.create()

axiosJWT.interceptors.request.use(
    async (config) => {
      // console.log("interceptor");
        if (cookies.get("token") === undefined) {
            // console.log("token expired");
            const data = await refreshToken();
            config.headers["authorization"] = "Bearer " + data.token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:3333/admin/auth/refresh", { token: cookies.get("refreshToken") });

      const token = res.data.token;
      const decoded: any = jwt(token);

      const refreshToken = res.data.refreshToken;
      const decodedRefresh: any = jwt(refreshToken);

      cookies.set('token', token, { expires: new Date(decoded.exp * 1000) });
      cookies.set('refreshToken', refreshToken, { expires: new Date(decodedRefresh.exp * 1000) });

      return res.data;
    } catch (err) {
      console.log(err);
    }
}

export const logout = async () => {
    const refreshToken = cookies.get('refreshToken');

    try {
        await axiosJWT.post('http://localhost:3333/admin/auth/logout', { refreshToken }, {
            headers: {
                Authorization: `Bearer ${cookies.get('token')}`,
            },
        });
    } catch (error) {
        console.error('User:', error);
    }

    cookies.remove('token');
    cookies.remove('refreshToken');
};
