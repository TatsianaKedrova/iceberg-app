import { UseMutationResult } from "react-query";
import { AxiosResponse } from "axios";
import { APIResponse } from "../../dtos/authDTO/authentication-result.dto";

export interface IRegistrationFormValues {
  email: string;
  firstName: string;
  lastName: string;
  emailVerificationCode: string;
  password: string;
  passwordConfirmation: string;
  clientIdToJoin: string;
}

export interface IStepperFormProps {
  inputValue?: string | undefined;
  handleNextFunction: () => void;
  mutationResult?: UseMutationResult<
    AxiosResponse<APIResponse<boolean>, any> | undefined,
    unknown,
    void,
    unknown
  >;
}
