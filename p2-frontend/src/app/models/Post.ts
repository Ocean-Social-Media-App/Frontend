import { User } from "./User";

export class Post {
  postId: number|undefined;
  postPicUrl: string|undefined;
  postText: string|undefined;
  postYouUrl: string|undefined;
  user: User  = {
    userId: undefined,
    username: undefined,
    password: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    aboutMe: undefined,
    bday: undefined,
    pro_pic_url: undefined
  }
}
