const table=  document.getElementById("userTable"); 
const loader = document.querySelector("#loading"); 


function getUserList() {
    let data={ 
        first_name:document.getElementById("first_name").value, 
        last_name:document.getElementById("last_name").value, 
        email:document.getElementById("email").value 
    }   
  
   
    loader.classList.add("display");
   setTimeout(()=>{ 
    loader.classList.remove("display");
    },[2000]) 
    hideLoading()
 
   fetch("https://reqres.in/api/users") 
   .then((res)=>res.json()) 
   .then((data)=> {
     for (user of data.data) {
       console.log(user) 
       table.innerHTML+=` <tr> 
       <td> <input type="text" class="form-control"  value="${user.id}"/>  </td>
       <td> <input type="text" class="form-control" id="firstname_${user.id}" value="${user.first_name}"/>  </td>
       <td><input type="text" class="form-control" id="lastname_${user.id}" value="${user.last_name}"/></td>
       <td><input type="text" class="form-control" id="email_${user.id}"value="${user.email}"/></td>
       <td>
         <a class="btn btn-warning" onClick="onUpdate(${user.id})">Güncelle</a>
         <a class="btn btn-danger" onClick="onDelete(${user.id})">Sil</a>
       </td>
     </tr>` 
 
     }
   }) 
   .catch((err)=>console.log("error",err))
} 
getUserList( 

);  
 function hideLoading() {
     loader.classList.remove("display");
    }

function createUser() {
    let data={ 
        first_name:document.getElementById("first_name").value, 
        last_name:document.getElementById("last_name").value, 
        email:document.getElementById("email").value 
    } 

    fetch("https://reqres.in/api/users",{ 
        method:"POST", 
        headers:{ 
          "Content-Type":"application/json"
        }, 
        body: JSON.stringify(data)
    }) 
    .then(res=>res.json()) 
    .then(data=>{ table.innerHTML+=` <tr> 
    <td> <input type="text" class="form-control" id="" value="${data.id}"/>  </td>
    <td> <input type="text" class="form-control" id="" value="${data.first_name}"/>  </td>
    <td><input type="text" class="form-control" id="" value="${data.last_name}"/></td>
    <td><input type="text" class="form-control" id=""value="${data.email}"/></td>
    <td>
      <a class="btn btn-warning" onClick="onUpdate(${data.id})">Güncelle</a>
      <a class="btn btn-danger" onClick="onDelete(${data.id})">Sil</a>
    </td>
  </tr>` 

   console.log(data);
});
}


function onUpdate(id) { 
    console.log()
    var data={ 
        first_name:document.getElementById("firstname_" +id).value, 
        last_name:document.getElementById("lastname_" +id).value, 
        email:document.getElementById("email" +id).value,

    } 
    fetch("https://reqres.in/api/users",{ 
        method:"PUT", 
        headers:{ 
          "Content-Type":"application/json"
        }, 
        body: JSON.stringify(data)
    }) 
    .then(response=>response.json()) 
    .then(veri=>console.log("güncellendi",veri)) 
    .catch((err)=>console.log(err))

} 

function onDelete(id) {
    fetch("https://reqres.in/api/users/"+id,{ 
        method:"DELETE", 
        headers:{ 
          "Content-Type":"application/json"
        }, 
    
    }) 
    .then(response=>console.log(response)) 
    .then(data=>{ 
        console.log("Kullanıcı Silindi",data);
    }) 
    .catch(err=>console.log(err));
} 


    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("sort");
        switching = true;

        dir = "asc";
   
        while (switching) {
       
          switching = false;
          rows = table.rows;
   
          for (i = 1; i < (rows.length - 1); i++) {
         
            shouldSwitch = false;
         
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
        
            if (dir == "asc") {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
           
                shouldSwitch = true;
                break;
              }
            } else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            
                shouldSwitch = true;
                break;
              }
            }
          }
          if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        
            switchcount ++;
          } else {
    
            if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
            }
          }
        }
      }
