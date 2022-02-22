import {
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsNotEmpty,
  Length,
  Matches,
} from "class-validator";
import { Match } from "./match.decorator";

const regexPassword = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
const regexClientId =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export class FormInputsValidation {
  @IsEmail({}, { message: "Email is invalid" })
  @IsNotEmpty({ message: "Email is required!" })
  email: string;

  @MinLength(3, {
    message: "Name is too short!",
  })
  @MaxLength(30, {
    message: "Name is too long!",
  })
  @IsNotEmpty({ message: "Firstname is required!" })
  firstName: string;

  @MinLength(3, {
    message: "Surname is too short!",
  })
  @MaxLength(30, {
    message: "Surname is too long!",
  })
  @IsNotEmpty({ message: "Lastname is required!" })
  lastName: string;

  @Length(6, 6, { message: "Code length is invalid" })
  @IsNotEmpty({ message: "Confirmation is required!" })
  emailVerificationCode: string;

  @IsString()
  @Matches(regexPassword, {
    message:
      "Password should contain at least 8 characters, one letter and one number",
  })
  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @IsString()
  @Match("password", {message: "Passwords must be the same"})
  @IsNotEmpty({ message: "Password Confirmation is required" })
  passwordConfirmation: string;

  @Matches(regexClientId, {message: "Client Id has incorrect format"})
  @IsNotEmpty({ message: "Client Id is required" })
  clientIdToJoin: string;
}

export class LoginFormTypes {
  @IsEmail({}, { message: "Email is invalid" })
  @IsNotEmpty({ message: "Email is required!" })
  email: string;

  @IsString()
  @Matches(regexPassword, {
    message:
      "Password should contain at least 8 characters, one letter and one number",
  })
  @IsNotEmpty({ message: "Password is required" })
  password: string;


}

export class PasswordRestoreWitEmail {

@IsEmail({}, {message: "Email is invalid"})
@IsNotEmpty({message: "Email is required"})
  email: string;
}