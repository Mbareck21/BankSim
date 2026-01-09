let auth = JSON.parse(sessionStorage.getItem('auth'));
const signUpButton = document.querySelector('#signUp');
const loginButton = document.querySelector('#login');

loginButton.addEventListener('click', () => {
  window.location.href = './bankSimulator.html';
});

let data = {};
signUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  const firstName = document.querySelector('#fname').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const deposit = document.querySelector('#deposit').value;
  const errMessage = document.querySelector('#errMessage');
  
  if (!firstName || !email || !password) {
    showError(errMessage, 'Name, email and password are required to sign up.');
    return;
  }
  if (firstName.length < 3) {
    showError(errMessage, 'First name is required and must be longer 2 characters.');
    return;
  }
  if (!email.includes('@')) {
    showError(errMessage, 'A valid email is required.');
    return;
  }

  if (password.length < 5) {
    showError(errMessage, 'Password is required and must be 5 characters or more.');
    return;
  }

  // Save Data
  data.firstName = firstName;
  data.email = email;
  data.password = password;
  data.deposit = Number(deposit);
  data.authorized = false;
  // Initialize transaction history
  data.transactions = [];

  sessionStorage.setItem('auth', JSON.stringify(data));
  
  // Redirect to login page
  window.location.href = './bankSimulator.html';
});