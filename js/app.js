//Defino la clase peliculas.
class Pelicula{

    constructor(nombre, descripcion, genero, calificacion){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.genero = genero;
        this.calificacion = calificacion;
    }
}

//Funcion para añadir peliculas
let anadirPelicula = (e) =>{

    e.preventDefault();

    //Recupero las películas almacenadas en el localStorage
    peliculas = JSON.parse(localStorage.getItem("peliculas") || "[]");

    //Obtengo los datos del formulario para la nueva película.
    const nombrePelicula = document.getElementById("title").value;
    const descripcionPelicula = document.getElementById("desc").value;
    const generoPelicula = document.getElementById("gen").value;
    const calificacionPelicula = document.getElementById("cal").value;
    let alerta = document.getElementById("alerta");

    //Verifico los datos para evitar datos vacíos con trim(). En caso de que los datos sean correctos, llamo a la funcion crearPelicula().
    (nombrePelicula.trim().length < 1) || (descripcionPelicula.trim().length < 50) || (generoPelicula.trim().length < 3) || (calificacionPelicula < 1) || (calificacionPelicula >5) ? alerta.style.color = "red" : crearPelicula(nombrePelicula, descripcionPelicula, generoPelicula, calificacionPelicula);
   
}

let crearPelicula = (nombre, descripcion, genero, calificacion) =>{

    let pelicula = 
        new Pelicula(
            nombre,
            descripcion,
            genero,
            calificacion
        )

    //Agrego la película al array
    peliculas.push(pelicula);

    //Seteo las películas en localStorage.
    localStorage.setItem("peliculas", JSON.stringify(peliculas));

    //Creo alerta para el usuario.
    Toastify({
        text: "Pelicula creada",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #0f0c29, #302b63)",
        },
        avatar: "./assets/clapperboard.png",
      }).showToast();

    //Recargo la página para que se visualicen los cambios.
    setTimeout(function(){
        window.location.reload();
     }, 1000);

}

//Funcion para mostrar las películas.
let mostrarPeliculas = () =>{

    //Recupero las películas almacenadas en el localStorage
    peliculas = JSON.parse(localStorage.getItem("peliculas") || "[]");

    //For para crear los elementos del DOM para colocar las películas.
    for(let i = 0; i<peliculas.length; i++){

        let peli = document.createElement("div");
        let titulo = document.createElement("span");
        let descrip = document.createElement("p");
        let genero = document.createElement("span");
        let calificacionContenedor = document.createElement("div");
        let calificacion = document.createElement("p");
        let botonEliminar = document.createElement("button");


        titulo.innerHTML = peliculas[i].nombre;
        descrip.innerHTML = peliculas[i].descripcion;
        genero.innerHTML = (`Género: ${peliculas[i].genero}`);
        calificacion.innerHTML = (`Calificación: ${peliculas[i].calificacion}`);
        botonEliminar.innerHTML = ('Eliminar');

        
        //Añado las clases
        peli.classList.add('peli');
        titulo.classList.add('texto1', 'titulo');
        descrip.classList.add('texto2');
        genero.classList.add('texto2');
        calificacionContenedor.classList.add('container-calif');
        calificacion.classList.add('calificacion');
        botonEliminar.classList.add('eliminar-btn');
        
        
        peli.appendChild(titulo);
        peli.appendChild(descrip);
        peli.appendChild(genero);
        peli.appendChild(calificacionContenedor);
        calificacionContenedor.appendChild(calificacion);
        calificacionContenedor.appendChild(botonEliminar);

        
        contenedorPeliculas.appendChild(peli);
    }
}

//Funcion para eliminar la película.
let eliminarPelicula = (titulo) =>{
    for(let i = 0; i<peliculas.length; i++){
        titulo === peliculas[i].nombre && peliculas.splice(i, 1);
         localStorage.setItem("peliculas", JSON.stringify(peliculas)); 
        
}
    //Recargo la página para que se visualicen los cambios.
    setTimeout(function(){
        window.location.reload();
     }, 500);
}

let notificacion = (texto) =>{

    Toastify({
        text: texto,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #0f0c29, #302b63)",
        },
        avatar: "./assets/clapperboard.png",
      }).showToast();

}

//Creo un array de objetos que contiene las películas.
let peliculas = [

]

//Variable que contiene el div para mostrar las películas.
let contenedorPeliculas = document.getElementById("container-peliculas");

//Botón para añadir películas.
let anadir = document.getElementById("add");

mostrarPeliculas();

//EventListener para añadir la película.
anadir.addEventListener('click', anadirPelicula);

//For para obtener el evento del botón Eliminar y así borrar la película con la funcion eliminarPelicula.
for (let btn of document.getElementsByClassName("eliminar-btn")){

    btn.addEventListener("click", () => {

        eliminarPelicula(btn.closest(".peli").querySelector(".titulo").textContent);

        notificacion("Pelicula eliminada")

      })

}

