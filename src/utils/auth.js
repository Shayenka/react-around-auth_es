import Api from "./api"; 

// const api = new Api();

const BASE_URL = 'https://register.nomoreparties.co';

export const registerUser = async (email, password) => {
  const api = new Api();
  try {
    const response = await api.registerUser(email, password);
    console.log(response);
  } catch (error) {
    console.error('Error en el registo de usuario:', error);
  }
};

export const authorize = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/signin)`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem('jwt', data.jwt);
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const checkTokenValidity = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Token inválido');
  }
};