Begin ;

Drop TABLE IF EXISTS users, posts, actions CASCADE; 

 CREATE TABLE users(
     id SERIAL  NOT NULL PRIMARY KEY,
     userName  VARCHAR(150) Not NULL, 
     email  VARCHAR(100) NOT NULL UNIQUE,
     imageUrl VARCHAR(200) DEFAULT 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png' ,
     coverUrl VARCHAR(200) DEFAULT 'https://thumbs.dreamstime.com/b/green-light-background-wide-banner-design-template-digital-illustration-177834923.jpg',
     hashPassword  VARCHAR(100) Not NULL
);

CREATE TABLE  posts (
     id  SERIAL  NOT NULL PRIMARY KEY ,
     userId  INT NOT NULL,
     content TEXT NOT NULL,
     title  VARCHAR(100) NOT NULL,
     imageUrl  VARCHAR(200) NOT NULL,
     category  VARCHAR(15) CHECK ( category  IN('Job','Photography','Food','Nature')) NOT NULL ,
     CONSTRAINT  posts_userid_foreign  FOREIGN KEY( userId ) REFERENCES  users (id)

);
CREATE TABLE  actions (
     id  SERIAL  PRIMARY KEY,
     content  TEXT,
     userId  INT NOT NULL,
     postId  INT NOT NULL,
     rated  INT CHECK ( rated  IN( 0 , 1)) DEFAULT 0 ,
     liked  INT CHECK (liked  IN(0,1)) DEFAULT 0 ,
     CONSTRAINT  actions_userid_foreign  FOREIGN KEY( userId ) REFERENCES  users ( id ) on Delete CASCADE  ,
     CONSTRAINT  actions_postid_foreign  FOREIGN KEY( postId ) REFERENCES  posts ( id ) on Delete CASCADE 
);
CREATE VIEW  userInfo AS SELECT id ,email,userName,imageUrl,coverURL FROM users ;

INSERT INTO users (username,email,hashpassword,imageUrl,coverUrl) values( 'salsabeellll','salsabeel@gmail.com','$2a$15$9vd0ZwjKbeqI8QXOx.g56uZGhLpWs1tiJh.1TE41VF6K9/9jf4mei','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFguEnc8wQ4P3GCFpOewx0YpSDExsrP5k_kZycCBBbCozMHVjzYD6PFQqYo3Iwonj_NNs&usqp=CAU','https://www.w3schools.com/howto/img_nature_wide.jpg');
INSERT INTO users (username,email,hashpassword,imageUrl,coverUrl) values( 'omar alnajjar','omar@gmail.com','$2a$15$9vd0ZwjKbeqI8QXOx.g56uZGhLpWs1tiJh.1TE41VF6K9/9jf4mei','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFguEnc8wQ4P3GCFpOewx0YpSDExsrP5k_kZycCBBbCozMHVjzYD6PFQqYo3Iwonj_NNs&usqp=CAU','https://www.w3schools.com/howto/img_nature_wide.jpg');
INSERT INTO users (username,email,hashpassword,imageUrl,coverUrl) values( 'tasneem alnajjar','tasneem@gmail.com','$2a$15$9vd0ZwjKbeqI8QXOx.g56uZGhLpWs1tiJh.1TE41VF6K9/9jf4mei','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFguEnc8wQ4P3GCFpOewx0YpSDExsrP5k_kZycCBBbCozMHVjzYD6PFQqYo3Iwonj_NNs&usqp=CAU','https://www.w3schools.com/howto/img_nature_wide.jpg');

INSERT INTO posts (userId,content,title,category,imageUrl)values(1,'for nature','Come Down','Nature','https://i.pinimg.com/564x/70/4c/c6/704cc6259dbb985bcb71c515d208bba1.jpg');
INSERT INTO posts (userId,content,title,category,imageUrl)values(2,'Enjoy the taste','Paste','Food','https://images.getrecipekit.com/20220211142347-margherita-9920.jpg?aspect_ratio=4:3&quality=90&');
INSERT INTO posts (userId,content,title,category,imageUrl)values(3,'Enjoy the taste','alahram','Photography','https://images.skynewsarabia.com/images/v1/2020/02/12/1320298/1200/675/1-1320298.jpg');
INSERT INTO posts (userId,content,title,category,imageUrl)values(3,'for Prefec job','UI UX','Job','https://img.freepik.com/free-vector/realistic-ui-ux-landing-page-template_52683-68898.jpg?w=740&t=st=1662636386~exp=1662636986~hmac=2a6b3bfb660918f1913eb870649458aed0b1a090beb9038fdac9957c5606a5ec');

INSERT INTO actions(userId, postId ,rated,liked ) values (1, 1, 1 ,1);
INSERT INTO actions(userId, postId ,rated,liked ) values (2, 2, 1 ,0);
INSERT INTO actions(userId, postId ,rated,liked ) values (3, 2, 0 ,1);
INSERT INTO actions(userId, postId ,rated,liked ) values (3, 3, 0 ,1);
INSERT INTO actions(userId, postId ,rated,liked ) values (1, 3, 1 ,1);
INSERT INTO actions(userId, postId ,rated,liked ) values (2, 1, 1 ,1);
commit;
