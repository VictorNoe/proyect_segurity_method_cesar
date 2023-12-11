import asyncio
import websockets

#Este funcion realiza la incriptación mediante el metodo
#cesar que usa como clave de sifrado 3,
def metodo_cesar(texto, desplazamiento=3):
    print(f'Texto sin sifrar: {texto}')
    alfabeto = 'abcdefghijklmnopqrstuvwxyzñABCDEFGHIJKLMNOPQRSTUVWXYZÑ'
    resultado = ""

    for char in texto:
        if char in alfabeto:
            indice = alfabeto.index(char)
            nuevo_indice = (indice + desplazamiento) % len(alfabeto)
            resultado += alfabeto[nuevo_indice]
        else:
            resultado += char
    print(f'Texto sin sifrar: {resultado}')
    return resultado


#Esta funcion maneja la conexion de los clientes al servidor
async def chat_handler(websocket, path):
    #Guarda el cliente en el servidor
    clients.add(websocket)
    try:
        #Crea un bucle para recibir los mensajes de los clientes
        async for message in websocket:
            #Esta funcion evia los mensajes a todos los clientes
            await broadcast(message, websocket)
    finally:
        #Remueve el cliente si este no esta conectado
        clients.remove(websocket)

#Esta funcion envia los mensajes a los clientes
async def broadcast(message, sender):
    #Esterecorre todos los clientes conectados
    for client in clients:
        if client != sender:
            try:
                #Llama al metodo de incriptación y se lo manda al cliente
                await client.send(metodo_cesar(message))
            #Estas es un manejo de excepción para maneja rle caso
            #en que un cliente se desconecto durante el envio
            except websockets.ConnectionClosedError:
                pass

if __name__ == "__main__":
    #Este es un conjunto de objetos de los clientes conectados
    clients = set()

    #Esta variable es la configuracion de nuestro servidor
    start_server = websockets.serve(chat_handler, "192.168.107.28", 5555)

    #Este empieza el bucle de los eventos asyncio
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()