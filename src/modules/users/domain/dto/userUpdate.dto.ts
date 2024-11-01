import { PartialType } from "@nestjs/mapped-types";
import { UserCreateDTO } from "./userCreate.dto";

export class UserUpdateDTO extends PartialType(UserCreateDTO) {}
