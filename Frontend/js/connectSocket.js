let host = 'ws://localhost:5555'; // URL del socket
let socket = new WebSocket(host); // Nos conectamos al socket
console.log(socket);
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
    messageCuerpo(event.data, "profile-picture-5.jpg")
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

function caesar(txt, desp) {
    var respuesta = "";
    for (var i = 0; i < txt.length; i++) {
        var caracter = txt[i];
        if (/[a-zA-Z]/.test(caracter)) {
        var codigo = txt.charCodeAt(i) + desp;
        if (/[a-z]/.test(caracter) && codigo > 122) {
            codigo -= 26;
        } else if (/[A-Z]/.test(caracter) && codigo > 90) {
            codigo -= 26;
        } else if (codigo < 0) {
            codigo += 26;
    }      
        caracter = String.fromCharCode(codigo);
    }
        respuesta += caracter;
    }
    return respuesta;
}

function sendMessage() {
    let messageInput = document.getElementById('message_input');
    let message = messageInput.value;
    if (message.trim() !== '') {
        messageCuerpo(message, "profile-picture-3.jpg");
        socket.send(message);
        messageInput.value = '';
    }
}

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark')
}

function messageCuerpo (message, img) {
    var codigoHTML = `
            <ol class="relative border-s border-gray-200 dark:border-gray-700">
                <li class="mb-10 ms-6">            
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <img class="rounded-full shadow-lg" src="img/${img}" alt="Bonnie image"/>
                    </span>
                    <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                        <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</time>
                        <div class="text-sm font-normal text-gray-500 dark:text-gray-300">${message}</div>
                    </div>
                </li>
            </ol>
        `;
    document.getElementById("miLista").insertAdjacentHTML('beforeend', codigoHTML);
}