

window.onload = start

const BASE_URL = "https://tabslabapi.azurewebsites.net/api/"; 
function start()
{
  getAll()
}

function sendToDB()
{  
  name_ = document.getElementById('name-collapse').value
  content = document.getElementById('content-collapse').value
  if(name_ ==='' || content ==='') 
  {
    alert('One or more field are empty') 
    return
  } 

  let collapse = {
    id: getIndex(),
    name: name_,
    content: content
  }  
  let data = JSON.stringify(collapse)
  let request = new XMLHttpRequest();

  request.open("POST",  BASE_URL + "collapse/add", true);
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-Type", "application/json");

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      window.location.reload();        
}};
  request.send(data);
 

  document.getElementById('name-collapse').value = ''
  document.getElementById('content-collapse').value = ''
}

async function getAll()
{
  var collapses = []
  var request = new XMLHttpRequest();
  request.open("GET", BASE_URL + "collapse/all", true); 
   

  request.onreadystatechange = function() {     
    if (request.readyState == 4 && request.status == 200)
    {     
      let response = request.responseText
      var objs = JSON.parse(response)
      objs.forEach(element =>
         { collapses.push(element)})

      if(collapses.length != 0)
      {
        let path = window.location.pathname;
        let page = path.split("/").pop();
  
        if(page === "info3.html") { createCollapseAdmin(collapses) }
        else if(page === "info4.html") { createCollapseUser(collapses) }
      }
      
    } 
  }

  try
  {
    request.send();
  }
  catch(e)
  {
    console.log(e.responseText)
  }
 
  
}
  

function createCollapseAdmin(collapses)
{
  collapses.forEach(collapse => {
    let div = document.createElement("div")
    div.style.display = 'flex';
    div.style.justifyContent = 'center'     

    let id = document.createElement("p")
    id.innerText = collapse.id

    let name = document.createElement("p")
    name.innerText = collapse.name

    let content = document.createElement("p")
    content.innerText = collapse.content

    let btn = document.createElement("button") 
    btn.style.height ='20px';
    btn.style.width ='50px';
    btn.style.fontSize = '8px';          
    btn.innerText = "DELETE"
    btn.addEventListener('click', (e) =>
      {
        e.preventDefault()
        deleteCollapse(collapse.id)
      })

    div.appendChild(id)
    div.appendChild(name)
    div.appendChild(content)
    div.appendChild(btn)

    document.getElementById("admin-panel").appendChild(div)

  });
}

function createCollapseUser(collapses)
{
  let alldiv = document.createElement("div")
    let ul = document.createElement("ul")
    ul.id = "menu";

    let tabdiv = document.createElement("div")
    tabdiv.className = "tab-folder"

    alldiv.appendChild(ul)
    alldiv.appendChild(tabdiv)
    
    document.getElementById("user-panel").appendChild(alldiv)
  collapses.forEach(collapse => {
    
    var li = document.createElement("li");
    var children = ul.children.length + 1
    var a = document.createElement("a")
    a.href = "#tab"+children
    a.innerText = collapse.name
    li.appendChild(a);
    ul.appendChild(li)

  
    let tab = document.createElement("div")
    tab.id = "tab"+children
    tab.className = "tab-content"
    tab.innerText = collapse.content
    tabdiv.appendChild(tab)

    

    
    
    document.getElementById("user-panel").appendChild(alldiv)
  });
}

function deleteCollapse(id)
{
  var request = new XMLHttpRequest();
  request.open("DELETE", BASE_URL + "collapse/delete?id="+id, true);

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      window.location.reload();
  }}; 

  request.send()  
}

function getIndex() {
  var now = new Date();
  let seconds = now.getSeconds();
  if(seconds <10) seconds = '0'+seconds;
  var str = "" + now.getDate() + now.getHours() + now.getMinutes()+ seconds ;
  return parseInt(str);
}

