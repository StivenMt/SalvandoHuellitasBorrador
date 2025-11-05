// Mascotas de ejemplo  
if (localStorage.getItem("pets") == null) {
  let guardador = [];
  localStorage.setItem("pets", JSON.stringify(guardador));
}

if (localStorage.getItem("solicitudes") == null) {
  localStorage.setItem("solicitudes", JSON.stringify([]));
}

function obte_pets() {
  return JSON.parse(localStorage.getItem("pets") || "[]");
}

function guardar_pets(pets) {
  localStorage.setItem("pets", JSON.stringify(pets));
}

function obtener_pets() {
  return JSON.parse(localStorage.getItem("solicitudes") || "[]");
}

function guardar_solics(reqs) {
  localStorage.setItem("solicitudes", JSON.stringify(reqs));
}


// Mostrar Mascotas al Público
function showPets(tipo) {
  let contnedor = document.getElementById("contenedor_mascotas");
  if (!contnedor) return;
  
  contnedor.innerHTML = "";
  let pets = obte_pets();

  if (tipo && tipo !== "all") {
    let filtradas = [];
    for (let i = 0; i < pets.length; i++) {
      if (pets[i].type == tipo) {
        filtradas.push(pets[i]);
      }
    }
    pets = filtradas;
  }

  if (pets.length == 0) {
    contnedor.innerHTML = "<p>No hay mascotas en esta categoría.</p>";
    return;
  }

  for (let i = 0; i < pets.length; i++) {
    let p = pets[i];
    let div = document.createElement("div");
    div.className = "carta_mascota";
    div.innerHTML =
      "<img src='" + p.img + "' alt='" + p.name + "'>" +
      "<h3>" + p.name + " (" + p.type + ")</h3>" +
      "<p><b>Raza:</b> " + p.breed + "</p>" +
      "<p>" + p.desc + "</p>" +
      "<button onclick='openAdoptionForm(" + p.id + ")'>Adoptar</button>";
    contnedor.appendChild(div);
  }
}

function filterPets(tipo) {
  showPets(tipo);
}


// Admin
function mirar_mascotas_admin() {
  let list = document.getElementById("lsta_mascotas_admin");
  list.innerHTML = "";
  let pets = obte_pets();

  for (let i = 0; i < pets.length; i++) {
    let p = pets[i];
    let div = document.createElement("div");
    div.innerHTML =
      "<p>" + p.name + " (" + p.type + ")</p>" +
      "<button onclick='deletePet(" + p.id + ")' class='btns_bo' >Eliminar</button>";
    list.appendChild(div);
  }
}

function deletePet(id) {
  let pets = obte_pets();
  let mascotas_nuevas = [];

  for (let i = 0; i < pets.length; i++) {
    if (pets[i].id !== id) {
      mascotas_nuevas.push(pets[i]);
    }
  }

  guardar_pets(mascotas_nuevas);
  mirar_mascotas_admin();
}


// Admin - Solicitudes

function soli_admin() {
  let list = document.getElementById("lista_solicitudes_admin");
  let solicitudes = obtener_pets();
  list.innerHTML = "";

  if (solicitudes.length == 0) {
    list.innerHTML = "<p>No hay solicitudes.</p>";
    return;
  }

  for (let i = 0; i < solicitudes.length; i++) {
    let r = solicitudes[i];
    let div = document.createElement("div");
    div.innerHTML =
      "<p><b>Solicitante:</b> " + r.name + "<br>" +
      "<b>Email:</b> " + r.email + "<br>" +
      "<b>Mascota:</b> " + r.petName + "<br>" +
      "<b>Mensaje:</b> " + r.msg + "</p>" +
      "<button onclick='deleteRequest(" + r.id + ")' class='btns_eli' >Eliminar</button>" + 
      "<a href='mailto:" + r.email +"?subject=Salvando%20Huellitas%20🐕&body=Hola%20 "+ r.name +",%20¡Nos%20alegra%20informarte%20que%20tu%20solicitud%20de%20adopción%20ha%20sido%20aceptada!%20🎉%0A%0APróximamente%20uno%20de%20nuestros%20asesores%20se%20pondrá%20en%20contacto%20contigo%20para%20coordinar%20la%20visita%20a%20"+ r.petName +",%20verificar%20el%20espacio%20donde%20vivirá%20y%20explicarte%20los%20últimos%20pasos%20del%20proceso.%0A%0A-Adoptar%20es%20un%20acto%20de%20amor%20que%20cambia%20dos%20vidas%20❤️' class='btns_ac'>Aceptar</a> "+ 
      "<a href='mailto:" + r.email +"?subject=Salvando%20Huellitas%20🐕&body=Agradecemos%20sinceramente%20tu%20interés%20en%20adoptar%20con%20nosotros.%20Tras%20revisar%20cuidadosamente%20tu%20solicitud,%20lamentamos%20informarte%20que%20no%20ha%20sido%20aprobada%20en%20esta%20ocasión.%0A%0ANuestra%20prioridad%20es%20garantizar%20que%20cada%20animal%20encuentre%20el%20entorno%20más%20adecuado%20para%20su%20bienestar.%20Te%20invitamos%20a%20participar%20de%20futuras%20adopciones%20o%20a%20colaborar%20como%20voluntario%20o%20donante,%20para%20seguir%20ayudando%20a%20más%20animales%20a%20encontrar%20un%20hogar.%0A%0A-Aunque%20esta%20vez%20no%20fue%20posible,%20siempre%20hay%20otras%20formas%20de%20ayudar.%20💕' class='btns_re'>Rechazar</a> ";
    list.appendChild(div);
  }
}

function deleteRequest(id) {
  let reqs = obtener_pets();
  let nuevas_solics = [];

  for (let i = 0; i < reqs.length; i++) {
    if (reqs[i].id !== id) {
      nuevas_solics.push(reqs[i]);
    }
  }

  guardar_solics(nuevas_solics);
  soli_admin();
}


// Adopción
let mascotas_actuales = null;

function openAdoptionForm(id) {
  let pets = obte_pets();
  for (let i = 0; i < pets.length; i++) {
    if (pets[i].id == id) {
      mascotas_actuales = pets[i];
      break;
    }
  }
  
  let formulario = document.getElementById("mascota_formulario");
  formulario.classList.remove("success-mode");
  document.getElementById("formulario_adopcion").reset();
  
  document.getElementById("mascota_adopcion").innerText = "Adoptando a: " + mascotas_actuales.name;
  formulario.classList.remove("ocultador");
}


let cerrarFormBtn = document.getElementById("cerrar_form");
if (cerrarFormBtn) {
  cerrarFormBtn.onclick = function () {
    let formulario = document.getElementById("mascota_formulario");
    formulario.classList.add("ocultador");
    formulario.classList.remove("success-mode");
  };
}

// Enviar formulario de adopción
let formAdopcion = document.getElementById("formulario_adopcion");
if (formAdopcion) {
  formAdopcion.onsubmit = function (e) {
    e.preventDefault();
    let reqs = obtener_pets();
    let newReq = {
      id: Date.now(),
      petName: mascotas_actuales.name,
      name: document.getElementById("nombre_solicitante").value,
      email: document.getElementById("email_solicitante").value,
      msg: document.getElementById("msg_solicitante").value
    };
    reqs.push(newReq);
    guardar_solics(reqs);
    
    let formulario = document.getElementById("mascota_formulario");
    formulario.classList.add("success-mode");
    
    let mensajeTexto = "Gracias " + newReq.name + ", tu solicitud para adoptar a " + mascotas_actuales.name + " ha sido enviada exitosamente. Pronto nos pondremos en contacto contigo al correo " + newReq.email + ".";
    document.getElementById("success-mensaje-texto").innerText = mensajeTexto;
    
    // Cambiar el texto del botón cerrar
    document.getElementById("cerrar_form").innerText = "Cerrar";
  };
}


// Admin: con Modal

let btnAdmin = document.getElementById("btn-admin");
if (btnAdmin) {
  btnAdmin.onclick = function () {
    let modal = document.getElementById("modal-admin-login");
    modal.classList.remove("ocultador");
    document.getElementById("admin-password-input").value = "";
    document.getElementById("login-error").classList.add("ocultador");
    document.getElementById("admin-password-input").focus();
  };
}

let btnCancelarLogin = document.getElementById("btn-cancelar-login");
if (btnCancelarLogin) {
  btnCancelarLogin.onclick = function () {
    document.getElementById("modal-admin-login").classList.add("ocultador");
  };
}

let btnConfirmarLogin = document.getElementById("btn-confirmar-login");
if (btnConfirmarLogin) {
  btnConfirmarLogin.onclick = function () {
    let pass = document.getElementById("admin-password-input").value;
    if (pass == "animales") {
      document.getElementById("modal-admin-login").classList.add("ocultador");
      document.getElementById("vista_p_general").classList.add("ocultador");
      document.getElementById("panel_administrador").classList.remove("ocultador");
      mirar_mascotas_admin();
      soli_admin();
    } else {
      document.getElementById("login-error").classList.remove("ocultador");
      document.getElementById("admin-password-input").value = "";
      document.getElementById("admin-password-input").focus();
    }
  };
}

// Permitir Enter para login
let passwordInput = document.getElementById("admin-password-input");
if (passwordInput) {
  passwordInput.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
      document.getElementById("btn-confirmar-login").click();
    }
  });
}

let btnSalir = document.getElementById("btn_salir");
if (btnSalir) {
  btnSalir.onclick = function () {
    document.getElementById("panel_administrador").classList.add("ocultador");
    document.getElementById("vista_p_general").classList.remove("ocultador");
  };
}


// Agregar Mascota
let formAgregarMascota = document.getElementById("agregar_mascotas");
if (formAgregarMascota) {
  formAgregarMascota.onsubmit = function (e) {
    e.preventDefault();
    let pets = obte_pets();
    let newPet = {
      id: Date.now(),
      name: document.getElementById("pet_nmbre").value,
      breed: document.getElementById("pet_raza").value,
      img: document.getElementById("pet_img").value,
      desc: document.getElementById("pet_desc").value,
      type: document.getElementById("pet_type").value
    };
    pets.push(newPet);
    guardar_pets(pets);
    mirar_mascotas_admin();
    alert("Mascota agregada!");
    e.target.reset();
  };
}

// Navegación
function tndv() {
  window.location.href = "tienda.html";
}

function irMascotas() {
  window.location.href = "mascotas.html";
}

function volverInicio() {
  window.location.href = "index.html";
}

// Inicialización
showPets();