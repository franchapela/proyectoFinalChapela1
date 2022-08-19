//Defino la clase peliculas.
class Pelicula{

    constructor(nombre, descripcion, genero, calificacion){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.genero = genero;
        this.calificacion = calificacion;
    }

}

//Creo la clase menu
class Menu{

    constructor(nombre){
        this.nombre = nombre;
    }

    //Método para pedir nombre y comprobar que tenga al menos dos caracteres.
    bienvenida(){
        
        let nombre;
          
	    nombre = prompt("¡Hola! Por favor ingresa tu nombre (al menos 2 caracteres):");
        //Bucle while para corroborar el nombre.
	     while(nombre.length < 2){
             nombre = prompt("Nombre demasiado corto, intenta de nuevo:");
        }

        this.nombre = nombre;  
    }

    //Método mostrarMenu que permite acceder a todas las funciones disponibles mediante un prompt y un switch.
    mostrarMenu(){

        //Defino variable para pedir las opciones al usuario
        let eleccion = prompt(`Saludos ${this.nombre}, elige una de las opciones a continuación: \n1) Mostrar películas. \n2) Agregar película. \n3) Salir.`);

        switch(eleccion){
            case '1':
                this.mostrarPeliculas();
                this.mostrarMenu();
                break;
            case '2':
                this.agregarPelicula();
                this.mostrarMenu();
                break;
            case '3':
                alert("¡Adiós!");
                break;
            default:
                alert("Ingrese una opción válida.");
                this.mostrarMenu();
        }
    }

    //Método para agregar películas.
    agregarPelicula(){

        //Declaro variable booleana para validar las comprobaciones.
        let error;

        //Creo nuevo objeto en el array "peliculas" con los datos proporcionados por el usuario.
        peliculas.push(new Pelicula(
            prompt(`Ingresa el nombre de la película: `),
            prompt(`Ingresa la descripción, mínimo 50 caracteres: `),
            prompt(`¿Cuál es el género o los géneros?:`),
            prompt(`Calificación entre 1 y 5:`),
            ))

        //Mediante un bucle do while, compruebo cada dato.
        do{
            
            //Evitar que se ingrese un dato vacío.
            if(peliculas[peliculas.length-1].nombre < 1){
                peliculas[peliculas.length-1].nombre = prompt("Nombre no válido, intenta nuevamente:");
            }

            //Si la calificación es mayor a 5, menor a 1 o no es un número, se informa al usuario del error y se le pide que vuelva a introducir los datos.
            if((peliculas[peliculas.length-1].calificacion > 5) || (peliculas[peliculas.length-1].calificacion < 1) || isNaN(peliculas[peliculas.length-1].calificacion)){
                peliculas[peliculas.length-1].calificacion = prompt("Calificación no válida, por favor intente nuevamente:");
                error = true;
            }

            //Si la descripción es menor a 50 caracteres o son números, se informa al usuario y se pide nuevamente el ingreso de datos.
            if((peliculas[peliculas.length-1].descripcion.length < 50) || !(isNaN(peliculas[peliculas.length-1].descripcion))){
                peliculas[peliculas.length-1].descripcion = prompt("Descripción demasiado corta o inválida, por favor escriba un mínimo de 50 caracteres. Vuelva a ingresar una descripción:");
                error = true;
            }

            //Si el género es un número o es menor a 3 caracteres, se informa y se pide otra vez.
            if((!(isNaN(peliculas[peliculas.length-1].genero)) || (peliculas[peliculas.length-1].genero.length < 3))){
                peliculas[peliculas.length-1].genero = prompt("Vuelva a ingresar un género:");
                error = true;
            }

            else{
                error = false;
            }

        //Mientras error === true, el bucle no avanza.
        }while(error === true);

        alert("Redirigiendo al menú.");

        }

    //Método para mostrar las peliculas que se encuentran almacenadas.
    mostrarPeliculas(){

        //Utilizo map para extraer los nombres de las peliculas en una nueva variable.
        let show = peliculas.map(function(element){
            return `${element.nombre}`;
        })
        
        //Utilizo método calificar con el método pedirOpcion para pedir las opciones, mostrar la que el usuario elija y darle la posibilidad de calificarla.
        this.calificar(this.pedirOpcion(show))

        alert("Redirigiendo al menú.");
    }

    //Método pedirOpcion para mostrar y pedir las opciones al usuario. Pide un array para crear las opciones. Devuelve la opción elegida.
    pedirOpcion(array){

        //Defino la variable que almacenará la opción elegida.
        let opcion

        //Creo array para sostener los objetos y mostrarlos.
        let sosten = [];

        //Utilizo un for para recorrer el array y almaceno en sosten los valores junto con un índice.
        for(let i = 0; i<array.length; i++){
            sosten[i] = [`${i+1}) ${array[i]}`];
        }

        //Pido opción al usuario.
        opcion = prompt(`Elija una opción: \n`+ sosten.join(`\n`));

        //Verifico que la opción introducida por el usuario sea válida. En caso de que no lo sea, se pide otra vez.
        while((opcion < 1) || (opcion > sosten.length) || (isNaN(opcion))){
            opcion = prompt("Elija una opción válida: \n" + sosten.join(`\n`));
           }
 
        return opcion;
    }

    //Método para darle al usuario la posibildad de insertar calificaciones entre 1 y 5 a la película seleccionada, estas calificaciones se promedian. Toma como parámetro la opción elegida previamente en el método pedirOpcion.
    calificar(opcion){

        //Un confirm que muestra la película selecionada, si el usuario acepta, puede dejar una calificación.
        let calificar = confirm(`Título: ${peliculas[opcion-1].nombre} \nDescripción: \n${peliculas[opcion-1].descripcion}\nGénero: ${peliculas[opcion-1].genero}\nCalificación: ${peliculas[opcion-1].calificacion} \nSi quieres dejar una calificación, presiona aceptar. De caso contrario, presiona cancelar para volver al menú.`);

        //Si el usuario acepta, se suma 1 al contador
        if(calificar === true){

            let cont = 1;

            cont ++;


            //Se pide la nueva calificación.
            let nuevaCalificacion = prompt(`Ingresa tu calificación de ${peliculas[opcion-1].nombre}`);

            while((nuevaCalificacion > 5) || (nuevaCalificacion < 1) || isNaN(nuevaCalificacion)){
                nuevaCalificacion = prompt("Calificación no válida, por favor intente nuevamente:");
            }

            //Se hace un promedio entre ambas calificaciones.
            peliculas[opcion-1].calificacion = (parseInt(peliculas[opcion-1].calificacion, 10)+ parseInt(nuevaCalificacion, 10)) / cont;

            alert("Gracias por tu calificación.");
        }
        
    }
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


//Creo objeto menu.
let nuevoMenu = new Menu();

nuevoMenu.bienvenida();
nuevoMenu.mostrarMenu();


   

