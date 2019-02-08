window.onload = function () {
    let loader = document.getElementsByClassName("load")[0];
    loader.style.display = "none";
    let time = document.getElementById("time");
    setInterval(function () {
        let date = new Date();
        displayClock(time, getClock(date));
    }, 50);

    let addTask = document.getElementById("add-task");
    let add = document.getElementById("add");
    let i = 0;
    let table = document.getElementById("table");
    let taskIsActive = false
    addTask.onclick = function () {
        if (taskIsActive) {
            alert("Please fill out the task before adding a new one");
            return false;
        }
        let taskNode = document.createElement("tr");
        let addButton = document.createElement("span");

        let txtTask = document.createElement("textarea");
        let txtDue = document.createElement("textarea");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        taskNode.id = "add-row";
        txtTask.id = "add-id-Task";
        txtDue.id =   "add-id-Due";

        txtTask.cols = "20";
        txtDue.cols = "20";

        txtTask.rows = "1";
        txtDue.rows = "1";

        addButton.id = "add";
        addButton.innerHTML = "Add";
        addButton.addEventListener("click", addTaskPerm);
        td1.appendChild(txtTask);
        td2.appendChild(txtDue);
        td3.appendChild(addButton);
        taskNode.appendChild(td1);
        taskNode.appendChild(td2);
        taskNode.appendChild(td3);
        table.appendChild(taskNode);
        
        taskIsActive = true;

    };


    function addTaskPerm() {
        let taskName = document.getElementById( "add-id-Task");
        let taskDue = document.getElementById("add-id-Due");
        let nodeArray = [];
        let divErase = document.createElement("div");
        let divComplete = document.createElement("div");
        let trNode = document.createElement("tr");
        trNode.id = String(i++);
        let table = document.getElementById("table");
        
        
        
        let bg = document.getElementsByClassName("bg")[0];


        for(let j= 0; j<4; j++){
        nodeArray[j] = document.createElement("td");
        }

        
        nodeArray[0].innerHTML = escapeLess(taskName.value);
        nodeArray[1].innerHTML = escapeLess(taskDue.value);
        nodeArray[2].innerHTML = "Not Done";
        nodeArray[3].classList.add("options");
    
        
        divErase.classList.add("erase");
        divErase.dataDelete = String(i);
        divErase.innerHTML = "X";
    
        divComplete.classList.add("complete");
        divComplete.dataComplete = String(i);
        divComplete.innerHTML = "✓";
        table.removeChild(table.lastChild);
        heightBefore = table.clientHeight;        


        nodeArray[3].appendChild(divComplete);
        nodeArray[3].appendChild(divErase);
        for(let k = 0; k <4; k++){
            trNode.appendChild(nodeArray[k]);

        }
        table.appendChild(trNode);
        
        bg.style.height = String( bg.clientHeight +  table.clientHeight - heightBefore) + "px";

        taskIsActive = false;
    }
    

};



let getClock = (date) => String(date.getHours()) + ":" + date.getMinutes() + ":" + date.getSeconds();
let displayClock = (time, date) => time.innerHTML = date;

function escapeLess(str){
    strClean = "";
    for(let ctr = 0; ctr < str.length; ctr++){
        if(str[ctr] ==  "<"){
            strClean+= "&lt";
            }
        else{
            strClean += str[ctr];
        }



    }
    return strClean;
}



