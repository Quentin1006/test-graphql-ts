CREATE DATABASE job_platform IF NOT EXISTS;

CREATE TABLE IF NOT EXISTS job_offer (
	id INT NOT NULL PRIMARY KEY ,
	company_id INT,
	position VARCHAR(255),
	startdate INT
);
INSERT INTO "job_offer" ("id", "company_id", "position", "startdate") VALUES ('1', '1', '"web dev"', '1610312410');
INSERT INTO job_offer(id,company_id,position,startdate) VALUES ('2','1',"software designer",'1609621210');
INSERT INTO job_offer(id,company_id,position,startdate) VALUES ('3','2','"IT"','1609621210');
INSERT INTO job_offer(id,company_id,position,startdate) VALUES ('4','3','"Software Architect"','1609621210');


-- Link a job with multiple fields
CREATE TABLE IF NOT EXISTS job_field (
	"id" serial NOT NULL PRIMARY KEY,
    "job_id" integer NOT NULL,
    "field_id" integer NOT NULL
);
INSERT INTO job_field(job_id,field_id) VALUES ('1','1');
INSERT INTO job_field(job_id,field_id) VALUES ('1','3');
INSERT INTO job_field(job_id,field_id) VALUES ('2','1');
INSERT INTO job_field(job_id,field_id) VALUES ('2','3');
INSERT INTO job_field(job_id,field_id) VALUES ('3','2');
INSERT INTO job_field(job_id,field_id) VALUES ('4','3');

-- List of fields
CREATE TABLE IF NOT EXISTS field (
	id serial NOT NULL PRIMARY KEY,
	name VARCHAR(255)
);
INSERT INTO field(name) VALUES ('"web development"');
INSERT INTO field(name) VALUES ('"data science"');
INSERT INTO field(name) VALUES ('"software programming"');

CREATE TABLE IF NOT EXISTS company (
	id INT NOT NULL PRIMARY KEY ,
	name VARCHAR(255),
	popularity FLOAT,
	size INT
);
INSERT INTO company(name,popularity,size) VALUES ('Softco','3.8', '650');
INSERT INTO company(name,popularity,size) VALUES ('ProgData', '3.2', '3250');
INSERT INTO company(name,popularity,size) VALUES ('Tech-in-touch', '3.6', '60');

-- Whether a user a searching for a job and his demands
CREATE TABLE IF NOT EXISTS user_status (
	id serial NOT NULL PRIMARY KEY,
	has_job BOOLEAN,
	is_searching BOOLEAN,
	user_id INT,
	salary_range VARCHAR(255)
);
INSERT INTO user_status(has_job,is_searching,user_id,salary_range) VALUES ('FALSE','TRUE','1','45K-55K');
INSERT INTO user_status(has_job,is_searching,user_id,salary_range) VALUES ('TRUE','TRUE','2','65K-75K');



CREATE TABLE IF NOT EXISTS field_interest (
	id serial NOT NULL PRIMARY KEY ,
	user_id INT,
	field_id INT
);
INSERT INTO field_interest(user_id,field_id) VALUES ('1','1');
INSERT INTO field_interest(user_id,field_id) VALUES ('1','2');
INSERT INTO field_interest(user_id,field_id) VALUES ('1','3');
INSERT INTO field_interest(user_id,field_id) VALUES ('2','3');


