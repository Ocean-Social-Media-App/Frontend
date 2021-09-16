
// Created file so folder is tracked in git
export interface User {
  userId: number|undefined;
  username: string ;
  password: string|undefined;
  email: string|undefined;
  firstName: string|undefined;
  lastName: string|undefined;
  aboutMe: string| undefined;
  bday: Date| undefined;
  proPicUrl: string|undefined;
}
