import axios from 'axios';
import { cookies } from '../index'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${cookies.get('token')}`
    return config
}

const tokenErrorInterceptor = error => {

    //ВНИМАНИЕ КОСТЫЛЬ 
    //если с сервера пришел статус "не авторизован", то удаляем все куки и редиректим на страницу авторизации
    if (error.response.status == 401) {
        const { redirect } = error.response.data
        cookies.remove('user')
        cookies.remove('token')
        return window.location.replace(redirect + '?access=denied')
    }
    return Promise.reject(error);

}

$authHost.interceptors.request.use(authInterceptor)
$authHost.interceptors.response.use(response => response, tokenErrorInterceptor)

export {
    $host,
    $authHost
}