var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://Dema:d09111997@ds161780.mlab.com:61780/dema',['Test']);

router.get('/',function(req,res,next){
    db.Test.find(function(err,docs){
        if(err){
            res.send(err);
    }
    res.json(docs);
    });
});

router.get('/one/:id',function(req,res,next){
    db.Test.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,doc){
        if(err){
            res.send(err);
    }
    res.json(doc);
    });
});

router.post('/task',function(req,res,next){
    var task =  req.body;
    db.Test.save(task,function(err,doc){
        if(err){
            res.send(err);
    }
    res.redirect('/');
    });
});

router.get('/delete/:id',function(req,res,next){
    db.Test.remove({_id:mongojs.ObjectId(req.params.id)},function(err,doc){
        if(err){
            res.send(err);
    }
    res.redirect('/');
    });
});


module.exports = router;