let host = 'ws://192.168.1.65:5555'; // URL del socket
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
    messageCuerpo(caesarDecrip(event.data, 3), "profile-picture-5.jpg")
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

function caesarDecrip(texto, desplazamiento) {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyzñABCDEFGHIJKLMNOPQRSTUVWXYZÑ';
    let resultado = "";

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

    return resultado;
}

function sendMessage(event) {
    event.preventDefault()
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
    var objDiv = document.getElementById("scroll");
    objDiv.scrollTop = objDiv.scrollHeight;
}
