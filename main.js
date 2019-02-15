window.onload = function () {
    // This is where we destroy the loader when the page loads
    let loader = document.getElementsByClassName("load")[0];
    loader.style.display = "none";
    
    //this is where we update the clock
    let time = document.getElementById("time");
    setInterval(function () {
        let date = new Date();
        displayClock(time, getClock(date));
    }, 50);


    let addTask = document.getElementById("add-task");
    let add = document.getElementById("add");
    //counter i to keep track of the number of elements we are creating 
    let i = 0;
    
    let table = document.getElementById("table");
    //variable to see if we have an active task before adding one
    let taskIsActive = false
    addTask.onclick = function () {
        if (taskIsActive) {
            alert("Please fill out the task before adding a new one");
            return false;
        }

        //creating the nodes needed
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
        //event listener to add the tasks permanently
        addButton.addEventListener("click", addTaskPerm);
        
        td1.appendChild(txtTask);
        td2.appendChild(txtDue);
        td3.appendChild(addButton);
        taskNode.appendChild(td1);
        taskNode.appendChild(td2);
        taskNode.appendChild(td3);
        table.appendChild(taskNode);
       
       //focus on the input
        txtTask.focus();

       
        taskIsActive = true;

    };


    function addTaskPerm() {

        //fetching the elements and creating the nodes
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

        //we don't want any xss 
        nodeArray[0].innerHTML = escapeLess(taskName.value);
        nodeArray[1].innerHTML = escapeLess(taskDue.value);
        if(taskName.value === "" || taskDue.value === ""){
            alert("Plese fill out the required fields");
            return false;
        }
        total++;
        nodeArray[2].innerHTML = "Not Done";
        nodeArray[3].classList.add("options");
    
        //Creating the adding and deleting features and nodes
        divErase.classList.add("erase");
        divErase.setAttribute("dataDelete", String(i));
        divErase.innerHTML = "X";
        divErase.addEventListener("click", deleteTask);

        divComplete.classList.add("complete");
        divComplete.setAttribute("dataComplete", String(i));
        divComplete.innerHTML = "✓";
        divComplete.addEventListener("click", completeTask);

        table.removeChild(table.lastChild);
        //see a few line below
        heightBefore = table.clientHeight;        


        nodeArray[3].appendChild(divComplete);
        nodeArray[3].appendChild(divErase);
        for(let k = 0; k <4; k++){
            trNode.appendChild(nodeArray[k]);

        }
        table.appendChild(trNode);
        
        // we need to increase the height of the background so we don't run out of area when we add too many tasks
        bg.style.height = String(35 + bg.clientHeight +  table.clientHeight - heightBefore) + "px";

        let taskUpdate = document.getElementById("task-heading");
        //updating the amount of tasks
        taskUpdate.innerHTML = "Task (" + String(totalCompleted) + "/" + String(total) + " completed)";
    
        taskIsActive = false;
    }
    

};
//amount of total and completed tasks
let total = 0;
let  totalCompleted = 0;

//clock functions
let getClock = (date) => String(date.getHours()) + ":" + date.getMinutes() + ":" + date.getSeconds();
let displayClock = (time, date) => time.innerHTML = date;

//we are escaping the less than character to prevent xss
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

//deleting task function
function deleteTask(){
    let nodeToDeleteId = this.attributes.datadelete.value -1;
    let nodeToDelete = document.getElementById(nodeToDeleteId);

    let table = document.getElementById("table");
    let bg = document.getElementsByClassName("bg")[0];
    heightBefore = table.clientHeight;        



    if(nodeToDelete.cells[0].classList.contains("task-completed")){
        totalCompleted--;
    }


    nodeToDelete.parentNode.removeChild(nodeToDelete);
    
    bg.style.height = String(35 + bg.clientHeight +  table.clientHeight - heightBefore) + "px";
    console.log(bg.style.height);

    total--;
    let taskUpdate = document.getElementById("task-heading");
    taskUpdate.innerHTML = "Task (" + String(totalCompleted) + "/" + String(total) + " completed)";
   

}
//completing the task function
function completeTask(){
    let nodeToCompleteId = this.attributes.datacomplete.value - 1;
    let nodeToComplete = document.getElementById(nodeToCompleteId);

    if(nodeToComplete.cells[0].classList.contains("task-completed")){
        return false;
    }

    for(let ctr = 0; ctr<3; ctr++ ){
        nodeToComplete.cells[ctr].classList.add("task-completed");
        if(ctr==2){
            nodeToComplete.cells[ctr].innerHTML = "Done !";
        }
    }
    
    totalCompleted++;

    let taskUpdate = document.getElementById("task-heading");
    taskUpdate.innerHTML = "Task (" + String(totalCompleted) + "/" + String(total) + " completed)";
   
}

