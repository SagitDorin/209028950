•	Modules I installed
    express, body-parser, mysql2, pug, path, csvtojson, cookie-parser, nodemon, alert.

•	Creating the data in CreateDB file:

1.	Creation rout of all the tables: http://localhost:3000/CreateTable
2.	Insert data into all tables: http://localhost:3000/InsertData
3.	Show tables:
        •	Show users table: http://localhost:3000/ShowUserTable
        •	Show cosmeticians table: http://localhost:3000/ShowCosmeticiansTable
        •	Show reviews table: http://localhost:3000/ShowReviewTable
        •	Show appointments table: http://localhost:3000/ShowAppointmentTable
4.	Drop all tables rout: http://localhost:3000/DropTable

•	Create tables syntax:
    Users table:
    CREATE TABLE IF NOT EXISTS users (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, email varchar(30) NOT NULL UNIQUE ,fname varchar(25) NOT NULL,lname varchar(30) NOT NULL,password varchar(20) NOT NULL,age int NOT NULL,phone varchar(20) NOT NULL) 

    Cosmeticians table:
    CREATE TABLE IF NOT EXISTS Cosmeticians (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, email varchar(30) NOT NULL UNIQUE,fname varchar(25) NOT NULL,lname varchar(30) NOT NULL,phone varchar(20) NOT NULL,address varchar(100) NOT NULL,city varchar(100) NOT NULL,about varchar(1000) NOT NULL,cost int NOT NULL,Years_Of_Exp int NOT NULL,instagram varchar(70) NOT NULL)

    Appointments table:
    CREATE TABLE IF NOT EXISTS Appointments(id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, cosmetician_id int NOT NULL,cosmetician_name varchar(25) NOT NULL,date date NOT NULL,time time NOT NULL,city varchar(100) NOT NULL, cost int NOT NULL)

    Reviews table:
    CREATE TABLE IF NOT EXISTS Reviews(id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,cosmetician_id int NOT NULL,user_id int NOT NULL,date date NOT NULL,review varchar(500) NOT NULL,rating int NOT NULL
