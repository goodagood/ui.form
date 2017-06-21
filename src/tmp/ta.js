
var p = console.log;

function out(which=1){
    var count = 0;

    function infun(){
        p (count);
        count ++;
    }

    function show(){
        p ('the count: ', count);
    }

    infun();
    p('out: ', count);

    var o = {
        i: infun,
        b: show,
    };

    return o;
}


var obj = out();



if(require.main === module){
    p(infun());
    p(infun());
}
