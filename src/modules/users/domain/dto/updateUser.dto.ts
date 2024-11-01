import { PartialType } from "@nestjs/mapped-types";
import { UserCreateDTO } from "./userCreate.dto";

export class UpdateUserDTO extends PartialType(UserCreateDTO) {}
