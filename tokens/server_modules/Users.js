var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


// use body parser so we can get info from POST and/or URL parameters
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

id = 1
Users = []

const superSecret = "SUMsumOpen"; // secret variable



router.post('/', function (req, res) {

    Users[id] =
        {

            "userName": req.body.userName,
            "password": req.body.password,
            "isAdmin": req.body.isAdmin
        }

    id++

    console.log(Users)
    
    res.sendStatus(200)


});

router.post('/login', function (req, res) {

    if (!req.body.userName || !req.body.password)
        res.send({ message: "bad values" })

    else {

        for (id in Users) {
            var user = Users[id]

            if (req.body.userName == user.userName)
                if (req.body.password == user.password)
                    {
                        
                        sendToken(user, res)
                        return;
                    }
                else {
                    res.send({ success: false, message: 'Authentication failed. Wrong Password' })
                    return
                }

        }

        res.send({ success: false, message: 'Authentication failed. No such user name' })
    }

})

function sendToken(user, res) {
    var payload = {
        userName: user.userName,
        admin: user.isAdmin
    }

    var token = jwt.sign(payload, superSecret, {
        expiresIn: "1d" // expires in 24 hours
    });

    // return the information including token as JSON
    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });

}



module.exports = router;