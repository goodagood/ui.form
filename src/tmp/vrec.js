
/*
 * value records
 * 2017 0619
 */

var ObjectID = require('mongodb').ObjectID;

var db = require('./adb.js');

var vobj = db.VObj;

var p = console.log;


/*
 * Find one top level value record
 */
function findOneTop(filter = {parentid:{'$exists':false}}, callback){
    vobj.getCollection(function(err, vcoll){
        if(err) return callback(err);

        vcoll.findOne(filter, callback);
    });
}


function findOneByIDStr(id, callback){

    var oid = ObjectID(id);

    vobj.getCollection(function(err, vcoll){
        if(err) return callback(err);

        vcoll.findOne({_id: oid}, callback);
    });
}

function findSubs(pid, callback){

    var oid = ObjectID(pid);

    vobj.getCollection(function(err, vcoll){
        if(err) return callback(err);

        vcoll.find({_id: oid}, callback);
    });
}

function findOneSub(parentId, callback){
    vobj.getCollection(function(err, vcoll){
        if(err) return callback(err);

        vcoll.findOne({'parentid':parentId}, callback);
    });
}


// checkings

function singleSub(filter = {parentid:{'$exists':true}}, callback){
    vobj.getCollection(function(err, vcoll){
        if(err) return callback(err);

        vcoll.findOne(filter, callback);
    });
}
module.exports.singleSub = singleSub;


module.exports.findOneTop = findOneTop;
module.exports.findOneSub = findOneSub;
module.exports.findOneByIDStr = findOneByIDStr;
module.exports.findSubs = findSubs;





