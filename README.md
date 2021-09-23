# Ocean Social Media App
Social Application to connect with your friends



### Members:



### Resource Links:
* (deployed link to website)
####Repositories
 * Front End - https://github.com/Ocean-Social-Media-App/Frontend.git
 * User Microservice - https://github.com/Ocean-Social-Media-App/UserMicroService.git
 * Feed Microservice - https://github.com/Ocean-Social-Media-App/Feed-Service.git
 * Eureka - https://github.com/Ocean-Social-Media-App/Eureka.git
 * Gateway - https://github.com/Ocean-Social-Media-App/gateway.git
 * JWT - https://github.com/Ocean-Social-Media-App/JWT.git


## Project Parameters

### Users Can :

* Register
  * Email with a welcome email.
* Login/Logout.
* Reset their password.
  * Email new password if they forgot password.
* Modify their information.
* Upload a profile picture (using AWS: S3).
* Search other people.
* Create a post.
  *  Image(s) can be added to these posts (using AWS: S3).
* View his own profile.
  *  Including posts.
* View others’ profile.
  *  Including posts.
* See their feed.
  *  Posts of everyone should show here.
  *  Pagination should be implemented (only fetching 20 posts at a
     time).
* Like someone’s post.
  *  Old school Facebook, only one type of like.



### Roles:

**Fill In Member Roles**


### Programs/Libraries used:

**BackEnd :**

1) Spring MVC
2) Hibernate
3) Java
4) Postgres
5) AWS EC2
6) AWS S3
7) Junit/Mockito/H2
8) Log4J
9) Javadoc
10) Microservice

**FrontEnd :**

1) Angular
2) TypeScript
3) JavaScript
4) Jasmine

**Deployment :**

1) AWS EC2
2) Docker
3) Jenkins




## Backend Requirements

**Tests :**

* Junit
* Mockito
* H2 (creates and drops after test)

**Hibernate :**

* Models
* PostgreSQL


**Register, Models and database**

* Sessions 
* register- email password
* forgot password will email them their temp pass
* Modify info

- Dummy email
- Google interface for handling email
- AWS S3 upload a picture- handle saving URL to database



### Backend endpoints (Need to finalize this list, (this may need to be added to))

|         Action          |           Endpoint            |
| :---------------------: | :---------------------------: |
|        **Login**        |    `POST /api/getOneUser`     |
|       **Logout**        |      `POST /api/Logout`       |
|       **Session**       |   `POST /api/CheckSession`    |
|       **Sign Up**       |    `POST /api/CreateUser`     |
|       **Forgot**        | `POST /api/getUserByUsername` |
|   **Submit Profile**    |   `POST /api/CreateProfile`   |
|   **Update Profile**    |  `PATCH /api/UpdateProfile`   |
|    **Show Profile**     |    `GET /api/getUserById`     |
|      **Add Post**       |    `POST /api/CreatePost`     |
|     **Delete Post**     |    `POST /api/DeletePost`     |
|     **Add Comment**     |    `POST /api/PostComment`    |
|   **Show All Posts**    |     `GET /api/feed`           |
|   **Posts By PostId**   |   `GET /api/post/{postId}`    |
|   **Posts By UserId**   |`GET /api/post/userId/{userId}`|


### Models (Need to finalize this list, (this may need to be added to))

**User Model**

* Integer Id: serial
* String firstname not null
* String lastname not null
* String username Unique not null
* String password not null
* String email Unique not null
* String aboutMe char(250) not null
* Date Birthday int 
* String picUrl not null

**Post Model**

* Integer postId: serial
* String picUrl not null
* String PostText char(250) not null
* Date postTime
* Integer UserFK reference User id

**Comment Model**

* Integer Id: serial
* String CommText char(250) not null
* Integer PostIdFK:
* Integer UserIdFK:			
  	
**Like Composite Model**

* Integer likeId: serial
* Integer PostIdFK:
* Integer UserIdFK:	

## Frontend Requirements

----Link to Diagram of Frontend end result

### Angular (component = comp)

**Views to Display : (this may need to be added to)**

- **Login**
  - Nav Bar comp
  - Login Form comp
  - Forgot Password comp
  - Sign up - directs them to CreateProfile page

- **Profile/Create Profile/update**
  - Nav Bar comp
  - Update Info	
  - Add picture
- **Feed**
  - Nav Bar comp
  - Filter by person
  - (Reuse Create Post Comp to display post?)
  - main Feed (Shows everyone's post)
    - Only show 20 post and load more as needed
- **Create Post**
  - Nav Bar comp??
  - Add image
   - Text- when we create the post
  - Like it
  - comment on (Optional)
