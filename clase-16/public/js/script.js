
		document.addEventListener("DOMContentLoaded", function() {	
		let formulario = document.querySelector("#formValidacion")		
		formulario.addEventListener('submit', validarFormulario); 
		formulario.reset()
		});
		
	 
		function validarFormulario(evento) {
		evento.preventDefault();
		let title = document.getElementById('title').value;
		let price = document.getElementById('price').value;
		let thumbnail = document.getElementById('thumbnail').value;
	
		   if(title.length === 0 || price.length === 0  || thumbnail.length === 0) {
		   document.querySelector("#completarCampos").style.display = "block"
		   completarCampos.innerHTML = "Tenés q completar los campos"
		   return;
	   }
	
		return addItem(this)
	}
		
	 
	 