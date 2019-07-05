//Lado cliente que emite streaming:

$(function(){  //cuando document (el html) estè listo... (acà usamos jquery)

	var canvas = document.getElementById('preview');
	var context = canvas.getContext("2d");  //canvas es donde se va a "dibujar". canvas necesita un "contexto" para dibujar el lienzo el cual establecemos aca. Con 2d le decimos que sea de 2 dimensiones.
	
	//Abajo le damos un largo y un ancho al canvas y a su context (con width y height. Y al context le ponemos del MISMO tamaño que el canvas)
	canvas.width = 800;
	canvas.height = 600;

	context.width = canvas.width;
	context.height = canvas.height; 

	//Despues creamos el video.
	var video = document.getElementById("video");

	//Instanciamos el socket con io.
	var socket = io();

	//Con la funciòn logger imprimimos nuestros msjes en el html.
	function logger(msg){
		$("#logger").text(msg);
	}

	//Con la funcion loadCam hacemos cosas cuando la camara està activa.  
	function loadCam(stream){
				 video.srcObject = stream;  //al src de video le ponemos el stream (el video es que esta en el html con la etiqueta video)
				 logger('Camara OK');							
	}

	//Con la funcion loadFail mandamos un msje cuando la càmara està desactivada o està fallando. 
	function loadFail(stream){
		logger('Camara no conectada, revisar la camara!');				
	}

	//La funcion viewVideo se encarga de mostrar el video en el canvas y apartir del canvas poder convertirlo a imagen. Va a recibir el video y el context. Enrealidad este "video" es una imagen, ya que el elemento video del html lo podemos guardar como imagen si hacemos click derecho "guardar imagen". 
	//Por esto en drawImage(video) enrealidad le estamos mandando imagenes que lo imprimirà dentro del canvas. El 1er 0 es el inicio y el 2do cero es el hasta. Y hay que ponerle el ancho y el alto (width, height).
	function viewVideo(){
		context.drawImage(video,0,0,context.width,context.height); //aca dibujamos con el canvas en emitir.html
		//Ahora lo pasamos al servidor con socket:
		socket.emit('stream', canvas.toDataURL('image/webp'));  //Emitimos al evento stream (nos mandara al socket.on('stream,...') de app.js, del servidor). Vamos a enviar el canvas PERO convertido en una IMAGEN (ya que si clickeamos en el canvas vemos que podemos hacer "guardar como imagen..."), pero en formato de ruta para que se pueda abrir como una cadena, con el formato "image/webp". Es un formato de menor calidad de jpeg. 
		//Y el servidor redireccionarà esto a los demas clientes y se incrustarà en el src de la img de "visualizar.html", el cual mostrarà dicha secuencia de imagenes.
	}

	//Despuès de definir todas las funciones de arriba, ahora vamos a USARLAS:

	//1ro vamos a activar la camara y el microfono (mediante los getUserMedia) y en base a esto ejecutamos loadCam (en caso exitoso) o loadFail (en caso NO exitoso).
	// La propiedad getUserMedia està POR DEFECTO, asì si existe va a tener como parametro el mismo getUserMedia y si NO existe (los "||") entonces tenemos capturar este Media directamente de los navegadores (google chrome: webkitGetUserMedia, sino existe de mozilla: mozGetUserMedia ; o sino existe tampoco lo agarramos de explorer: msgGetUserMedia). Esto es para que nos funcione en cualquier navegador.

	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);

	if(navigator.getUserMedia){//Entonces abajo ponemos si (if) el UserMedia existe (ya que lo agarrò de alguno de los de arriba) entonces usamos el metodo getUserMedia con 3 parametros: en el 1ro le decimos que nos capture video y audio (con video: true, audio:true), el 2do parametro es la funciòn en caso que sea exitosa la carga del video (llamamos a loadCam() y el 3ro en caso que no sea exitosa (llamamos a loadFail() ) 

		navigator.getUserMedia({video:true, audio:false},loadCam,loadFail); //ejecutamos las funciones loadCam o loadFail de arriba.
	}

	//Ahora lo importante, vamos a enviar el video en los clientes "visualizar.html". 
	//Cada 70 ms se va a ejecutar la funcion "function()"" de abajo:
	setInterval(function(){
		viewVideo(video,context); //Acà ejecutamos la funcion viewVideo de arriba. Enviamos el video (enrealidad es una imagen del video en un instante) y el context que es el canvas donde se dibujara. Y cada 70 ms se enviarà otra imagen del video y se mandarà nuevamente al servidor. SI ponemos 500 ms vemos que la imagen del video en canvas tendrà mayor retraso. 
	},70);

});