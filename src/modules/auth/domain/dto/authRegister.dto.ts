import { PartialType } from "@nestjs/mapped-types";
import { UserCreateDTO } from "src/modules/users/domain/dto/userCreate.dto";

export class AuthRegisterDTO extends PartialType(UserCreateDTO) { }
