CREATE TABLE IF NOT EXISTS users(
	user_id VARCHAR(120) NOT NULL,
    user_name VARCHAR(150),
    user_email VARCHAR(150),
    user_password VARCHAR(120),
    user_profile VARCHAR(120),
    PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS contacts(
	contact_id INT NOT NULL,
    user_id VARCHAR(120),
    contact_name VARCHAR(60),
    contact_lastname VARCHAR(70),
    conact_number VARCHAR(30),
    contact_email VARCHAR(100),
    contact_description TEXT,
    PRIMARY KEY(contact_id)
);