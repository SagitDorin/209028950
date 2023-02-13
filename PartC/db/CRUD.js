const sql = require('./db');
let alert = require('alert');
const path = require('path');
const csv=require('csvtojson');
const cookieParser = require('cookie-parser');



const LogIn = (req, res)=>{
            if (!req.body) {
                res.status(400).send({message: "Content can not be empty!"});
                return;
            }

            var email = req.body.email;
            var password=req.body.password;

            console.log(email);
            sql.query("SELECT * FROM users where (email =? AND password =?)" , [email,password] , (err, results, fields)=>{
                if (err) {
                    console.log("ERROR IS: " + err);
                    res.status(400).send("Somthing is wrong with query" + err);
                    return;
                }
                if(results.length ==0){
                   alert("Email or Password is incorrect");
                   return;
                }

                res.cookie("userId", results[0].id);
                res.cookie("userName", results[0].fname);
                console.log("User found");
                res.render('SuccessMessage', {
                    message: 'Welcome ' + results[0].fname + '!'
                });
                return;
            })
     };

const insertNewAccount = (req,res) =>{
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    const newUser = {
    "email": req.body.email,
    "fname": req.body.fname,
     "lname": req.body.lname,
     "password": req.body.password,
     "age": req.body.age,
     "phone": req.body.phone

    }

    const Q1 = 'INSERT INTO Users SET ?';
    sql.query(Q1, newUser, (err, mysqlres) => {
        if(err){
            console.log("error : ", err);
            alert("Email already exists");
            return;
        }
        console.log("created new user:",  { id: mysqlres.insertId});
        res.render('LogIn' ,
            {title:"Log In",
        });
        return;

    })
};

const insertNewReview = (req,res) =>{
    const cosmeticianId = req.cookies.cosmetician_Id;
    const userId = req.cookies.userId;
    let d = new Date();
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    const newReview = {
        "cosmetician_id": cosmeticianId,
        "user_id": userId,
        "date": d,
        "review": req.body.review,
        "rating": req.body.rate

    }
    const Q1 = 'INSERT INTO Reviews SET ?';
    sql.query(Q1, newReview, (err, mysqlres) => {
        if(err){
            console.log("error : ", err);
            res.status(400).send({message: "Could not sent review"});
            return;
        }
        console.log("created review: ", { id: mysqlres.insertId});
        res.render('SuccessMessage' , {
            message:"Your review has been sent"
        });
        return;

    })
};

const showAllCosmeticians = (req,res) =>{
    const Q1= "SELECT * FROM Cosmeticians";
    sql.query(Q1,(err,mysqlres) =>{
        if(err) {
            res.status(400).send("error");
            return;
        };
        console.log(mysqlres);
        res.render('OurCosmeticians' , {
            title:'Our Cosmeticians',
            res:mysqlres
         });
        return;
    })
};


const showCosmeticianDetails = (req,res) =>{
    const cosmetician= req.cookies.cosmetician_Id;
    console.log(cosmetician);
    sql.query("SELECT * FROM Cosmeticians where (id =?)" , [cosmetician] , (err, results, fields)=>{
        if(err) {
            res.status(400).send("error");
            return;
        };
        console.log(results);
        res.render('CosmeticianDetails', {
           fname: results[0].fname,
            lname: results[0].lname,
            phone: results[0].phone,
            address: results[0].address,
            city: results[0].city,
            about: results[0].about,
            cost: results[0].cost,
            years: results[0].Years_Of_Exp,
            instagram: results[0].instagram

        });
        return;
    });
};

const showAllCities = (req,res) =>{

    const Q1= "SELECT distinct (city) FROM Appointments";
    sql.query(Q1,(err,mysqlres) =>{
        if(err) {
            res.status(400).send("error");
            return;
        };
        console.log(mysqlres);
        res.render('SearchAppointment' , {
            title: 'Search For Appointment',
            res:mysqlres
         });
        return;
    })
};

const showAllReviews = (req,res) =>{
    const CosmeticianId= req.cookies.cosmetician_Id;
    sql.query("SELECT * FROM Reviews where (cosmetician_id =?)" , [CosmeticianId] , (err, results, fields)=>{
        if(err) {
            res.status(400).send("error");
            return;
        };
        if(results.length ==0){
             res.render('SuccessMessage', {
                message: "There are no reviews"

            });
            return;
        }

        res.render('Reviews', {
            res:results

        });
        return;
    });
};

const showAllFavorites = (req,res) =>{
    const user_id= req.cookies.userId;
    console.log(user_id);
    sql.query("SELECT cosmetician_name FROM Favorites where (user_id =?)" , [user_id] , (err, results, fields)=>{
        if(err) {
            res.status(400).send("error");
            return;
        };

         res.render('Favorites', {
            title: "Favorites",
            res: results

        });
        return;

    });
};
const Search = (req,res) =>{
     if (!req.body) {
                res.status(400).send({message: "Content can not be empty!"});
                return;
            }

             var city = req.query.location;
             var time = req.query.time;
             var date = req.query.date;
             var cost = req.query.maxPrice;

             if(req.query.flexible =='flexible') {
                  sql.query("SELECT * FROM Appointments where (city =? AND date =?  AND cost <=?)" , [city,date,cost] , (err, results, fields)=>{
                if (err) {
                    console.log("ERROR IS: " + err);
                    res.status(400).send("Something is wrong with query" + err);
                    return;
                }
                if(results.length ==0){
                   alert("There are no appointments with the require fields");
                   return;
                }
                console.log("User found");
                res.render('Results', {
                    title: 'Results',
                    message: 'Contact the cosmetician using the Instagram link or phone number in order to book the appointment',
                    res: results
                });
                return;
                })
             }
             else {
                 sql.query("SELECT * FROM Appointments where (city =? AND date =? AND time=? AND cost <=?)" , [city,date,time,cost] , (err, results, fields)=>{
                 if (err) {
                    console.log("ERROR IS: " + err);
                    res.status(400).send("Something is wrong with query" + err);
                    return;
                }
                if(results.length ==0){
                   alert("There are no appointments with the require fields");
                   return;
                }
                console.log("User found");
                res.render('Results', {
                    title: 'Results',
                    message: 'Contact the cosmetician using the Instagram link or phone number in order to book the appointment',
                    res: results
                });
                return;
                })
             }
     };

const UpdateAccount = (req,res) => {
    const user= req.cookies.userId;
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    const email=req.query.email;
    const fname=req.query.fname;
    const lname=req.query.lname;
    const password=req.query.password;
    const age=req.query.age;
    const phone= req.query.phone;
    sql.query("UPDATE users SET email=? , fname=? , lname=? , password=? , age=? , phone=? WHERE id=?" , [email,fname,lname,password,age,phone,user] , (err, results, fields)=>{
    console.log(results);
        if(err) {
            res.status(400).send("error");
            return;
        };
        console.log("updated user:",  { id: results.insertId});
        res.cookie("userName", fname);
        res.render('SuccessMessage' ,
            {message:"Your profile has been updated!",
        });
        return;
    })

};
const DeleteAccount = (req,res) => {
    const user= req.cookies.userId;
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    sql.query("DELETE FROM users WHERE id=?" , [user] , (err, results, fields)=>{
    console.log(results);
        if(err) {
            res.status(400).send("error");
            return;
        };
        res.cookie("userId", '');
        res.cookie("userName", '');
        console.log("updated user:",  { id: results.insertId});
        alert("Your profile has been deleted!");
        res.render('HomePage');
        return;
    })

};

const ShowUserDetails = (req,res) =>{
    const user= req.cookies.userId;
    console.log(user);
    sql.query("SELECT * FROM users where (id =?)" , [user] , (err, results, fields)=>{
        if(err) {
            res.status(400).send("error");
            return;
        };
        console.log(results);
        res.render('EditProfile', {
            title: 'Edit Profile',
            email: results[0].email,
            fname: results[0].fname,
            lname: results[0].lname,
            password: results[0].password,
            age: results[0].age,
            phone: results[0].phone

        });
        return;
    });
};





module.exports= {
    showAllCosmeticians,
    LogIn,
    insertNewAccount,
    insertNewReview,
    showAllReviews,
    showCosmeticianDetails,
    showAllCities,
    showAllFavorites,
    Search,
    UpdateAccount,
    DeleteAccount,
    ShowUserDetails};

