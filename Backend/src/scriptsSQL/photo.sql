CREATE TABLE photos (id INT AUTO_INCREMENT PRIMARY KEY, arthropod_id int NOT NULL, name_photo VARCHAR(250) NOT NULL,
FOREIGN KEY (arthropod_id) REFERENCES arthropods(id));