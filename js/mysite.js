//My Java Script
function loadCalories() {
    //Read in the data
    var gut = loadData();
    
    // rotate for the data 
    gut = rotateDate(gut);
    document.getElementById("row1").innerHTML = parseInt(gut.days[0].calories);
    document.getElementById("row2").innerHTML = parseInt(gut.days[1].calories);
    document.getElementById("row3").innerHTML = parseInt(gut.days[2].calories);
    document.getElementById("row4").innerHTML = parseInt(gut.days[3].calories);
    document.getElementById("row5").innerHTML = parseInt(gut.days[4].calories);
}

function rotateDate(gut) {
    var d = new Date();
    d.setHours(0,0,0,0);
    if( d > gut.days[0].todaysDate){
        // then we need to rotate them
        gut = findDate(4,gut);
        gut = findDate(3,gut);
        gut = findDate(2,gut);
        gut = findDate(1,gut);

        nd = new Date();
        nd.setHours(0,0,0,0);
        var d0 = {
            calories: 0,
            todaysDate: nd,
        };
        gut[0] = d0;
    }
    return gut;
}

function findDate(days, gut){
    var nd = new Date();
    nd.setDate(nd.getDate()-days);
    nd.setHours(0,0,0,0);
    var found = 0;
    for(var i = 4; i >= 0; i-- ){
        if( nd === gut.days[i]) {
            gut.days[days] = gut.days[i];
            found = 1;
        }
    }
    if( found === 0){
        d = new Date();
        d.setDate(d.getDate()-days);
        d.setHours(0,0,0,0);
        var d0 = {
            calories: 0,
            todaysDate: nd,
        };
        gut.days[days] = d0;
    }
    return gut;
}

function loadData() {
    var mobj = localStorage.getItem("MGut");
    var gut;
    if(!mobj) 
    {
        //then create it
        var g = {
            days: [{},{},{},{},{}]
        };
        var dd1 = new Date();
        dd1.setHours(0,0,0,0);
        var d0 = {
            calories: 0,
            todaysDate: dd1,
        };
        g.days[0] = d0;
        var dd1 = new Date();
        dd1.setDate(dd1.getDate()-1);
        dd1.setHours(0,0,0,0);
        var d1 = {
            calories: 0,
            todaysDate: dd1,
        }
        g.days[1] = d1;
        dd1 = new Date();
        dd1.setDate(dd1.getDate()-2);
        dd1.setHours(0,0,0,0);
        var d2 = {
            calories: 0,
            todaysDate: dd1,
        }
        g.days[2] = d2;
        dd1 = new Date();
        dd1.setDate(dd1.getDate()-3);
        dd1.setHours(0,0,0,0);
        var d3 = {
            calories: 0,
            todaysDate: dd1,
        }
        g.days[3] = d3;
        dd1 = new Date();
        dd1.setDate(dd1.getDate()-4);
        dd1.setHours(0,0,0,0);
        var d4 = {
            calories: 0,
            todaysDate: dd1,
        }
        g.days[4] = d4;
        localStorage.setItem("MGut",JSON.stringify(g));
        var obj = localStorage.getItem("MGut");
        gut = JSON.parse(obj);
    } else {
        gut = JSON.parse(mobj);
    }
    return gut;
}

function saveData(gut) {
    localStorage.setItem("MGut",JSON.stringify(gut));
}

function saveCalories() {
    var gut = loadData();
    gut = rotateDate(gut);
    var amount = document.getElementById("calories").value;
    var c = parseInt(amount);
    var x = parseInt(gut.days[0].calories);
    x = x + c;
    gut.days[0].calories = x;
    saveData(gut);
}