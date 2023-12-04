import asyncio
import websockets

def metodo_cesar(texto, desplazamiento=3):
    alfabeto = 'abcdefghijklmnopqrstuvwxyzñABCDEFGHIJKLMNOPQRSTUVWXYZÑ'
    resultado = ""

    for char in texto:
        if char in alfabeto:
            indice = alfabeto.index(char)
            nuevo_indice = (indice + desplazamiento) % len(alfabeto)
            resultado += alfabeto[nuevo_indice]
        else:
            resultado += char

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