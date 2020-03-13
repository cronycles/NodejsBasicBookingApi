# All Iron Test
by Daniele Crosetti

## Instalación: 
### Pre-requisitos
Para proceder a la instalación de la aplicación hay que tener antes preinstaladas las 2 siguentes cosas:
- [NodeJs](https://nodejs.org/en/download/ "NodeJs")
- [npm](https://www.npmjs.com/get-npm "npm") (se supone que instalando ya NodeJs se instala automaticamente npm)
Para probar si todo funciona despué de la instalación simplemente habrír el terminal y ejecutar las 2 siguientes líneas:
```
node -v
npm -v
```
y ver si las 2 respuestas que devuelves son las 2 versiones que tenéis instaladas
### preparación librerías del proyecto
simplemente en la carpeta del proyecto abrír el terminal y ejecutar:
```
npm install
```
## Start proyecto
simplemente en la carpeta del proyecto abrír el terminal y ejecutar:
```
npm start
```
debería de salir un mensaje que dice: `running at port 3000`

## Notas de desarrollo
- he utilizado babel para transpilar el código y poder escribir mas facilmente en ES6
- he utilizado la combinación mocha-supertest-chai que vienen muy bien para testear una API
- la api la he hecho muy sencilla y sin auth
- no me he perdido tanto dentro de la logica de la API, si no en como podría ser a nivel mas de arquitectura
- no he usado una BBDD como Mongo, porqué no era necesario tenerla instalada para comprobar si se o no se hacer las cosas (como también dicen las instrucciones).
- Para las reserva supongo ya de tener una base de datos con clientes registrados y, si el cliente no resulta registrado, no hago la reserva


