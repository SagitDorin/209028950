const express = require ('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
const sql= require('./db/db');
const CRUD = require('./db/CRUD');
const port = 3000;
const dbConfig = require ('./db/db.config')
const CreateDB = require('./db/CreateDB');
const csv=require('csvtojson');
let alert = require('alert');
const cookieParser = require('cookie-parser');


app.use(express.static(path.join(__dirname,'Static')));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(cookieParser());

//Set up view engine
app.set("Views", path.join(__dirname,"Views"));
app.set("view engine",'pug');

app.listen(port, () =>{
    console.log("server is running on port ", port);
})

//homepage
app.get('/', (req,res) =>{
    res.redirect('/home');
});

//routs
app.get("/home", (req,res) =>{
    res.render('HomePage');

});


app.get('/About', (req,res)=>{
    const csvPath1 = path.join(__dirname,"./content/slide_images.csv");
    csv().fromFile(csvPath1).then((jsonObj1)=>{
        console.log(jsonObj1);
        res.render('About', {
            title: 'About Us',
            var1: jsonObj1,
            content: 'website is a platform whose purpose is to make appointments for gel nail polish more accessible.Today, most women who regularly apply gel nail polish depend on the availability of the beautician. They have to schedule the future appointment long in advance, and in most cases there is no flexibility in the hours, and they have to adjust their time according to the beautician&apos;s availability. This platform will allow great flexibility for customers, so that even with short notice they can make an appointment at a time and location that suits them.'
        })
    })

});


app.get('/LogIn', (req,res) =>{
    res.render('LogIn',{
        title: 'Log In'
    });

});



app.get('/NewAccount', (req,res) =>{
    res.render('NewAccount', {
        title: 'Sign Up'
    });
});


app.get('/NewAccountWithNav', (req,res) =>{
    res.render('NewAccountWithNav', {
        title: 'Sign Up'
    });
});

app.get('/WriteReview', (req,res) =>{
    res.render('WriteReview', {
        title: 'WE APPRECIATE YOUR REVIEW!',
        message: 'Your review will help us to improve our web hosting quality products, and customer services'
    });
});

app.get('/CreateTable',[CreateDB.CreateUsersTable,CreateDB.CreateCosmeticiansTable,CreateDB.CreateAppointmentsTable,CreateDB.CreateReviwesTable]);
app.get("/InsertData", [CreateDB.InsertUsersData, CreateDB.InsertCosmeticiansData, CreateDB.InsertReviewsData, CreateDB.InsertAppointmentsData]);
app.get('/ShowUsersTable', CreateDB.ShowUsersTable);
app.get('/ShowCosmeticiansTable', CreateDB.ShowCosmeticiansTable);
app.get('/ShowReviewsTable', CreateDB.ShowReviewsTable);
app.get('/ShowAppointmentsTable',CreateDB.ShowAppointmentsTable);
app.get('/DropTable', [CreateDB.DropUsersTable, CreateDB.DropCosmeticiansTable, CreateDB.DropReviewsTable, CreateDB.DropAppointmentsTable]);



app.post('/LogIn', CRUD.LogIn);
app.post('/insertNewAccount', CRUD.insertNewAccount);
app.post('/insertNewReview', CRUD.insertNewReview);

app.get('/Search', CRUD.Search);
app.get('/OurCosmeticians', CRUD.showAllCosmeticians);
app.get('/SearchAppointment' , CRUD.showAllCities);
app.get('/UpdateAccount' , CRUD.UpdateAccount);
app.get('/EditProfile', CRUD.ShowUserDetails);
app.get('/DeleteAccount', CRUD.DeleteAccount);


app.get('/Reviews/:id', (req,res) =>{
    const cosmeticianId= req.params.id;
    res.cookie("cosmetician_Id", cosmeticianId);
    res.redirect('/Reviews');
});

app.get('/Reviews', CRUD.showAllReviews);


app.get('/CosmeticianDetails/:cosmetician_id' ,(req,res) =>{
    const cosmeticianId= req.params.cosmetician_id;
    res.cookie("cosmetician_Id", cosmeticianId);
    console.log(req.cookies.cosmetician_Id);
    res.redirect('/CosmeticianDetails');

});

app.get('/CosmeticianDetails', CRUD.showCosmeticianDetails);





