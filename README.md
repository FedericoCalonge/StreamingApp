# TPFinal-APPenInternet
Trabajo Práctico Final para la materia Aplicaciones en Internet, de la Universidad Nacional de Avellaneda.

## Requirements

https://nodejs.org/es/download/package-manager/
### Javascript, node y dependencies
Para la instalación de NODE visitar la siguiente página: _https://nodejs.org/es/download/package-manager/_

Todas las dependencias que utilizaremos se encuentran en _dependencies_ dentro del archivo _package.json_. Para instalarlas directamente con **npm** debemos ubicarnos en la carpeta del proyecto y ejecutar el comando:
```
$ npm install
```

### Docker y Redis
La aplicación utiliza Redis para el guardado de los usuarios. Durante esta instalación usaremos un Redis Dockerizado.
Para descargar e instalar Docker primero debemos asegurarnos de tener actualizada la lista de paquetes del repositorio utilizado en nuestro sistema:
```
$ sudo apt-get update
```

Después instalamos docker:
```
$ sudo apt install docker.io
```
```
$ sudo docker version :nos devolverá la versión instalada tanto del servidor como la del cliente del motor Docker.
```
```
sudo docker info :nos mostrará un detalle con la configuración actual del motor Docker instalado en el sistema.

```
Despues para descargar redis (BD):
```
$ sudo docker image pull redis 
```

## Uso

### Puesta en marcha de la base de datos
Debe ser un Redis local, que se encuentro escuchando por el puerto 6379 (el puerto por defecto de Redis). Si se está utilizando Docker, para hacer eso hay que crear un contenedor de Redis:
```
$ sudo docker container run -d -p 6379:6379 redis :esto nos levanta la BD en el puerto 6379 y un contenedor el cual escuchará en ese puerto.
```
Para detener la base:
```
$ sudo docker container stop redis-TPFinal
```
Para reiniciarla:
```
$ sudo docker container start redis-TPFinal
```
El parado y reinicio **no** eliminará información de la base de datos.

### Puesta en marcha del servidor
El servidor solamente se debe inicializar una vez que se encuentra corriendo la base de datos.

Para iniciarlo, en la carpeta raíz del programa correr:
```
$ node server.js
```
En servidor comenzará a escuchar en el puerto 8080. Luego se deberá ingresar a la siguiente URL en el navegador para registrarse y posteriormente loguearse: http://localhost:8080/
