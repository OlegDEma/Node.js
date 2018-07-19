var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var index = require('./routes/index');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./models/user');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var app = express();
var jsonParser = bodyParser.json();

mongoose.connect(config.database,{ useNewUrlParser: true });

app.set('superSecret',config.secret);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
var apiRoutes = express.Router();

app.get('/',function(req,res){
    res.send('Hello');
});

app.get('/setup',function(req,res){

    var dema = new User({
        name: 'Dema',
        password: 'd09111997',
        admin: true
    });

    dema.save(function(err){
        if(err) throw err;

        console.log('User saved');

        res.json({success: true});
    });

});

function requireAdmin(request, response, next) {
    if (request.decoded.admin == false) {
        response.json({message: 'Permission denied.' });
    }
    else {
        next();
    }
};


apiRoutes.use(function(req, res, next) {

    //console.log(req);
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  });

apiRoutes.get('/',function(req,res){
    res.json({message: 'Welcome to the coolest API on earth!'});
});

apiRoutes.get('/users',requireAdmin,function(req,res){
    User.find({},function(err,users){
        if(err){
            throw err;
        }else{
        res.json(users);
        }
    });
});

apiRoutes.post('/delete',function(req,res){
    console.log(req.body.id);
    User.deleteOne({_id:req.body.id},function(err){
        if(err) res.send({success:false,message:'Error'});       
    });

    res.send({success:true,message:'Deleted'});
});

apiRoutes.post('/updateUser',requireAdmin,jsonParser,function(req,res){
    console.log(req.body.user);
    let id = req.body.user._id;
    User.findByIdAndUpdate(id,req.body.user,function(err){
        if(err){
            throw err;
        }else{
            res.send({success:true});
        }
    });
});

app.post('/authenticate',jsonParser,function(req,res){
    User.findOne({
        name : req.body.name
        },function(err,user){

            if(err) throw err;

            if(!user){
                res.json({success:false, message: 'Auth failed. User not found.'});
            }else if(user){
                if(user.password != req.body.password){
                    res.json({success: false , message: 'Auth failed. Wrong password.'});
                }else{
                    const payload = {
                        admin : user.admin
                    };

                    var token = jwt.sign(payload,app.get('superSecret'),{
                        //expiresInMinutes : 1440
                    });
                   
                    res.json({success:true, message: token});

                }
            }
        }
    )
});

app.post('/reg',jsonParser,function(req,res){
    //console.log(req.body.email);
    var us;
    User.findOne({ name: req.body.name },function(err,u){
        if(err) throw err;
            if(u == null){
                var user = User({
                    name : req.body.name,
                    password : req.body.password,
                    admin : false
                })
            
                user.save(function(err){
                    if(err) {
                        res.send({success:false,message:err});
                    }else{
            
                        res.send({success:true,message:user.name});
                    }              
                });
            }else{
                res.send({success:false,message:'This email exist.'});
            }          
    });
});

app.get('/users',jsonParser,function(req,res){
    User.find({}, function(err, users) {
        var userMap = [];
    
        users.forEach(function(user) {
          userMap.push(user);
        });
    
        res.send(userMap);  
      });
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api',apiRoutes);
app.listen(port,function(){
    console.log('Server starten on port: '+port);
});