var bookmarkName=document.getElementById("bookmarkName")
var bookmarkURL=document.getElementById("bookmarkURL")
var submitBtn=document.getElementById("submitBtn")
var closeTag=document.getElementById("closeTag")
var closeModel=document.getElementById("closeModel")
var elements;
var bookmarks = [];

if(localStorage.getItem("bookmarkList") !=null){
  bookmarks=JSON.parse(localStorage.getItem("bookmarkList"))
  display(bookmarks)
}


if (localStorage.getItem('bookmarkList') == null) {
  bookmarks = [];
}

else {
  bookmarks = JSON.parse(localStorage.getItem('bookmarkList'));
  display(bookmarks);
}

submitBtn.addEventListener("click",function(){
  addbookmark()
})

bookmarkName.addEventListener('input', function () {
  validationBookmarker(this);
})

bookmarkURL.addEventListener('input', function () {
  validationBookmarker(this);
})


function addbookmark(){

  if( validationBookmarker(elements) == true){
    var bookmark={
    Name:bookmarkName.value,
    URL: bookmarkURL.value  
  }
  
 bookmarks.push(bookmark)
display(bookmarks)
localStorage.setItem("bookmarkList",JSON.stringify(bookmarks))
empty()
}
else{
 closeModel.classList.remove('d-none');
}
} 


function empty(){
  bookmarkName.value=''
  bookmarkURL.value=''
}

function display(list){
  // console.log(list);
  var cartona=''
  for(var i = 0 ; i<list.length ; i++){
      cartona+=`<tr>
        <td >${i+1}</td>
        <td>${list[i].Name}</td>
      
        <td><button class="btn btn-visit  bg-success text-white">
        <i class="fa-solid fa-eye pe-2"></i> <a target="_blank" href="${bookmarks[i].URL}"
         class="text-decoration-none text-white">Visit</a></button>
         </td>

            <td> <button  onclick="deletebtn(${i})" 
             class="btn btn-delete  bg-danger text-white">
            <i class="fa-solid fa-trash-can pe-2 "></i>Delete
          </button>  </td>
            </tr>   `
  }
    document.getElementById("tbody").innerHTML=cartona
  }

function deletebtn(id){
  bookmarks.splice(id,1)
  display(bookmarks)
  localStorage.setItem("bookmarkList",JSON.stringify(bookmarks))
}


function validationBookmarker(element) {
  console.log(element);
  elements =element
  var regex = { 
    bookmarkName: /\w{3,}/,
     bookmarkURL:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
    
  }
  if (regex[element.id].test(element.value)) {
    if( /\w{3,}/.test(bookmarkName.value )==true  &&  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i.test( bookmarkURL.value)==true ){
      console.log('yes');
      bookmarkURL.classList.replace('is-invalid','is-valid')
      return true    
    }
      element.classList.add('is-valid')
      element.classList.remove('is-invalid')
  }
  else {
    console.log('no');
      element.classList.add('is-invalid')
      element.classList.remove('is-valid')
      return false
  }
}
                 
function checkNotEmpty(){
  if(bookmarkName.value =="" ||bookmarkURL.value==""){
    closeModel.classList.remove("d-none");
      return false
  }

  else{
      return true
     
  }
}   

function checkName(){
  if(bookmarkName.test(Name.value)==true){
     return true
  }
  else {
    document.getElementById("closeModel").style.display="block"
    return false}
}


function checkUrl(){
  if(bookmarkURL.test(URL.value)==true){
    return true
  }
  else {
    document.getElementById("closeModel").style.display="block"
    return false}
}


closeTag.addEventListener("click",function(){
  exed()
})

function exed(){
  closeModel.classList.add("d-none");
}
  