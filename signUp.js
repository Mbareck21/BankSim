let auth = JSON.parse(sessionStorage.getItem('auth'));
const notAllowed = () => {
  if (auth && auth.authorized === false) {
    window.location.href = './bankSimulator.html';
  }
};
notAllowed()
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
  let message = '';
  if (!firstName || !email || !password) {
    message = 'Name, email and password are required to sign up.';
    errMessage.innerHTML = `<strong class="font-bold">Error!</strong>
  <span class="block sm:inline">${message}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg id='svg' class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>`;
    errMessage.classList.add(
      'bg-red-100',
      'border',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'rounded',
      'relative'
    );
    document.querySelector('#svg').addEventListener('click', () => {
      errMessage.innerHTML = '';
      errMessage.classList = '';
    });
    return;
  }
  if (firstName.length < 3) {
    message = 'First name is required and must be longer 2 characters.';
    errMessage.innerHTML = `<strong class="font-bold">Error!</strong>
  <span class="block sm:inline">${message}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg id='svg' class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>`;
    errMessage.classList.add(
      'bg-red-100',
      'border',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'rounded',
      'relative'
    );
    document.querySelector('#svg').addEventListener('click', () => {
      errMessage.innerHTML = '';
      errMessage.classList = '';
    });
    return;
  }
  if (!email.includes('@')) {
    message = 'A valid email is required.';
    errMessage.innerHTML = `<strong class="font-bold">Error!</strong>
  <span class="block sm:inline">${message}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg id='svg' class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>`;
    errMessage.classList.add(
      'bg-red-100',
      'border',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'rounded',
      'relative'
    );
    document.querySelector('#svg').addEventListener('click', () => {
      errMessage.innerHTML = '';
      errMessage.classList = '';
    });
    return;
  }

  if (password.length < 5) {
    message = 'Password is required and must be 5 characters or more.';
    errMessage.innerHTML = `<strong class="font-bold">Error!</strong>
  <span class="block sm:inline">${message}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg id='svg' class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>`;
    errMessage.classList.add(
      'bg-red-100',
      'border',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'rounded',
      'relative'
    );
    document.querySelector('#svg').addEventListener('click', () => {
      errMessage.innerHTML = '';
      errMessage.classList = '';
    });
    return;
  }

  function saveData() {
    data.firstName = firstName;
    data.email = email;
    data.password = password;
    data.deposit = Number(deposit);
    data.authorized = false;

    sessionStorage.setItem('auth', JSON.stringify(data));
  }
  saveData();
  window.location.href = './bankSimulator.html';
});
