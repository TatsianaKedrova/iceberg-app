import { authService } from "./../services/index";
import { action, computed, makeAutoObservable } from "mobx";
import axios from "axios";
import {
  APIResponse,
  LogInType,
  User,
  UserRegistrationModel,
} from "../dtos/authDTO/authentication-result.dto";
import AuthenticationService from "../services/AuthenticationService";
import clientsStore from "./clients.store";

type isServerError = {
  isEmailError: boolean;
  isPasswordError: boolean;
};

export class AuthStore {
  private accessToken: string | null = null;
  private userInfo: APIResponse<User> | null = null;
  isAuth: boolean = false;
  currentUser: User | null = null;
  isError: isServerError = { isEmailError: false, isPasswordError: false };

  constructor(private readonly authService: AuthenticationService) {
    makeAutoObservable(this);
    this.currentUser = JSON.parse(localStorage.getItem("current_user_data") || "{}");
    this.isAuth = !!localStorage.getItem("token");
  }

  @action
  public getCurrentUser = async () => {
    try {
      const response = await this.authService.getCurrentUser();
      this.currentUser = response.data.data;
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios Error: ", error.message);
      }
    }
  };

  @action
  public registerUser = async (model: UserRegistrationModel) => {
    try {
      const response = await this.authService.registerUser(model);
      if (response.data.data.token) {
        return response;
      } else {
        console.log("Some error occured!!!");
      }
    } catch (error) {
      console.log(new Error(JSON.stringify(error)));
    }
  };

  @action
  public logIn = async (loginInfo: LogInType) => {
    try {
      const response = await this.authService.logIn(loginInfo);
      if (response.data.status === "success") {
        const token = response.data.data.token;
        this.setToken(token);
        this.isAuth = true;
        this.currentUser = response.data.data.user;
        this.setUserStorage(response.data.data.user);
    return response;
      }
    } catch (error: any) {
      //  const errorAxios = error as AxiosError
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data.errorDetails.fieldSpecificMessages.email !==
          undefined
        ) {
          this.isError.isEmailError = true;
        } else if (
          error.response?.data.errorDetails.fieldSpecificMessages.password !==
          undefined
        ) {
          this.isError.isPasswordError = true;
        }
      } else {
        console.log("Stock Error: ", new Error(JSON.stringify(error)));
      }
    }
  };

  @action("logout")
  public logOut = () => {
    this.setToken(null);
    this.setUserStorage(null);
    clientsStore.selectedClientName = null;
    clientsStore.clientId = null;
    this.isAuth = false;
  };

  @action("tokenHandler")
  public setToken = async (token: string | null): Promise<void> => {
    if (token) {
      localStorage.setItem("token", token);
      this.accessToken = token;
      await this.refreshUserData();
    } else {
      this.removeToken();
    }
  };

  @action
  public setUserStorage = (user: User | null) => {
    localStorage.setItem("current_user_data", JSON.stringify(user));
  };

  @action
  public removeToken = (): void => {
    localStorage.removeItem("token");
    this.accessToken = null;
    this.removeUserInfo();
  };

  @action("current_user_data")
  public setUserInfo = (user: APIResponse<User>): void => {
    this.userInfo = user;
  };

  @action
  public refreshUserData = async (): Promise<APIResponse<User>> => {
    const { data: userData } = await this.authService.getCurrentUser();
    this.setUserInfo(userData);
    return userData;
  };

  @action
  public removeUserInfo = (): void => {
    localStorage.removeItem("userInfo");
    this.userInfo = null;
  };

  @computed
  get isAuthenticated() {
    return this.isAuth;
  }

  @computed
  get token() {
    return this.accessToken;
  }

  @computed
  get user() {
    return this.userInfo;
  }
}

const authStore = new AuthStore(authService);
export default authStore;
