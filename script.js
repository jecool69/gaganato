//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){ //if user values arent only spaces
        addBtn.classList.add("active"); //active the add button
    }else{
        addBtn.classList.remove("active"); //unactive the add button
    }
}

showTask(); //calling showtasks function

//if user click on the the add button
addBtn.onclick = ()=>{
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localstorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into  a json string
    showTask(); //calling showtasks function
    addBtn.classList.remove("active"); //unactive the add button
}

//function to add task list inside ul
function showTask(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localstorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //passing the length value to the pendingNumb
    if(listArr.length > 0){//if array is greater than 0
        deleteAllBtn.classList.add("active");//active clear all button
    }else{
        deleteAllBtn.classList.remove("active");//unactive clear all button
    }
    let newLitag = '';
    listArr.forEach((element, index) => {
        newLitag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLitag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task is added leave the input field blank
}

//delete task function 
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
    //after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into  a json string
    showTask(); //calling showtasks function
}

//delete all task function
deleteAllBtn.onclick = ()=>{
    listArr = []; //empty an array
    //after delete all task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into  a json string
    showTask(); //calling showtasks function
}

