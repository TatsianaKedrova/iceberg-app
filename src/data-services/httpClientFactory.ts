import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ConfigService } from "../config/configService";
import { ConfigParam } from "../enums/config-params.enum";

const httpClientFactory = (configService: ConfigService): AxiosInstance => {
  const httpClient = axios.create({
    baseURL: configService.get<string>(ConfigParam.API_URL),
    timeout: 30000,
  });

  const authHeaderInterceptor = (
    config: AxiosRequestConfig
  ): AxiosRequestConfig => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    const clientIdFromLocalStorage = localStorage.getItem("clientId");

    if (tokenFromLocalStorage && config.headers) {
      config.headers.Authorization = `Bearer ${tokenFromLocalStorage}`;
    }

    if (clientIdFromLocalStorage && config.headers) {
      config.headers.currentClientId = clientIdFromLocalStorage;
    }

    return config;
  };

  httpClient.interceptors.request.use(authHeaderInterceptor);

  return httpClient;
};

export default httpClientFactory;

axios.interceptors.request.use(
  function (config) {
    //do smth before request is sent
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(function (response) {
  return response;
},
function (error) {
  return Promise.reject(error)
}
)
