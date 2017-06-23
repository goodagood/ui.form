
/*
 * checking ./adb.js
 * 2017 0619
 */

var db = require('./adb.js');

var vrec = require('./vrec.js');

var vcobj = db.VCObj;

var p = console.log;


/*
 * checking to find one
 * 0619 0602am
 */

function cfindone(){
    vcobj.getCollection(function(err, vcoll){
        vcoll.findOne({parentid: {'$exists':false}}, (err, one)=>{
            p(one);
            p(err);

            p(Object.keys(vcobj));
            p(Object.keys(vcobj.db));

            vcobj.close(function(err, closed){
                p(new Date());
                p(closed, err);
            });

        });

    });
}


function cfindtop(){
    //vrec.findOneTop({parentid: {'$exists':false}}, (err, one)=>{
    vrec.findOneTop(null, (err, one)=>{
            if(err) return p(err);

            //p(one);
            p(typeof one._id);
            var pid = one._id.toString();

            p(one._id.toString());
            p(Object.keys(one));
            p(Object.keys(one['_id']));

            p();

            vrec.findOneSub(pid, function(err, sub){
                if(err) return p(err);

                p(sub);


                vcobj.close(function(err, closed){
                    p();
                    p(new Date());
                    p(closed, err);
                });

            });


    });
}


function csub(){
    //vrec.findOneTop({parentid: {'$exists':false}}, (err, one)=>{
    vrec.singleSub({parentid: {'$exists':true}}, (err, one)=>{
            if(err) return p(err);

            p(one);
            p(typeof one.parentid);
            var pid = one.parentid.toString();

            p(one._id.toString());
            p(Object.keys(one));
            p(Object.keys(one['_id']));

            p();

            vrec.findOneByIDStr(pid, function(err, par){
                if(err) return p(err);

                p('parent:');
                p(par);

                p(par._id.toString());

                vrec.findSubs(par._id.toString(), function(err, subs){
                    if(err) p(err);

                    p("\nsub: -- \n");
                    
                    subs.each(function(err, onesub){
                        p(onesub);
                        p();
                    });

                    subs.count(function(err, num){
                        p('number is: ', num);
                    });

                });



            });


    });
}



function dbclose(db){
    db.close(function(err, closed){
        p(new Date());
        p(closed, err);
    });
}


if(require.main === module){

    //cfindone();
    //cfindtop();
    csub();

    setTimeout(()=>{
        process.exit();
    }, 6000);
}

