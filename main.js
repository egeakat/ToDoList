window.onload = function(){
    let loader  = document.getElementsByClassName("load")[0];
    loader.style.display = "none";
    let time   = document.getElementById("time");
    setInterval(function(){
        let date = new Date();
        displayClock(time, getClock(date));
    }, 50);
    
};



let getClock = (date) => String(date.getHours()) + ":" + date.getMinutes() + ":" + date.getSeconds();
let displayClock = (time, date) => time.innerHTML = date;

