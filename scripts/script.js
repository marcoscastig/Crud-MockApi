const URL = "https://6361a8e367d3b7a0a6cac31c.mockapi.io/users"
//GET
const inputGet1Id = document.getElementById('inputGet1Id')
const btnGet1 = document.getElementById('btnGet1') 
//PUT
const inputPutId = document.getElementById('inputPutId')
const btnPut = document.getElementById('btnPut')
//POST
const inputPostNombre = document.getElementById('inputPostNombre')
const inputPostApellido = document.getElementById('inputPostApellido')
const btnPost = document.getElementById('btnPost')
//DELETE
const inputDelete = document.getElementById('inputDelete')
const btnDelete = document.getElementById('btnDelete')
//Results
let results = document.getElementById('results')

const dataModal = document.getElementById('dataModal')
const inputPutNombreModal = document.getElementById('inputPutNombre')
const inputPutApellidoModal = document.getElementById('inputPutApellido')
const btnSendChanges = document.getElementById('btnSendChanges') 
const btnCancelChanges = document.getElementById('btnCancelChanges') 
const alertMsj = document.getElementById('alert-error');

let filtroAbuscar = ""

var data = {
 name: '22',
 lastname: '22'
};
var data2 = {
  name: '22',
  lastname: '22'      
};


btnGet1.addEventListener("click", ()=> {
    let getId = inputGet1Id.value
    
    if(getId.length === 0) {
        filtroAbuscar = "mostrarDatosActualizados"
      }
    
      else {
        filtroAbuscar = getId
    }
    results.innerHTML =""
    verUsersGet()
    })


btnPost.addEventListener("click", ()=> {
        
  let postName = inputPostNombre.value
        
  let postLastName = inputPostApellido.value
       
  filtroAbuscar="mostrarDatosActualizados"
      
  if((postName.length === 0) || (postLastName.length === 0)){
       
    alert("debes llenar todos los campos")
       
  }else {
        
    data = {
      name: postName,
          
      lastname: postLastName     
      
    }
        
        results.innerHTML =""
        
        cargarUserPost()  
        
      }   
    })

btnPut.addEventListener("click", ()=> {
 

let statusRespuesta = ""
  
  fetch(`https://6361a8e367d3b7a0a6cac31c.mockapi.io/users/${inputPutId.value}`)
  
  .then(respuesta => {
    
    statusRespuesta=respuesta.ok
  
    return respuesta.json();
 
  })
  
  .then(post => {if(statusRespuesta!=true) {
  
    alertaError()
  
  } else
  
  {
    
    inputPutNombreModal.value = post.name
    
    inputPutApellidoModal.value = post.lastname
    
    pruebaboton.click()

  }
})  
  
    })
    
btnSendChanges.addEventListener("click", ()=> {
  
  filtroAbuscar="mostrarDatosActualizados"
  
  id= inputPutId.value
 
  data2 = {
  name: inputPutNombreModal.value,
  lastname: inputPutApellidoModal.value      
  };
 
  results.innerHTML =""
 
  modificarUserPut (id)

})


async function cargarUserPost (){
response= await fetch(URL, {
  
  method: 'POST', 
 
  body: JSON.stringify(data), 
 
  headers:{
    'Content-Type': 'application/json'
  }

}).then(res => res.json())

.catch(error => console.error('Error:', error))

.then(response => console.log('Success:', response));

verUsersGet()
}

async function borrarUserDelete (id){
  response = await  fetch(`https://6361a8e367d3b7a0a6cac31c.mockapi.io/users/${id}`, {
      method: 'DELETE', 

      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res =>{
      if(res.ok){

        res.json()
        verUsersGet()
      }else{
        alertaError()  
    }
    })
      
    .catch(error => console.log('Error:', error))
    .then(response => console.log('Success:', response))

    }


async function modificarUserPut (id){
  
  response = await  fetch(`https://6361a8e367d3b7a0a6cac31c.mockapi.io/users/${id}`, {
      method: 'PUT', 
      body: JSON.stringify(data2), 
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res =>{
      if(res.ok){
        res.json()
        verUsersGet ()

      } else {
      alertaError()
    }
      
      })

    .catch(error => console.error('Error:', error))
    
    .then(response => console.log('Success:', response));

    }

 function verUsersGet (){

fetch("https://6361a8e367d3b7a0a6cac31c.mockapi.io/users")

.then(data => {

return data.json();

})
.then(post => {

    if((filtroAbuscar!="")&&(filtroAbuscar!="mostrarDatosActualizados")&&(filtroAbuscar!="metodoGet")){

   let filtro = post.filter(element => element.id === filtroAbuscar)

   if(filtro.length===0){

    alertaError()

   } else {

results.innerHTML = `<li style="color:white"><span>ID: ${filtro[0].id}</span><br><span>NAME: ${filtro[0].name}</span><br><span>LASTNAME: ${filtro[0].lastname}</span></li>`}
} 
if (filtroAbuscar=== "mostrarDatosActualizados"){
   
    for (let i = 0; i < post.length; i++) {
       
      const element = post[i];
        
        results.innerHTML += `<li style="color:white"><span>ID: ${post[i].id}</span><br><span>NAME: ${post[i].name}</span><br><span>LASTNAME: ${post[i].lastname}</span></li>`
    }
} 

})}


inputPutId.addEventListener('input',()=>{
  if(((inputPutId.value).length) !=0 ){
    btnPut.removeAttribute('disabled')
  } else {
    btnPut.setAttribute('disabled',true)
  }
})

inputPostNombre.addEventListener('input',()=>{
  if((((inputPostNombre.value).length) !=0 )&&(((inputPostApellido.value).length) !=0 )) {
    btnPost.removeAttribute('disabled')
  } else {
    btnPost.setAttribute('disabled',true)
  }
})
inputPostApellido.addEventListener('input',()=>{
  if((((inputPostNombre.value).length) !=0 )&&(((inputPostApellido.value).length) !=0 )) {
    btnPost.removeAttribute('disabled')
  } else {
    btnPost.setAttribute('disabled',true)
  }
})

inputPutNombreModal.addEventListener('input',()=>{
  if((((inputPutNombreModal.value).length) !=0 )&&(((inputPutApellidoModal.value).length) !=0 )) {
    btnSendChanges.removeAttribute('disabled')
  } else {
    btnSendChanges.setAttribute('disabled',true)
  }
})

inputPutApellidoModal.addEventListener('input',()=>{
  if((((inputPutNombreModal.value).length) !=0 )&&(((inputPutApellidoModal.value).length) !=0 )) {
    btnSendChanges.removeAttribute('disabled')
  } else {
    btnSendChanges.setAttribute('disabled',true)
  }
})

inputDelete.addEventListener('input',()=>{
  if(((inputDelete.value).length) !=0 ){
    btnDelete.removeAttribute('disabled')
  } else {
    btnDelete.setAttribute('disabled',true)
  }
})     

btnDelete.addEventListener('click', ()=>{
  filtroAbuscar="mostrarDatosActualizados"
  id=inputDelete.value
  results.innerHTML =""
  borrarUserDelete (id)
  

})

function inputDeLetras (e) {
  var key = e.keyCode || e.which,
    tecla = String.fromCharCode(key).toLowerCase(),
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
    especiales = [8, 37, 39, 46],
    tecla_especial = false;

  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  if (letras.indexOf(tecla) == -1 && !tecla_especial) {
    return false;
  }
}


function alertaError(){ 
  alertMsj.classList.remove('fade') 
setTimeout(()=>{ alertMsj.classList.add('fade') },2000) }





/*Los endpoints a los que realizar las solicitudes serán:

Listar: GET https://SECRET.mockapi.io/users
Devuelve un json con una lista que contiene todos los registros.

Obtener 1: GET https://SECRET.mockapi.io/users/:id
Recibe un id en la url y devuelve un json con el registro cuyo id haya sido solicitado.

Agregar: POST https://SECRET.mockapi.io/users
Recibe un json con un objeto con los atributos name y lastname, (en el body) lo agrega a la base de datos (asignándole un id) y devuelve un json con el registro creado.

Modificar: PUT https://SECRET.mockapi.io/users/:id
Recibe un id en la url y un json con un objeto con los atributos name y lastname, (en el body), modifica con dichos datos el registro cuyo id coincida con el recibido, y devuelve un json con el registro modificado.

Eliminar: DELETE https://SECRET.mockapi.io/users/:id
Recibe un id en la url, elimina el registro cuyo id coincida con el recibido, y devuelve un json con el registro eliminado.

Ahora que tenemos listo nuestro servidor, vamos a trabajar a nivel de cliente. Para ello disponemos de una página web (adjunta) a la que debemos realizar las modificaciones necesarias para comunicarse con nuestro servidor a través de fetch().

El botón "Buscar" debe mostrar como resultado el registro cuyo id haya sido solicitado.
En caso de dejar vacío el campo del id, debe mostrar cómo resultado la lista de todos los registros.


El botón "Agregar" debe enviar al servidor un objeto construido con los valores introducidos por el usuario en los campos nombre y apellido. 
Deberá mostrar como resultado el listado de registros, incluyendo el agregado.


El botón "Modificar" deberá abrir un modal donde se muestren los campos nombre y apellido, ya con los valores cargados coincidentes con el registro cuyo id ingresó el usuario. 
El usuario debe poder modificar dichos valores, y al presionar el botón para guardar los cambios, se debe realizar la consulta adecuada para modificar el registro, cerrar el modal, y mostrar como resultado la lista de registros, con las correspondientes modificaciones.


El botón "Borrar" deberá realizar la consulta para eliminar el registro cuyo id coincida con el ingresado por el usuario, y mostrar como resultado el listado de registros, ya con el mismo eliminado.


Por último, en todos los casos, excepto el de "Buscar", los botones que realizan la consulta deberán permanecer desactivados, mientras alguno de los campos correspondientes se encuentre vacío.
Además, en caso de que la solicitud genere una respuesta con un status no ok, por ejemplo si intentamos borrar, modificar o buscar un registro inexistente, se deberá avisar al usuario por medio de una alerta que algo no salió bien.
 
*/

