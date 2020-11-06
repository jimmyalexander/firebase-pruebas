


const button = document.getElementById('boton');
const buttonIniciar = document.getElementById('boton_iniciar');
const finalizarSesion = document.getElementById('cerrar_sesion');
function observer(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Existe usuario activo');
          // User is signed in.
          activo();
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        }
         else {
            console.log('No existe usuario activo');  // User is signed out.
          // ...
        }
      });
      
      
}
observer();
const datos = observer();

function setDatos(){
    const email = document.getElementById('mail').value;
    const contraseña = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, contraseña)
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });

}

function getDatos() {
    const emailIniciar = document.getElementById('mail_iniciar').value;
    const contraseñaIniciar = document.getElementById('password_iniciar').value;
    firebase.auth().signInWithEmailAndPassword(emailIniciar, contraseñaIniciar).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}
const  activo = ()  =>  {
  const header = document.getElementById('header');
  const container = document.getElementById('container');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-around';
  container.innerHTML = `<button onclick=cerrar() id="cerrar_sesion">Cerrar sesion</button>`;

}
function cerrar(){
  firebase.auth().signOut()
  .then(()=>{
    console.log('saliendo.....');
  })
  .catch((error)=>{
    console.log(error);
  })
  location.reload();
}
button.addEventListener('click', setDatos);
buttonIniciar.addEventListener('click', getDatos);


////subir y guardar imagenes en storage
const button_enviar_storage = document.getElementById('subir_img');

const  uploadImage = ()  => {
  const ref = firebase.storage().ref();
  const file = document.querySelector('#photo').files[0];
  const name = new Date() +' '+file.name;
  if(file === undefined){
    alert('debe seleccionar una imagen para guardar')
  }
  else{
    const metadata = {
      contentType: file.type
    }
    const task = ref.child(name).put(file, metadata);
    console.log('>>><<<<'+ file);
    task
    .then(snapshot =>{ 
      snapshot.ref.getDownloadURL()
    })
    .then(ul => {
      alert('Imagen upLoad successful');
      const imageElement = document.querySelector('#image');
      imageElement.src = ul;
    })
  }
 

}
//button_enviar_storage.addEventListener('click', uploadImage);


//autenticacón con facebook

function authCuentaFacebook(){
  const provider = new firebase.auth.FacebookAuthProvider();
  console.log(provider);
  firebase.auth().signInWithPopup(provider).then(result => {
    console.log(`Bienvenidoo... ${result.user.displayName}`);
  })
  .catch(error => {
    console.log(`Error ala autentcarse con facebook ${error}`)
  })
}

button_enviar_storage.addEventListener('click', authCuentaFacebook);