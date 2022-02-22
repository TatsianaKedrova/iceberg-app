import { AxiosInstance, AxiosResponse } from "axios";
import {
  APIResponse,
  LogInType,
  AuthenticationResult,
  User,
  VerifyCodeType,
  UserRegistrationModel,
  ClientInvite,
} from "../dtos/authDTO/authentication-result.dto";

class AuthenticationService {
  constructor(private readonly httpClient: AxiosInstance) {}

  public async registerUser(
    model: UserRegistrationModel
  ): Promise<AxiosResponse<APIResponse<AuthenticationResult>>> {
    return this.httpClient.post<APIResponse<AuthenticationResult>>(
      "auth/register",
      model
    );
  }

  public async logIn(
    loginInfo: LogInType
  ): Promise<AxiosResponse<APIResponse<AuthenticationResult>>> {
    return this.httpClient.post<APIResponse<AuthenticationResult>>(
      "auth/signin-with-credentials",
      loginInfo
    );
  }

  public async getCurrentUser(): Promise<AxiosResponse<APIResponse<User>>> {
    return this.httpClient.get<APIResponse<User>>("auth/current-user");
  }

  public async sendVerificationCode(
    value: string
  ): Promise<AxiosResponse<APIResponse<string>>> {
    return this.httpClient.post<APIResponse<string>>(
      "auth/send-verification-code",
      { value }
    );
  }

  public async verifyCode(
    value: VerifyCodeType
  ): Promise<AxiosResponse<APIResponse<boolean>>> {
    return this.httpClient.post<APIResponse<boolean>>(
      "auth/verify-code",
      value
    );
  }

  public async verifyIsEmailTaken(
    value: string
  ): Promise<AxiosResponse<APIResponse<boolean>>> {
    return this.httpClient.post<APIResponse<boolean>>("auth/is-email-taken", {
      value,
    });
  }
  public async isClientAllowsToJoin(
    clientId: string
  ): Promise<AxiosResponse<APIResponse<boolean>>> {
    return this.httpClient.get<APIResponse<boolean>>(
      `auth/is-client-allows-to-join/${clientId}`
    );
  }

  public async getInfoOnRegistrationInvite(
    id: string
  ): Promise<AxiosResponse<APIResponse<ClientInvite>>> {
    return this.httpClient.get<APIResponse<ClientInvite>>(
      `auth/invite-info/${id}`
    );
  }
  public async isRegistrationWithoutInvitationAllowed(): Promise<
    AxiosResponse<APIResponse<boolean>>
  > {
    return this.httpClient.get<APIResponse<boolean>>(
      "auth/is-reg-without-invite-allowed"
    );
  }

  public async requestPasswordRestoration(value: string): Promise<
    AxiosResponse<APIResponse<boolean>>
  > {
    return this.httpClient.post<APIResponse<boolean>>(
      "password-restoration/request", {value}
    );
  }
}

export default AuthenticationService;
