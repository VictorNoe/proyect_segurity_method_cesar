import asyncio
import websockets

def metodo_cesar(texto, clave = 3):
    resultado = ""

    for caracter in texto:
        if caracter.isalpha():
            mayuscula = caracter.isupper()
            caracter = caracter.lower()
            codigo = ord(caracter)
            codigo_cifrado = (codigo - ord('a') + clave) % 26 + ord('a')
            caracter_cifrado = chr(codigo_cifrado)
            resultado += caracter_cifrado.upper() if mayuscula else caracter_cifrado
        else:
            resultado += caracter

    return resultado


async def chat_handler(websocket, path):
    clients.add(websocket)
    try:
        async for message in websocket:
            await broadcast(message, websocket)
    finally:
        clients.remove(websocket)

async def broadcast(message, sender):
    for client in clients:
        if client != sender:
            try:
                await client.send(metodo_cesar(message))
            except websockets.ConnectionClosedError:
                pass

if __name__ == "__main__":
    clients = set()

    start_server = websockets.serve(chat_handler, "localhost", 5555)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()