Begin ;

Drop TABLE IF EXISTS users, posts, actions CASCADE; 

 CREATE TABLE users(
     id SERIAL  NOT NULL PRIMARY KEY,
     userName  VARCHAR(150) Not NULL, 
     email  VARCHAR(100) NULL UNIQUE,
     hashPassword  VARCHAR(100) Not NULL
);

CREATE TABLE  posts (
     id  SERIAL  NOT NULL PRIMARY KEY ,
     userId  INT NOT NULL,
     content TEXT NOT NULL,
     title  VARCHAR(100) NOT NULL,
     imageUrl  VARCHAR(100) NOT NULL,
     category  VARCHAR(15) CHECK ( category  IN('Job','photography','Food','nature')) NOT NULL ,
     CONSTRAINT  posts_userid_foreign  FOREIGN KEY( userId ) REFERENCES  users (id)

);
CREATE TABLE  actions (
     id  SERIAL  PRIMARY KEY,
     content  TEXT NOT NULL,
     userId  INT NOT NULL,
     postId  INT NOT NULL,
     rated  VARCHAR(6) CHECK ( rated  IN('up','down')) NOT NULL ,
     liked  VARCHAR(6) CHECK (liked  IN('true' ,'false')) NOT NULL ,
     CONSTRAINT  actions_userid_foreign  FOREIGN KEY( userId ) REFERENCES  users ( id ),
     CONSTRAINT  actions_postid_foreign  FOREIGN KEY( postId ) REFERENCES  posts ( id )
);
INSERT INTO users (username,email,hashpassword) values( 'salsabeellll','salsabeel@gmail.com','$2a$15$9vd0ZwjKbeqI8QXOx.g56uZGhLpWs1tiJh.1TE41VF6K9/9jf4mei');
INSERT INTO posts (userId,content,title,category,imageUrl)values(1,'for nature','Come Down','nature','https://i.pinimg.com/564x/70/4c/c6/704cc6259dbb985bcb71c515d208bba1.jpg');
commit;
