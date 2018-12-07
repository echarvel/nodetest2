var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/userlist', function(req,res) {
    var db = req.db;
    var collection = db.get('userlist');
    console.log('got here');
    collection.find({},{},function(e,docs) {
        console.log(docs);
        res.json(docs);
    });
    console.log('got here too');
});

router.put('/updateuser', function(req,res) {
    console.log('edit user called');
    var db = req.db;
    var collection = db.get('userlist');
    console.log('updateing user to ');
    console.log(req.body);
    collection.update({ "_id": req.body._id}, req.body ,function(err,result) {
        res.send(
            (err === null)?{msg:''}:{msg:err}
        );
    });
});

router.post('/adduser', function(req,res) {
    console.log('add user called');
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body,function(err,result) {
        res.send(
            (err === null)?{msg:''}:{msg:err}
        );
    });
});

router.delete('/deleteuser/:id',function( req,res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({'_id': userToDelete},function(err) {
        res.send((err === null) ? {msg:''}:{msg:'error:' + err});
    });
});

module.exports = router;
