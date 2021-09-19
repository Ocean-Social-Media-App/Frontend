import { Post } from "./Post";
import { User } from "./User";

export class Comment {
  commentId: number;
  commText: string;
  post: Post;
  user: User;
}
