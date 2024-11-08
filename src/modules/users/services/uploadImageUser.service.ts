import { Inject, Injectable } from "@nestjs/common";
import { join, resolve } from "path";
import { stat, unlink } from "fs/promises";
import { IUserRepositories } from "../domain/repositories/IUser.repositories";
import { USER_SERVICE_TOKEN } from "../utils/userServiceToken";

@Injectable()
export class UploadImageUserService {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly userRepositories: IUserRepositories,
  ) { }

  async execute(id: number, imageFile: string) {
    const user = await this.userRepositories.findUserById(id);
    const directory = resolve(__dirname, '..', '..', '..', '..', 'uploads', 'users');
    if (user.USER_AVATAR) {
      const userAvatarFilePath = join(directory, user.USER_AVATAR);
      const userAvatarFileExists = await stat(userAvatarFilePath);
      if (userAvatarFileExists) await unlink(userAvatarFilePath);
    }
    return await this.userRepositories.uploadImageUser(id, { USER_AVATAR: imageFile });
  }
}
