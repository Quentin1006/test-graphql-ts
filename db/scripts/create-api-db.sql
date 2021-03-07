CREATE DATABASE job_platform ;

-- DELETE ALL TABLE 
DROP TABLE IF EXISTS company CASCADE;
DROP TABLE IF EXISTS joboffer CASCADE;
DROP TABLE IF EXISTS offerfield CASCADE;
DROP TABLE IF EXISTS field CASCADE;
DROP TABLE IF EXISTS userstatus CASCADE;
DROP TABLE IF EXISTS fieldinterest CASCADE;

CREATE TABLE IF NOT EXISTS joboffer (
	joboffer__id serial NOT NULL PRIMARY KEY ,
	joboffer__company_id INT,
	joboffer__position VARCHAR(255),
	joboffer__startdate INT,
  joboffer__salary INT,
	CONSTRAINT fk_company_id 
		FOREIGN KEY (joboffer__company_id) 
		REFERENCES company(company__id)
	
);
INSERT INTO joboffer(joboffer__company_id,joboffer__position,joboffer__startdate,joboffer__salary) VALUES ('1', 'web dev', '1610312410','45000');
INSERT INTO joboffer(joboffer__company_id,joboffer__position,joboffer__startdate,joboffer__salary) VALUES ('1','software designer','1609621210','55000');
INSERT INTO joboffer(joboffer__company_id,joboffer__position,joboffer__startdate,joboffer__salary) VALUES ('2','IT','1609621210','58000');
INSERT INTO joboffer(joboffer__company_id,joboffer__position,joboffer__startdate,joboffer__salary) VALUES ('3','Software Architect','1609621210','62000');

-- Link a job with multiple fields
CREATE TABLE IF NOT EXISTS offerfield (
	offerfield__id serial NOT NULL PRIMARY KEY,
	offerfield__joboffer_id integer NOT NULL,
	offerfield__field_id integer NOT NULL,
	CONSTRAINT fk_joboffer_id 
		FOREIGN KEY (offerfield__joboffer_id) 
		REFERENCES joboffer(joboffer__id),
    CONSTRAINT fk_field_id 
		FOREIGN KEY (offerfield__field_id) 
		REFERENCES field(field__id)

);
INSERT INTO offerfield(offerfield__joboffer_id,offerfield__field_id) VALUES ('1','1');
INSERT INTO offerfield(offerfield__joboffer_id,offerfield__field_id) VALUES ('1','3');
INSERT INTO offerfield(offerfield__joboffer_id,offerfield__field_id) VALUES ('2','1');
INSERT INTO offerfield(offerfield__joboffer_id,offerfield__field_id) VALUES ('2','3');
INSERT INTO offerfield(offerfield__joboffer_id,offerfield__field_id) VALUES ('3','2');
INSERT INTO offerfield(offerfield__joboffer_id,offerfield__field_id) VALUES ('4','3');

-- List of fields
CREATE TABLE IF NOT EXISTS field (
	field__id serial NOT NULL PRIMARY KEY,
	field__name VARCHAR(255)
);
INSERT INTO field(field__name) VALUES ('web development');
INSERT INTO field(field__name) VALUES ('data science');
INSERT INTO field(field__name) VALUES ('software programming');

CREATE TABLE IF NOT EXISTS company (
	company__id serial NOT NULL PRIMARY KEY ,
	company__name VARCHAR(255),
	company__popularity FLOAT,
	company__size INT
);
INSERT INTO company(company__name,company__popularity,company__size) VALUES ('Softco','3.8', '650');
INSERT INTO company(company__name,company__popularity,company__size) VALUES ('ProgData', '3.2', '3250');
INSERT INTO company(company__name,company__popularity,company__size) VALUES ('Tech-in-touch', '3.6', '60');

-- Whether a user a searching for a job and his demands
CREATE TABLE IF NOT EXISTS userstatus (
	userstatus__id serial NOT NULL PRIMARY KEY,
	userstatus__has_job BOOLEAN,
	userstatus__is_searching BOOLEAN,
	userstatus__user_id INT,
	userstatus__salary_range VARCHAR(255)
);
INSERT INTO userstatus(userstatus__has_job,userstatus__is_searching,userstatus__user_id,userstatus__salary_range) VALUES ('FALSE','TRUE','1','45K-55K');
INSERT INTO userstatus(userstatus__has_job,userstatus__is_searching,userstatus__user_id,userstatus__salary_range) VALUES ('TRUE','TRUE','2','65K-75K');

CREATE TABLE IF NOT EXISTS fieldinterest (
	fieldinterest__id serial NOT NULL PRIMARY KEY ,
	fieldinterest__user_id INT,
	fieldinterest__field_id INT,
    CONSTRAINT fk_fieldinterest_id 
		FOREIGN KEY (fieldinterest__field_id) 
		REFERENCES field(field__id)
);
INSERT INTO fieldinterest(fieldinterest__user_id,fieldinterest__field_id) VALUES ('1','1');
INSERT INTO fieldinterest(fieldinterest__user_id,fieldinterest__field_id) VALUES ('1','2');
INSERT INTO fieldinterest(fieldinterest__user_id,fieldinterest__field_id) VALUES ('1','3');
INSERT INTO fieldinterest(fieldinterest__user_id,fieldinterest__field_id) VALUES ('2','3');
