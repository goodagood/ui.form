

const express = require('express');
const app = express();

app.use('/b', express.static('build'))
app.use(express.static('public'))

//app.get('/', function (req, res) {
//  res.send('Hello World!')
//})

app.get('/hello', function (req, res) {
  //res.send('Hello World!')
  res.end('Hello World, port 4038!')
});


const mdb = require("./src/tmp/mdb.js");
app.get('/getone', function (req, res) {
    //res.send('Hello World!')
    mdb.get_one_value_rec(function(err, rec){
        var j = {};
        if(err){
            j.err = err;
        }else{
            j = rec;
        }

        res.json(j);
    });
    //res.end('Hello World, port 4038!')
});


const vrec = require("./src/tmp/vrec.js");
app.get('/gettop', function (req, res) {
    //res.end('Hello World!')
    vrec.findOneTop(null, function(err, rec){
        var j = {};
        if(err){
            j.err = err;
        }else{
            j = rec;
        }

        console.log(j);
        res.json(j);
    });
    //res.end('Hello World, port 4038!')
});

//app.get('/getbyid/:id', function (req, res) {
app.get('/20less', function (req, res) {
    //res.end('Hello World!')
    
    vrec.findOneTop(null, function(err, rec){
        var j = {};
        if(err){
            j.err = err;
        }else{
            j = rec;
        }
        console.log(j);

        var pid = j['_id'].toString();
        console.log('pid: ', pid);
        var opt = {
            limit: 10,
        };

        vrec.findSubsOpt(pid, opt, function(err, subs){
            if (err) return res.end(err.toString());

            console.log(typeof subs);
            console.log(Object.keys( subs));

            subs.toArray(function (err, docs){
                res.json({j:j, subs:docs});
            });

            //res.json({j:j, subs:subs});
        });

    });
    //res.end('Hello World, port 4038!')
});


app.listen(4038, function () {
  console.log('Example app listening on port 4038!')
});

