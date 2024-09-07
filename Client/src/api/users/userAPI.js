/** @format */
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001/users/',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // Send cookies with requests
});

const fetchAllUsers = async () => {
	try {
		console.log('Fetching..');
		const response = await axiosInstance.get('/');
		return response.data;
	} catch (error) {
		console.error(' USER API ERROR: Error fetching users:', error.message);
		return null;
	}
};
const fetchUserData = async (token) => {
	if (token) {
		try {
			console.log('Trying to fetch...');
			const response = await axiosInstance.get('/me', {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response.data;
		} catch (error) {
			console.error(
				' USER API ERROR: Error fetching user data:',
				error.message
			);
			return null;
		}
	} else {
		return 'Token not found';
	}
};
const authenticateUser = async (user) => {
	try {
		const response = await axiosInstance.post('/authenticateUser', user);
		const { token } = response.data;
		return token;
	} catch (error) {
		console.error(' USER API ERROR: Error logging in:', error.message);
		if (error.response && error.response.status === 401) {
			console.error(' USER API ERROR: Invalid credentials');
		}
		return null;
	}
};

export { fetchAllUsers, fetchUserData, authenticateUser };