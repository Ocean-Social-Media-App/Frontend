import { Post } from "./Post";
import { User } from "./User";

export class Comment {
  commentId: number|undefined;
  commText: string|undefined;
  post: Post = {
  postId: 0,
  postPicUrl: undefined,
  postText: undefined,
  postYouUrl: undefined,
  user: new User()
};
  user: User = {
    userId: undefined,
    username: "",
    password: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    aboutMe: undefined,
    bday: undefined,
    proPicUrl: undefined
  };
}
