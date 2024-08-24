let eltodoForm = document.querySelector(".todo-form");
let elInputValue = document.querySelector(".todo-input");
let eltodoList = document.querySelector(".todo-list");
let countAll = document.querySelector(".count-all");
let complated = document.querySelector(".complated");
let unComplated = document.querySelector(".uncomplated");
let uploadInput = document.querySelector(".upload-input")
let uploadImg = document.querySelector(".upload-img")

const datatime = new Date();
document.getElementById("datatime").innerHTML = datatime.toLocaleString();

let todoArr = JSON.parse(localStorage.getItem("todos")) || []


eltodoForm.addEventListener("submit", function(e){
    eltodoList.classList.add("p-3")
    e.preventDefault()
    const data = {
        id: todoArr.length + 1,
        inputValue: elInputValue.value,
        complated:false,
        imgUrl: e.target.changeimg.files[0] ? URL.createObjectURL(e.target.changeimg.files[0]) : null
    }
    e.target.reset()
    todoArr.push(data)
    uploadImg.src = "./images/images-empty.png"
    renderTodos(todoArr)
    localStorage.setItem("todos", JSON.stringify(todoArr))
})


 function renderTodos(arr){ 
    eltodoList.innerHTML = null
    arr.forEach((item, index) => {
        let eltodoItem = document.createElement("li")
                eltodoItem.className = `flex w-[100%]  bg-black scale-1 text-white p-2 rounded-[30px] items-center justify-between  ${item.complated ? "opacity-60 line-through" : ""}`

        eltodoItem.innerHTML = `
         <div class="text-xl flex items-center gap-2">

            <span class="ml-5 ">${index+1}.</span>
             ${item.imgUrl ? `<img class="rounded-lg" src="${item.imgUrl}" alt="choosen img" width="50" heigth="50">`: ""}

            <strong >${item.inputValue}</strong>
         </div>
         <div  class= "flex items-center space-x-3">
           <div onclick="handleComplated(${item.id})" class="w-[45px] flex justify-center h-[45px] rounded-full bg-[#ffdfdb] hover:bg-white cursor-pointer">
                <img src="./images/tick-icon.svg" alt="tick icon" width="90%"> 
            </div>
            <button onclick="handledelete(${item.id})"   type="button" class="p-[6px] flex justify-center w-[45px] h-[45px] rounded-full bg-[#ffdfdb]  border  hover:bg-white hover:shadow-xl  duration-300">
                <img src="./images/delete-icon.svg" alt="delete icon" width="90%" >
            </button>
            <button onclick="handleUpdate(${item.id})" type="button" class="p-[6px] flex justify-center w-[45px] h-[45px] rounded-full bg-[#ffdfdb] hover:bg-white  hover:shadow-2xl duration-300">
                <img src="./images/update.svg" alt="update icon" width="90%" >
            </button>
         </div>
        `
        eltodoList.appendChild(eltodoItem)
        
    })
    countAll.innerHTML = `${todoArr.length}`
    const filteredOBjs = todoArr.filter(item => item.complated == true)
    complated.innerHTML = `${filteredOBjs.length}`
    const unfilteredOBjs = todoArr.filter(item => item.complated == false)
    unComplated.innerHTML = `${unfilteredOBjs.length}`
 }

 renderTodos(todoArr)

let modal = document.querySelector(".modal")
let modalUpdated = document.querySelector(".modal-update")
function handleUpdate(id){
    modal.classList.remove("hidden")
    let findedTodo =  todoArr.find(item => item.id == id)
    modalUpdated.innerHTML = `
        <form class="form-upload w-[100%] flex flex-col p-2 justify-center">
            <div class="mb-[10px] flex items-center bg-slate-700 overflow-hidden rounded-lg w-[100%] justify-between">
                <input class="modal-input bg-transparent p-3 w-[70%] outline-none text-xl bg-black opacity-70 text-white hover:opacity-100" type="text" value="${findedTodo.inputValue}">
                <button type="submit" class=" w-[30%] p-4 bg-[#ffdfdb] hover:bg-white duration-300 text-xl text-center">update</button>
            </div>
            <label class="">
                <input class="hidden updated-input" name="updateImg" type="file" >
                <img class="updatedImg rounded-lg" src="${findedTodo.imgUrl ? `${findedTodo.imgUrl}` : "./images/images-empty.png"}" alt="updated Img" width="100" height="100">
            </label>
        </form>
    `
    
    let updatedInput = document.querySelector(".updated-input")
    let updatedImg= document.querySelector(".updatedImg")

    updatedInput.addEventListener("change", function(e){
        updatedImg.src = URL.createObjectURL(e.target.files[0])
    })
    let elUploadForm = document.querySelector(".form-upload")
    
    elUploadForm.addEventListener("submit", function(e){
        e.preventDefault()
        findedTodo.inputValue = e.target[0].value
        findedTodo.imgUrl = updatedImg.src
        modal.classList.add("hidden")
        renderTodos(todoArr)
        localStorage.setItem("todos", JSON.stringify(todoArr))
    })
}   

   

modal.addEventListener("click", function(e){
    if(e.target.classList.contains("modal")){
        modal.classList.add("hidden")
    }
})

function handledelete(id){
    const findIndexObj = todoArr.findIndex(item => item.id == id)
    todoArr.splice(findIndexObj,1)
    renderTodos(todoArr)
    localStorage.setItem("todos", JSON.stringify(todoArr))
} 

function handleComplated(id){
    const FindedArr = todoArr.find(item => item.id == id)
    FindedArr.complated =!FindedArr.complated
    renderTodos(todoArr)
    localStorage.setItem("todos", JSON.stringify(todoArr))
}

function handleAll(){
    if(todoArr.length == 0){
        eltodoList.innerHTML = `
            <li><p class="text-[#ffdfdb] text-2xl">You don't have any todo yet</p></p></li>
        `
    }
    else{
        renderTodos(todoArr)
    }
    localStorage.setItem("todos", JSON.stringify(todoArr))
}

function handleComplatedObj(){
    const filteredArr = todoArr.filter(item => item.complated == true)
    
    if(filteredArr.length == 0){
        eltodoList.innerHTML = `
            <li><p class="text-[#ffdfdb] text-2xl">You don't have any complateds yet</p></p></li>
        `
    }
    else{
        renderTodos(filteredArr)
    }
    localStorage.setItem("todos", JSON.stringify(todoArr))
    
}

function handleUnComplated(){
     const filteredArr = todoArr.filter(item => item.complated == false)

    if(filteredArr.length == 0){
        eltodoList.innerHTML = `
            <li><p class="text-[#ffdfdb] text-2xl">You don't have any uncomplateds yet</p></p></li>
        `
    }
    else {
         renderTodos(filteredArr)
    }
    localStorage.setItem("todos", JSON.stringify(todoArr))
   
}

uploadInput.addEventListener("change", function(e){
    uploadImg.src = URL.createObjectURL(e.target.files[0])
    localStorage.setItem("todos", JSON.stringify(todoArr))
})


