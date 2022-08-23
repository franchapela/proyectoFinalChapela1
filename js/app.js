//Defino la clase peliculas.
class Pelicula{

    constructor(nombre, descripcion, genero, calificacion){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.genero = genero;
        this.calificacion = calificacion;
    }

    //Método para cambiar la calificación en caso de que el usuario lo requiera.
    calificar(calificacion){
        
        //Creo una variable la cual tendrá el cálculo de la media entre las calificaciones.
        let num = (parseInt(calificacion, 10) + parseInt(this.calificacion, 10)) / 2;

        //Asigno la nueva calificación utilizando "toFixed" para redondear a 1 decimal.
        this.calificacion = num.toFixed(1);

    }

}

//Función para mostrar un menu con el nombre del usuario y un array para asignar a las demás funciones.
let menu = (nombre, array) => {

        //Defino variable para pedir las opciones al usuario
        let eleccion = prompt(`Saludos ${nombre}, elige una de las opciones a continuación: \n1) Mostrar películas. \n2) Agregar película. \n3) Salir.`);

        switch(eleccion){
            case '1':
                //Función que muestra la pelicula que mediante la función "pedirOpcion" se seleccionó.
                mostrarPelicula(array, pedirOpcion(array));

                //Volver al menu.
                menu(nombre, array);
                break;
            case '2':
                //Función que permite agregar una película a la lista.
                agregarPelicula();

                menu(nombre, array);
                break;
            case '3':
                alert("¡Adiós!");
                break;
            default:
                alert("Ingrese una opción válida.");
                menu(nombre, array);
        }
}

//Función para pedir nombre al usuario.
let bienvenida = () => {
        
    let nombre;
      
    nombre = prompt("¡Hola! Por favor ingresa tu nombre (al menos 2 caracteres):");

    //Bucle while para corroborar el nombre.
     while(nombre.length < 2){
         nombre = prompt("Nombre demasiado corto, intenta de nuevo:");
    }

    return nombre; 
}

//Función para mostrar la película(array) especificada en la opción y dar la posibilidad de calificarla.
let mostrarPelicula = (array, opcion) => {

    //Muestro la película solicitada en la opción.
    alert(`Título: ${peliculas[(opcion-1)].nombre} \nDescripción: \n${peliculas[(opcion-1)].descripcion}\nGénero: ${peliculas[(opcion-1)].genero}\nCalificación: ${peliculas[(opcion-1)].calificacion}`);

    //En caso de que el usuario confirme que quiere calificar la película, se llama a la funcion obtenerCalificacion.
    let calificar = confirm(`Si quieres dejar una calificación, presiona aceptar. De caso contrario, presiona cancelar para volver al menú.`);

    if(calificar){

        obtenerCalificacion(array, opcion);

    }

    // calificar(pedirOpcion(array,opcion));
    alert("Redirigiendo al menú.");
}

//Función para agregar una nueva película.
let agregarPelicula = () => {

    //Creo nuevo objeto en el array "peliculas" con los datos proporcionados por el usuario.
    peliculas.push(new Pelicula(
        prompt(`Ingresa el nombre de la película: `),
        prompt(`Ingresa la descripción, mínimo 50 caracteres: `),
        prompt(`¿Cuál es el género o los géneros?:`),
        prompt(`Calificación entre 1 y 5:`),
        ));
   
        //Evitar que se ingrese un dato vacío.
    while(peliculas[peliculas.length-1].nombre < 1){
            peliculas[peliculas.length-1].nombre = prompt("Nombre no válido, intenta nuevamente:");
    }

        //Si la calificación es mayor a 5, menor a 1 o no es un número, se informa al usuario del error y se le pide que vuelva a introducir los datos.
    while((peliculas[peliculas.length-1].calificacion > 5) || (peliculas[peliculas.length-1].calificacion < 1) || isNaN(peliculas[peliculas.length-1].calificacion)){
            peliculas[peliculas.length-1].calificacion = prompt("Calificación no válida, por favor intente nuevamente:");
            
    }

        //Si la descripción es menor a 50 caracteres o son números, se informa al usuario y se pide nuevamente el ingreso de datos.
    while((peliculas[peliculas.length-1].descripcion.length < 50) || !(isNaN(peliculas[peliculas.length-1].descripcion))){
            peliculas[peliculas.length-1].descripcion = prompt("Descripción demasiado corta o inválida, por favor escriba un mínimo de 50 caracteres. Vuelva a ingresar una descripción:");

    }

        //Si el género es un número o es menor a 3 caracteres, se informa y se pide otra vez.
    while((!(isNaN(peliculas[peliculas.length-1].genero)) || (peliculas[peliculas.length-1].genero.length < 3))){
            peliculas[peliculas.length-1].genero = prompt("Vuelva a ingresar un género:");

    }

    alert("Redirigiendo al menú.");

}

//Función para obtener la calificación.
let obtenerCalificacion = (array, opcion) =>{

    //Obtengo el nombre de la pelicula a calificar.
    let nombrePelicula = peliculas[(opcion-1)].nombre;

    //Pido la calificación.
    let calificacion = prompt(`Ingrese la calificación entre 1-5 de ${nombrePelicula}, en caso de no querer dejar una calificación, por favor introduzca 0.`);
    
    //Verifico que la calificación no tenga letras y se encuentre entre 1-5.
    while((isNaN(calificacion)) || (calificacion > 5) || (calificacion < 1) || (calificacion === null)){
        //Si calificación = 0, se sale el bucle while y vuelve al menu.
        if(calificacion === "0"){
            break;
        }
        else{
            calificacion = prompt(`Calificación inválida, ingrese la calificación entre 1-5 de ${nombrePelicula}, en caso de no querer dejar una calificación, introduzca 0.`);
        }
    }

    //Si la calificación no es 0, entonces busco la película dentro del array de objetos con un findIndex, luego envío la calificación al objeto en cuestión con el método calificar para modificar su calificación.
    if(calificacion !== "0"){

        //Busco el indice del objeto a modificar la calificación.
        let index = array.findIndex((array) => array.nombre == nombrePelicula);

        //Envío el objeto con el método calificar y su nueva calificación.
        array[index].calificar(calificacion);

        alert("Gracias por calificar.");

    }

}

//Función pedirOpcion para mostrar y pedir las opciones, ordenándolas según el array proporcionado.
let pedirOpcion = (array) => {

        //Mapeo el array obtenido como argumento para sacar los nombres de las películas.
        let show = array.map(function(element){
            return `${element.nombre}`;
        })

        //Defino la variable que almacenará la opción elegida.
        let opcion;

        //Creo array para sostener los objetos y mostrarlos.
        let sosten = [];

        //Utilizo un for para recorrer el array y almaceno en sosten los valores junto con un índice.
        for(let i = 0; i<show.length; i++){
            sosten[i] = [`${i+1}) ${show[i]}`];
        }

        //Pido opción al usuario.
        opcion = prompt(`Elija una opción: \n`+ sosten.join(`\n`));

        //Verifico que la opción introducida por el usuario sea válida. En caso de que no lo sea, se pide otra vez.
        while((opcion < 1) || (opcion > sosten.length) || (isNaN(opcion))){
            opcion = prompt("Elija una opción válida: \n" + sosten.join(`\n`));
           }
 
        return opcion;
}

//Creo un array de objetos que contiene varias películas.
let peliculas=[
    new Pelicula(
        "Transformers",
        "Optimus Prime, líder de los Autobots, narra el colapso del planeta natal de los Transformers, Cybertron. Quedó inhabitable por una guerra entre los Autobots y los Decepticons. Liderados por Megatron, los Decepticons buscan la Chispa Suprema para poder usarla para apoderarse del universo. Los Autobots quieren encontrar la Chispa Suprema para usarla para reconstruir Cybertron y finalizar la guerra. Megatron logró localizar la Chispa Suprema en la Tierra, pero se estrelló en el círculo ártico y se congeló en el hielo. Después de toparse con su cuerpo congelado en 1897, el explorador Capitán Archibaldo Witwicky accidentalmente activó el sistema de navegación de Megatron y en sus anteojos quedaron grabadas las coordenadas de la localización de la Chispa Suprema, un incidente que lo dejó ciego y mentalmente inestable.",
        "Acción",
        4,
    ),
    new Pelicula(
        "Vengadores: Infinity War",
        "Los Vengadores y sus aliados deben estar dispuestos a sacrificarlo todo para intentar derrotar al poderoso Thanos antes de que su ataque de devastación y ruina ponga fin al universo.",
        "Acción",
        4,
    ),
    new Pelicula(
        "Haunting on Fraternity Row",
        "Una casa de la fraternidad organiza su gran fiesta de Luau de invierno, pero cuando los hermanos de la fraternidad comienzan a morir de horribles muertes descubren que una entidad maligna se ha apoderado de la casa.",
        "Terror",
        3,
    ),
    new Pelicula(
        "Teléfono negro",
        "Finney Shaw, un tímido, pero inteligente niño de 13 años es secuestrado por un sádico asesino y atrapado en un aterrador, oscuro y aislado sótano, donde los gritos son de poca utilidad. Cuando un teléfono negro desconectado en la pared comienza a sonar, Finney descubre que puede escuchar a los espíritus de las víctimas anteriores del asesino.",
        "Terror",
        4,
    ),
    new Pelicula(
        "Temporada de bodas",
        "En un intento por mantener alejados a sus padres obsesionados con el matrimonio, una mujer indio-estadounidense consigue un novio falso para la temporada de bodas, pero al final, tiene el coraje de dejar de vivir una doble vida.",
        "Romance",
        3.5,
    ),
    new Pelicula(
        "Verdens verste menneske",
        "Julie va a cumplir los treinta y su vida es un desastre existencial. Ya ha desperdiciado parte de su talento y su novio Aksel, un exitoso novelista gráfico mayor que ella, la presiona para que contenga su energía creativa y siente la cabeza. Una noche se cuela en una fiesta y conoce al joven y encantador Eivind. Tardará poco en romper con Aksel y embarcarse en una nueva relación con la esperanza de que su vida adquiera una nueva perspectiva. Sin embargo, tendrá que darse cuenta de que ya es demasiado tarde para ciertas opciones vitales.",
        "Romance",
        2,
    ),
    new Pelicula(
        "La familia del futuro",
        "En esta aventura animada, el inventor brillante Lewis del preadolescente crea un explorador de la memoria para recuperar sus primeros recuerdos y para descubrir porqué su madre lo dio para la adopción. Pero cuando el villano Bowler Hat Guy roba la máquina, Lewis está listo para renunciar a su búsqueda hasta que el misterioso Wilbur Robinson aparece en la escena, llevando a Lewis al futuro para encontrar el escáner y su mamá.",
        "Animación",
        5,
    ),
    new Pelicula(
        "Minions: Nace un villano",
        "Mucho antes de convertirse en un genio del mal, Gru no era más que un chaval de 12 años en plenos años 70 tratando de conquistar el mundo desde el sótano de su casa de un barrio residencial cualquiera. Y no le iba demasiado bien. Pero cuando Gru se cruza en su camino con Kevin, Stuart, Bob, y Otto un nuevo Minion con aparato en los dientes y desesperado por sentirse aceptado—, esta inesperada familia unirá fuerzas para construir su primera guarida, diseñar sus primeras armas y llevar a cabo sus primeras misiones.",
        "Animación",
        4,
    )
]

//Llamo a la función "menu" dándole el nombre mediante la función "bienvenida" y el array peliculas.
menu(bienvenida(), peliculas);


   

