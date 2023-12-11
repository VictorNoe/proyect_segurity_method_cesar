let date = new Date();
const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
];

//Crear una nueva conexion a nuestro servidor
let host = 'ws://192.168.107.28:5555'; // URL del socket
let socket = new WebSocket(host); // Nos conectamos al socket

socket.onopen = function (e) {
    swal(
        {
            icon: "success",
            title: "Socket Conectado",
            text: "El socket actualmente esta conectado",
            button: false,
            timer: 2000
        }
    );
}

socket.onmessage = function (event) {
    let incrpter_message = event.data;
    messageCuerpo(caesarDecrip(event.data, 3), incrpter_message, "profile-picture-5.jpg");
}

socket.onclose = function (event) {
    swal(
        {
            icon: "warning",
            title: "Socket Desconectado",
            text: "El socket actualmente esta desconectado",
            button: false,
            timer: 2000
        }
    );
}

socket.onerror = function (event) {
    swal(
        {
            icon: "error",
            title: "Socket error",
            text: "Error en el socket",
            button: false,
            timer: 2000
        }
    );
}

//Función de incriptacion por metodo cesar
function caesarDecrip(texto, desplazamiento) {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyzñABCDEFGHIJKLMNOPQRSTUVWXYZÑ';
    let resultado = "";
    console.log(texto);

    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        let indice = alfabeto.indexOf(char);

        if (indice !== -1) {
            let nuevoIndice = (indice - desplazamiento) % alfabeto.length;
            resultado += alfabeto.charAt(nuevoIndice);
        } else {
            resultado += char;
        }
    }
    console.log(resultado);
    return resultado;
}

//Funcion que envia mensaje al servidor
function sendMessage(event) {
    event.preventDefault()
    let messageInput = document.getElementById('message_input');
    let message = messageInput.value;
    if (message.trim() !== '') {
        messageCuerpoSend(message,"profile-picture-3.jpg");
        socket.send(message);
        messageInput.value = '';
    }
}

//Función que imprime el cuerpo del html
function messageCuerpo (message,incrpter_message, img) {
    var codigoHTML = `
                <li class="mb-10 ms-6">            
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <img class="rounded-full shadow-lg" src="img/${img}" alt="Bonnie image"/>
                    </span>
                    <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600" style="width: auto;">
                        <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">${hour}:${minutes}</time>
                        <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                            <p>Mensaje encriptado: ${incrpter_message}</p>
                            <p>Mensaje descriptado: ${message}</p>
                            <p>Mensaje clave: 3 </p>
                        </div>
                    </div>
                </li>
        `;
    document.getElementById("miLista").insertAdjacentHTML('beforeend', codigoHTML);
    var objDiv = document.getElementById("scroll");
    objDiv.scrollTop = objDiv.scrollHeight;
}

//Función que imprime el cuerpo del html
function messageCuerpoSend (message, img) {
    var codigoHTML = `
                <li class="mb-10 ms-6">            
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <img class="rounded-full shadow-lg" src="img/${img}" alt="Bonnie image"/>
                    </span>
                    <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600" style="width: auto;">
                        <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">${hour}:${minutes}</time>
                        <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                            <p>Mensaje descriptado: ${message}</p>
                            <p>Mensaje clave: 3</p>
                        </div>
                    </div>
                </li>
        `;
    document.getElementById("miLista").insertAdjacentHTML('beforeend', codigoHTML);
    var objDiv = document.getElementById("scroll");
    objDiv.scrollTop = objDiv.scrollHeight;
}

//Modo oscuro
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark')
}
