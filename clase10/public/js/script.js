
	document.addEventListener("DOMContentLoaded", function() {
		document.querySelector("#formValidacion").addEventListener('submit', validarFormulario); 
		});
		
	 
		function validarFormulario(evento) {
		evento.preventDefault();
		let producto = document.getElementById('productos').value;
		let price = document.getElementById('price').value;
		let thumbnail = document.getElementById('thumbnail').value;
	
		   if(producto.length == 0 || price.length == 0  || thumbnail.length == 0) {
		   document.querySelector("#completarCampos").style.display = "block"
		   completarCampos.innerHTML = "Tenés q completar los campos"
		   return;
	   }
	      if(price.value == NaN){
			document.querySelector("#completarCampos").style.display = "block"
		   completarCampos.innerHTML = "El precio es numérico"

		  }
		
	   this.submit();
	 }