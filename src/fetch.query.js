const url = 'https://portadainmobiliaria.cloud/api/v1.1/pqrs/'
const API_TOKEN = import.meta.env.VITE_API_TOKEN

export function fetchPost(datosEnviar) {
	const options = {
		method: 'POST',
		headers: {
			Authorization: API_TOKEN
		},
		body: JSON.stringify(datosEnviar)
	};

	return fetch(url, options)
		.then(respuesta => respuesta.json())
		.then(datosRespuesta => {
			return datosRespuesta;
		})
		.catch(error => {
			console.error('Error al enviar la solicitud:', error);
		});
}
export function cargarDatosPqr(id) {

	const options = {
		method: 'GET',
		headers: {
			Authorization: API_TOKEN
		},

	};

	return fetch(`${url}?id=${id}`, options)
		.then(respuesta => respuesta.json())
		.then(datosRespuesta => {
			return datosRespuesta.data;
		})
		.catch(error => {
			console.error('Error al enviar la solicitud:', error);
		});
}

export function actualizarPqr(datosEnviar) {

	const options = {
		method: 'PUT',
		headers: {
			Authorization: API_TOKEN
		},
		body: JSON.stringify(datosEnviar)
	};

	fetch(url, options)
		.then((respuesta) => respuesta.json())
		.then((data) => {
			console.log(data);

		})
		.catch((error) => {
			// Manejo de errores en caso de que la solicitud falle
			console.error("Error al enviar la solicitud de actualización:", error);
		});
}

export async function loadInitialData(pagina = 1) {
	const initialLoadAmount = 10;
	const options = {
		method: 'GET',
		headers: {
			Authorization: API_TOKEN
		},
	};
	try {
		const response = await fetch(`${url}?limit=${initialLoadAmount}&page=${pagina}`, options)
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`)
		}
		const responsejs = await response.json()
		console.log("🚀 ~ file: fetch.query.js:85 ~ loadInitialData ~ responsejs:", responsejs)
		return responsejs
	} catch (error) {
		console.error('Error al cargar los datos iniciales:', error);

		throw new Error('Hubo un problema al cargar los datos iniciales');
	}

}

export function filterData(pagina) {
	const itemsPerPage = 10;
	const options = {
		method: 'GET',
		headers: {
			Authorization: API_TOKEN
		},
	};

	return fetch(`${url}?limit=${itemsPerPage}&page=${pagina}`, options)
		.then(response => response.json())
		.then(data => {
			return data
		})

		.catch(error => {
			console.error('Error en la solicitud:', error);
			console.log('Respuesta completa:', error.response);
		});

}

export default cargarDatosPqr