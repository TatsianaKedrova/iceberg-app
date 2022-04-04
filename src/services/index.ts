import AuthenticationService from "./AuthenticationService";
import httpClientFactory from "./httpClientFactory";
import configService from "../containers/config/configService";
import ClientsService from "./ClientsService";
import CloudAccountsService from "./CloudAccountsService";

export const httpClient = httpClientFactory(configService);
export const authService = new AuthenticationService(httpClient);
export const clientService = new ClientsService(httpClient);
export const cloudAccountsService = new CloudAccountsService(httpClient);


