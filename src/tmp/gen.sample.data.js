
var fs = require("fs");

var genuuid = require("./gen.uuid.js");

var p = console.log;


var gen_sample_2017_0605 = ()=>{
    var d = {};

    d["_title"] = "sample data title",
    d["_description"] = "sample data _description",
    d["_milli"] = Date.now().toString();

    var uuid = genuuid.generateUUID();
    d[uuid] = {
        "title":"IMSDB",
        "description":"internet movie script database",
        "milli": Date.now().toString()
    }

    uuid = genuuid.generateUUID();
    d[uuid] = {
        "title":"THE SHAWSHANK REDEMPTION",

        "description": `by Frank Darabont, Based upon the story
            Rita Hayworth and Shawshank Redemption
            by Stephen King`,
        "milli": Date.now().toString()
    }

    uuid = genuuid.generateUUID();
    d[uuid] = {
        "title":"after the first scene of 2 lover",

        "description": `...and we drift down a wooded path, the sounds of rutting
            passion growing fainter, mingling now with the night sounds of
            crickets and hoot owls...`,
        "milli": Date.now().toString()
    }


    fs.writeFile("s0605.1128.js", JSON.stringify(d, null, 4), (err, what)=>{
        p(what, err);
    });
};


//const read_some_txt = (abspath = "/tmp/shawshank.redemption.txt") =>{
var read_some_txt = (abspath = "/tmp/shawshank.shrink.txt") =>{
    fs.readFile(abspath, 'utf-8', function(err, text){
        p(text.slice(0, 500));
        p(typeof text);
        p(text.length);
    });
}

var readtxt = (abspath = "/tmp/shawshank.shrink.txt", callback) =>{
    return fs.readFile(abspath, 'utf-8', callback);
}


var randompair = (txt) =>{
    if(!txt || txt.length < 1){
        throw('give a txt');
        return;
    }

    var a = txt.split(/\n/);

    const len = a.length;

    var start = Math.floor(Math.random()*len);
    var tlen  = Math.floor(Math.random()*1 + 1);
    var dlen  = Math.floor(Math.random()*15 + 1);

    while(start + tlen + dlen + 1 > len){
        start = Math.floor(Math.random()*len);  
        tlen  = Math.floor(Math.random()*2 + 1);
        dlen  = Math.floor(Math.random()*30 + 1);
    }

    //console.log(start, tlen, dlen);

    var title = a.slice(start, start + tlen);
    var description = a.slice(start+tlen, start + tlen + dlen);

    return {
        title: title.join(" "),
        description: description.join(' '),
        milli: Date.now(),
    };
}


function genSample(callback){
    readtxt("/tmp/shawshank.shrink.txt", function(err, txt){
        var d = { };
        
        d["_title_description"] = randompair(txt);
        d["test"] = Date.now();

        var num = Math.floor(Math.random()*10 + 1);

        for(var i=0; i<num; i++){

            var uuid = genuuid.generateUUID();

            d[uuid] = randompair(txt);
        }

        //console.log(d);

        return callback(null, d);
    });
}



module.exports.genSample = genSample;



//// for checking
//var o = {}
//readtxt("shawshank.shrink.txt", function(err, txt){
//    if(err) return p(err);
//
//    o.txt = txt;
//});
//
//setTimeout(function(){
//    o.pair = randompair(o.txt);
//}, 3000);


if(require.main === module){
    //console.log(genuuid.generateUUID());

    //gen_sample_2017_0605();
    //read_some_txt();

    genSample();
}
