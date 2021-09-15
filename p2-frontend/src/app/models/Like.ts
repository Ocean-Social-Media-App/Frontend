import { UserFeedComponent } from "../pages/user-feed/user-feed.component";
import { PostService } from "../services/post/post.service";
import { UserService } from "../services/user/user.service";
import { Post } from "./Post";
import { User } from "./User";

export class Like {
  likeId: number|undefined;
  user1: User  = {
    userId: undefined,
    username: undefined,
    password: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    aboutMe: undefined,
    bday: undefined,
    proPicUrl: undefined
  };
  post: Post = new Post;
}