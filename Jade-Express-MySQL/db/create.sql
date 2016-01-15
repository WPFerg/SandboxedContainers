CREATE TABLE posts (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(45) NOT NULL,
  body text NOT NULL,
  date datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(45) NOT NULL,
  name varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

GRANT ALL PRIVILEGES ON sec_training.* To 'sec_train_web'@'localhost' IDENTIFIED BY 'web_pass';
