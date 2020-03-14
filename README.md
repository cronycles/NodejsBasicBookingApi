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
- he utilizado la combinación mocha-supertest-chai-sinon que vienen muy bien para testear una API
- la api la he hecho muy sencilla y sin auth
- no me he perdido tanto dentro de la logica de la API, si no en como podría ser a nivel mas de arquitectura
- no he usado una BBDD como Mongo, porqué no era necesario tenerla instalada para comprobar si se o no se hacer las cosas (como también dicen las instrucciones).
- Para las reserva supongo ya de tener una base de datos con clientes registrados y, si el cliente no resulta registrado, no hago la reserva
- el la reserva estoy considerando que la api solo es de UN ESPECIFICO SMART BUILDING. Eso no lo recomendaría, pero por esigencia de test no voy a enviar ningún id de building.
- voy a tratar las fechas como si fueran del timezone current
- he puesto en los catch() console.log(e), eso está mal, lo he puesto para no crear logger y de mas, ha sido solo por rapidez. todos los console.log que hay en la aplicación hay que imaginar que sean trazas de log
- es buena practiva no devolver nada despúes del bloque try catch, si no devolver siempre tanto en el try como en el catch. Eso porqué te aseguras que en el catch siempre devuelves lo que quieres devolver en ese caso 

- se espera exportar entidades como el BookingErrorsConstants
- si no hay un body con los inputs requeridos se envía un bad request, es el único caso, si no siempre 200
- me espero unas fechas yyyy-mm-dd o yyyy/mm/dd
- habría que considerar una transación para las reglas de negocio porqué podría ocurrir que mientras se comprueban los datos haya alguien que toque la bbdd