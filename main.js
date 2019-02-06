window.onload = function(){
    let loader  = document.getElementsByClassName("load")[0];
    loader.style.display = "none";
    let time   = document.getElementById("time");
    setInterval(function(){
        let date = new Date();
        displayClock(time, getClock(date));
    }, 50);
    
let addTask = document.getElementById("add-task");
let add   = document.getElementById("add");
let i = 0;
let table = document.getElementById("table");
let taskIsActive = false
addTask.onclick = function(){
    if(taskIsActive){
        alert("Please fill out the task before adding a new one");
        return false;
    }
    let taskNode = document.createElement("tr");
    let addButton = document.createElement("span");


    let txtTask = document.createElement("textarea");
    let txtDue =  document.createElement("textarea");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    taskNode.id = String(i++);
    txtTask.id = String(i) + "-1";
    txtDue.id = String(i) + "-2";

    txtTask.cols  = "20";
    txtDue.cols = "20";

    txtTask.rows = "1";
    txtDue.rows = "1";

    addButton.id = "add";
    addButton.innerHTML = "Add";
    td1.appendChild(txtTask);
    td2.appendChild(txtDue);
    td3.appendChild(addButton);
    taskNode.appendChild(td1);
    taskNode.appendChild(td2);
    taskNode.appendChild(td3);
    table.appendChild(taskNode);
    taskIsActive = true;
    
};

add.onclick = function(){
  //  console.log(txtSays.value);
};



};




let getClock = (date) => String(date.getHours()) + ":" + date.getMinutes() + ":" + date.getSeconds();
let displayClock = (time, date) => time.innerHTML = date;

