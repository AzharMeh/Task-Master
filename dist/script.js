const input = document.getElementById("textBox");
const ul = document.getElementById("ul");

function addButton(){  
 
  const newTask = input.value;  
  if(newTask != "" && newTask != null){       const item = document.createElement("li");
    item.innerHTML = '<button value = "Done" onclick = "markDone(this.parentNode)" class = "liButton" id = "done"/><i class="fa fa-thumbs-up"></i></button><button class = "liButton"onclick ="remove(this.parentNode)" id = "delete"/> <i class="fa fa-trash-o"></i></button>          <button class = "liButton" value = "!" onclick = "important(this.parentNode)" id = "delete"><i class ="fa fa-exclamation-circle"></i></button>'+newTask;
    ul.appendChild(item);
   saveTasks(); 
  input.value = null;                                
  }
 else{ alert("Invalid Input..!!");
  input.value = null;
     }  
}

function saveTasks() {
    // Get a reference to the <ul> element and the list items
const list = document.querySelector('ul');
const item = list.querySelectorAll('li');  
// Create an array to store the list data
const data = [];
// Loop through the list items and get the text of each item
item.forEach(item => {
  data.push(item.textContent);
});

// Convert the array to a string and store it in localStorage
localStorage.setItem('listData', JSON.stringify(data));
}

function removeAllItems() {
  var list = document.getElementById('ul');
  if (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);      
    }
    localStorage.removeItem('listData');
  }
}
function loadTasks() {  
 removeAllItems(); 

   // Get the list data from localStorage and convert it back to an array
const data = JSON.parse(localStorage.getItem('listData'));
if(data != null){
// Create new list items for each item in the array
data.forEach(item => {
  const li = document.createElement('li');
  li.innerHTML = '<button value = "Done" onclick = "markDone(this.parentNode)" class = "liButton" id = "done"/><i class="fa fa-thumbs-up"></i></button><button class = "liButton"onclick ="remove(this.parentNode)" id = "delete"/> <i class="fa fa-trash-o"></i></button>          <button class = "liButton" value = "!" onclick = "important(this.parentNode)" id = "delete"><i class ="fa fa-exclamation-circle"></i></button>'+item;
    
   ul.appendChild(li);
      });
  localStorage.removeItem('listData');
}
}
loadTasks();



function markDone(item){  
  if(item.className == "finished"){
    var c = confirm("Task is already done..!\nDo you want to mark it uncheck ?");
    if(c==true){
      item.className ="unfinished";
    }
  }
  else{
  item.className = "finished"; }
}
function remove(item){
   
  if(item.className != "finished"){
  var c = confirm("Task not completed...!! \n Still wants to delete ?");
    if(c==true){
      item.remove();   
      localStorage.removeItem('listData');
      saveTasks();
    }
  }
 else{ var c = confirm("Task will be deleted permanently..!");
  if(c==true){
    item.remove();
  }     
     }
}
function important(item){
  if(item.className != "imp"){
  item.className = "imp";
  }
  else{
    item.className = "unfinished";
  }
}