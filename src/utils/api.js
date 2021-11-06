import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token')); // get token item from localstorage

const instance = axios.create({
	baseURL: 'http://localhost:4000/api/', // Backend Url
	headers: {
		'Authorization': `Bearer ${token}`
	}
});

// Handle token errors and expiration
instance.interceptors.response.use((response) => {
	return response;
}, (error) => {

	if(error.response.status === 500 && error.response.data.error.message === 'Token has expired and can no longer be refreshed') {
		console.log(error.response);
		localStorage.removeItem('token');

		return new Promise((resolve, reject) => {
            // The history can't be pushed to the page, only the link is updated
            // history.push('/login');
			// console.log('Redirect to login component')

            reject(error);
			return window.location.href = '/login';
			
		})
	}

	console.log(error.response);

	// refresh token if error 401 and message token has expired
	if(error.response.status === 401 && error.response.data.error.message === 'Token has expired') {
		console.log('the token must be refreshed');
		return instance.post('auth/refresh', null)
			.then((res) => {
				const config = error.config;			
				localStorage.removeItem('token');
				localStorage.setItem('token', JSON.stringify(res.data.token));
				config.headers['Authorization'] = `Bearer ${res.data.token}`; 

				return new Promise((resolve, reject) => {
					axios.request(config).then(response => {
						resolve(response);
					}).catch((error) => {
						reject(error);
					})
				})
			})
			.catch((error) => {
				Promise.reject(error);
			})
	}

	return Promise.reject(error);
})

export default instance;