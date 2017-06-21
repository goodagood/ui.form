

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

app.listen(4038, function () {
  console.log('Example app listening on port 4038!')
});

