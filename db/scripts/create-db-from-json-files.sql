CREATE TABLE IF NOT EXISTS users(
   id        VARCHAR(255) NOT NULL PRIMARY KEY
  ,firstName VARCHAR(255) NOT NULL
  ,lastName  VARCHAR(255) NOT NULL
);
INSERT INTO users(id,firstName,lastName) VALUES ('1','Tom','Coleman');
INSERT INTO users(id,firstName,lastName) VALUES ('2','Sashko','Stubailo');
INSERT INTO users(id,firstName,lastName) VALUES ('3','Mikhail','Novikov');



CREATE TABLE IF NOT EXISTS comments(
   id     VARCHAR(255) NOT NULL PRIMARY KEY
  ,userId VARCHAR(255) NOT NULL
  ,text   VARCHAR NOT NULL
  ,postId VARCHAR(255) NOT NULL
);

INSERT INTO comments(id,userId,text,postId) VALUES ('1','2','Nice Post as usual !','1');
INSERT INTO comments(id,userId,text,postId) VALUES ('2','1','Thank you ! Means a lot','1');
INSERT INTO comments(id,userId,text,postId) VALUES ('3','2','Are u planning a more advanced course ?','1');
INSERT INTO comments(id,userId,text,postId) VALUES ('4','1','Sure i''ll keep you posted','1');

CREATE TABLE IF NOT EXISTS posts(
   id       VARCHAR(255) NOT NULL PRIMARY KEY
  ,authorId VARCHAR(255) NOT NULL
  ,title    VARCHAR(255) NOT NULL
  ,votes    INTEGER  NOT NULL
);
INSERT INTO posts(id,authorId,title,votes) VALUES ('1','1','Introduction to GraphQL',2);
INSERT INTO posts(id,authorId,title,votes) VALUES ('2','2','Welcome to Meteor',3);
INSERT INTO posts(id,authorId,title,votes) VALUES ('3','2','Advanced GraphQL',1);
INSERT INTO posts(id,authorId,title,votes) VALUES ('4','3','Launchpad is Cool',7);
INSERT INTO posts(id,authorId,title,votes) VALUES ('5','3','Learn Typescript - Part 1',7);
INSERT INTO posts(id,authorId,title,votes) VALUES ('6','3','Learn Typescript - Part 2',14);
INSERT INTO posts(id,authorId,title,votes) VALUES ('7','3','Learn Typescript - Part 3',10);
INSERT INTO posts(id,authorId,title,votes) VALUES ('8','1','Clean Code',2);
INSERT INTO posts(id,authorId,title,votes) VALUES ('9','1','Clean Architecture',17);
INSERT INTO posts(id,authorId,title,votes) VALUES ('10','3','Learn Java',4);
INSERT INTO posts(id,authorId,title,votes) VALUES ('11','2','Python Basics',2);



