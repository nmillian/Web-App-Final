
var express = require('express');
var router = express.Router();

var ensureLoggedIn = function(req, res, next) {
    if ( req.user ) {
        next();
    }
    else {
        res.redirect("/login");
    }
}

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/mailer', function(req, res) {
    res.render('index', { title: 'Express' });
});

/* GET page. */
router.get('/contacts', ensureLoggedIn, function(req, res) {
    var db = req.db;
    var collection = db.get('contacts');
    collection.find({},{},function(e,docs){
        res.render('contacts', {
            "userlist" : docs
        });
    });
});

/* POST to delete a document. */
router.post('/delete', ensureLoggedIn, function(req, res){
    var db = req.db;
    var collection = db.get('contacts');
    var id = req.body.stuff;

    collection.findAndModify({_id: id}, [], {remove:true}, function(err, object) {
        if(err){
            throw err;
        }
        console.log("document deleted");
    });

    res.redirect("contacts");    

});


/* POST to EDIT a document. */
router.post('/edit', ensureLoggedIn, function(req, res){
    var db = req.db;
    var collection = db.get('contacts');
    var id = req.body.formid;

     collection.find({_id: id},function(e,docs){
        res.render('edits', {
            "userlist" : docs
        });
    });

});

/* SAVE an edited  document. */
router.post('/edituser', ensureLoggedIn, function(req, res){
    var db = req.db;
    var collection = db.get('contacts');
    var id = req.body.hiddenid;

    var Group = req.body.group;
    var FirstName = req.body.firstname;
    var LastName = req.body.lastname;
    var Street = req.body.street;
    var City = req.body.city;
    var State = req.body.state;
    var Zip = req.body.zip;
    var Phone = req.body.phone;
    var Email = req.body.email;

    var Phone1 = req.body.phone1;
    var Mail1 = req.body.mail1;
    var Email1 = req.body.email1;
    var Any1 = req.body.any1;

    var lat = req.body.lat;
    var lon = req.body.lon;

    collection.update({_id: id},{
        "Group" : Group,
        "FirstName" : FirstName,
        "LastName" : LastName,
        "Street" : Street,
        "City" : City,
        "State" : State,
        "Zip" : Zip,
        "Phone" : Phone,
        "Email" : Email,
        "Phone1" : Phone1,
        "Mail1" : Mail1,
        "Any1" : Any1,
        "Lat" : lat,
        "Lon" : lon
        }, function(err, object) {
        if(err){
            throw err;
        }
        else{
            res.redirect("contacts"); 
        }
    });

});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var Group = req.body.group;
    var FirstName = req.body.firstname;
    var LastName = req.body.lastname;
    var Street = req.body.street;
    var City = req.body.city;
    var State = req.body.state;
    var Zip = req.body.zip;
    var Phone = req.body.phone;
    var Email = req.body.email;

    var Phone1 = req.body.phone1;
    var Mail1 = req.body.mail1;
    var Email1 = req.body.email1;
    var Any1 = req.body.any1;

    var lat = req.body.lat;
    var lon = req.body.lon;

    // Set our collection
    var collection = db.get('contacts');

    // Submit to the DB
    collection.insert({
        "Group" : Group,
        "FirstName" : FirstName,
        "LastName" : LastName,
        "Street" : Street,
        "City" : City,
        "State" : State,
        "Zip" : Zip,
        "Phone" : Phone,
        "Email" : Email,
        "Phone1" : Phone1,
        "Mail1" : Mail1,
        "Any1" : Any1,
        "Lat" : lat,
        "Lon" : lon


    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked redirect
            res.redirect("thankyou");
        }
    });
});

module.exports = router;