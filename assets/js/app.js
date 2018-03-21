function initMap() {

	var laboratoriaLima = {lat: -12.1191427, lng: -77.0349046};

	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 18,
		center: laboratoriaLima
	});

	var markadorLaboratoria = new google.maps.Marker({
		position: laboratoriaLima,
		map: map
	});

	function buscar(){
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}

	var latitud,longitud;
	var funcionExito = function(posicion) {

		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			map: map
		});

		map.setZoom(18);
		map.setCenter({lat:latitud, lng:longitud});

	}

	var funcionError = function (error) {
		alert("Tenemos un problema con encontrar tu ubicación");
	}

	document.getElementById("encuentrame").addEventListener("click",buscar);


	var inputPartida = document.getElementById("punto-partida");
	var inputDestino = document.getElementById("punto-destino");

	new google.maps.places.Autocomplete(inputPartida);
	new google.maps.places.Autocomplete(inputDestino);






	var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
		directionsService.route({
			origin: inputPartida.value,
			destination: inputDestino.value,
			travelMode: 'DRIVING'
		}, function(response, status) {
			if (status === 'OK') {
				var distancia =  response.routes[0].legs[0].distance.text;
				console.log(distancia);
				tarifa.classList.remove("none");
				if(distancia*1.75>4){
					tarifa.innerHTML= "S/. " + parseInt(distancia*1.75);
				}
				tarifa.innerHTML= "S/. 4";
				directionsDisplay.setDirections(response);
			} else {
				window.alert("No encontramos una ruta.");
			}
		});
	}


	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;



	directionsDisplay.setMap(map);

	var trazarRuta = function() {
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	};

	document.getElementById("trazar-ruta").addEventListener("click",trazarRuta);


} 	


/*		mapTypeControl:false,
		zoomControl: false,
		streetViewControl:false*/
