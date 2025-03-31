/* This is also a way to access the sql database
Do below steps in the terminal
1. mysql -u root -p
2. USE database_name;
3. source schema.sql;

After doing the above 3 steps the below sets of sql command will run in the terminal
 */

CREATE TABLE user (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);