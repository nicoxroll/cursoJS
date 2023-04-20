//No se si la estructura de control es la correcta para el proyecto, la use porque se me hacia sencillo de comprender para mi.
function validarFormulario() {
    var Nombre = document.getElementById("nombre").value;

    var Correo = document.getElementById("correo").value;

    var Asunto = document.getElementById("asunto").value;

    var Mensaje = document.getElementById("mensaje").value;


    if (Nombre == "") {
        alert("Ingrese su nombre");
        return false;
    }

    if (Correo == "") {
        alert("Ingrese su correo electrónico");
        return false;
    }

    if (Asunto == "") {
        alert("Ingrese un asunto");
        return false;
    }

    if (Mensaje == "") {
        alert("Ingrese un mensaje");
        return false;
    }

    return true;
}

//Estas expresiones regulares la saque del Git de falconmasters, lo medio adapte acorde a lo que se pide en la pagina, me avisan si no es valido para el proyecto.
const expresiones = {
	Nombre: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras y espacios, pueden llevar acentos.
	Correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    Mensaje: /^[a-zA-ZÀ-ÿ\s]{1,200}$/, // Letras y espacios, pueden llevar acentos.
    Asunto: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios, pueden llevar acentos.
}