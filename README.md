# Nodejs api test
by Daniele Crosetti

## Descripcion
api para reservas, checkin, checkout y domotica de un edificio smart

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

## Configuracion
hay un fichero lamado **serviceConfiguration.js** que sirve para configurar si la generación del **accessCode** hay que hacera con mock o hay de verdad un servicio por ahi que devuelve el code.
La api funciona en los 2 casos.

## Start proyecto
simplemente en la carpeta del proyecto abrír el terminal y ejecutar:
```
npm start
```
debería de salir un mensaje que dice: `running at port 3000`

## test proyecto
simplemente en la carpeta del proyecto abrír el terminal y ejecutar:
```
npm test
```

## Notas de desarrollo

### frameworks y librerías
- he utilizado babel para transpilar el código y poder escribir mas facilmente en ES6
- he utilizado la combinación mocha-supertest-chai-sinon que vienen muy bien para testear una API
- el accessCode puede ser generado via mock o via ControAccessService si está activo.

### consideraciones iniciales
- el la reserva estoy considerando que la API solo sirve UN ESPECIFICO SMART BUILDING. Eso no lo recomendaría, pero para este mock-project no voy a enviar ningún id de building en las llamadas.
- considero que el edificio no se llena nunca de reservas.
- considero que la reserva siempre sea de una sola persona que reserva siempre una sola habitación
- He supuesto que las entitades de BBDD de **clientes** sean solo ids
- He supuesto que las entitades de BBDD de **doors** sean solo ids
- he considerado que un cliente puede tener más de una reserva en el building
- no se consideran timezones, ni problemas de fechas o cultura. Se han tratato las fechas de manera simple. (me espero fechas yyyy-mm-dd o yyyy/mm/dd)
- En los catch() se han puesto console.log(e). Esto tampoco es recomendable. Hay que implementar un Logger!.

### logica y arquitectura
- la api la he hecho muy sencilla y sin auth, pero con un poquito de arquitectura "con sentido".
- no me he perdido tanto dentro de la logica de negocio (que necesitaría transaciones y discusiones para ver donde meterla y como hacer que sea lo más performante posible con la bbd [transactions, cache, ...])
- la logica de negocio la he "aislado" del resto para que se pueda facilmente individuar (y exportar a otro lado si se quiere) y no quede mezclada con el resto.
- hay entitades (por ahora solo constants) que las he puesto en carpetas **sharedEntities**. Eso se imagina sean entitades para luego subir a algun repositorio y que los que llaman a la api puedan utilizarlas para facilitar el mapping de lo que la api devuelve. (más explicaciones a voz) 
- no he pensado mucho a como podría ser representada la estructura de una BBDD optima, me he limitado a decir que por ahora un access code está ligado a la reserva y que se cancela con el checkout o la anulación de ella, pero en mi Repositorio está en una tabla a parte (pero eso lo he hecho para facilitar mi implementacion)

### estructura
- he dividido el arbol del proyecto por sections, para tener junto las cosas que tienen que ver con ellas y no he separado en /controllers, /routes, /etc.. porqué para mi así se entiende mejor y se encuentran antes las cosas.

### funcionamiento de la API
- si no hay un body con los inputs del tipo requeridos se envía un bad request, es el único caso, si no siempre 200.
- hay un fichero .json con request postma para hacer
- hay tests unitarios para entender un poco mas como funciona. Obviamente los tests son pocos y no cubren todo, mas bien cubren poco, pero es para dar una idea. 

### sin BBDD
- no he usado una BBDD como Mongo, pero he creado capas y niveles para que, si se implementa, la logica de negocio no se vea afectada.
- La BBDD mockeada está en los fichero *Repository.js. En una api real oviamente el Repository no tiene propriedades de clase.

### notas
- es buena practiva no devolver nada despúes del bloque try catch, si no devolver siempre tanto en el try como en el catch. Eso porqué te aseguras que en el catch siempre devuelves lo que quieres devolver en ese caso 
- en las empresas normalmente hay 2 tipos de desarrollos de api: 
    - las que devuelven tipos de errores diferente según lo que pasa 
    - y las que siempre devuelven 200 con con los erroes dentro del body response.
no hay una implementación que sea la mejor, pero yo personalmente prefiero la segunda opción con excepciones.

