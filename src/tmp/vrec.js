
/*
 * value records
 * 2017 0619
 */

var ObjectID = require('mongodb').ObjectID;

var db = require('./adb.js');

var vcobj = db.VCObj;

var p = console.log;


/*
 * Find one top level value record
 */
function findOneTop(filter = {parentid:{'$exists':false}}, callback){
    vcobj.getCollection(function(err, vcoll){
        if(err) return callback(err);

        vcoll.findOne(filter, callback);
    });
}


function findOneByIDStr(id, callback){

    var oid = ObjectID(id);

    vcobj.getCollection(function(err, vcoll){
        if(err) return callback(err);

        vcoll.findOne({_id: oid}, callback);
    });
}

function findSubs(pid, callback){

    var oid = ObjectID(pid);

    vcobj.getCollection(function(err, vcoll){
        if(err) return callback(err);

        vcoll.find({parentid: oid}, callback);
    });
}

/*
 * opt: {
 *    limit:
 *    skip:
 *    sort:
 * }
 */
function findSubsOpt(pid, opt, callback){

    var oid = ObjectID(pid);

    vcobj.getCollection(function(err, vcoll){
        if(err) return callback(err);

        vcoll.find({parentid: oid}, opt, callback);
    });
}

function findOneSub(parentId, callback){
    vcobj.getCollection(function(err, vcoll){
        if(err) return callback(err);

        vcoll.findOne({'parentid':parentId}, callback);
    });
}


// checkings

function singleSub(filter = {parentid:{'$exists':true}}, callback){
    vcobj.getCollection(function(err, vcoll){
        if(err) return callback(err);

        vcoll.findOne(filter, callback);
    });
}
module.exports.singleSub = singleSub;


module.exports.findOneTop = findOneTop;
module.exports.findOneSub = findOneSub;
module.exports.findOneByIDStr = findOneByIDStr;
module.exports.findSubs = findSubs;
module.exports.findSubsOpt = findSubsOpt;





