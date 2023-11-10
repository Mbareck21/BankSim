const loginbtn = document.getElementById('loginbtn');
const privatePage = document.querySelector('#private');
let errMessage = document.querySelector('#errMessage');
let welcomeMsg = document.querySelector('#welcome');
let createAccount = document.querySelector('#createAccount');
let message = '';
let auth = JSON.parse(sessionStorage.getItem('auth'));

if (auth && auth.authorized != null) {
  
  createAccount.remove();
  welcomeMsg.innerHTML = `Welcome <span class="font-extrabold text-orange-500">${auth.firstName}</span>! You can now login into your personal account.`;
} else { 
   createAccount.style.display = '';
}
loginbtn.addEventListener('click', function () {
  if (!auth) {
    message = 'Please sign up before trying to log in.';
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

  const newEmail = document.querySelector('#email').value;
  const newPassword = document.querySelector('#password').value;

  if (!newEmail || newEmail !== auth.email) {
    message = 'Please enter the same email you registered with.';
    errMessage.innerHTML = `<strong class="font-bold">Error!</strong>
  <span class="block sm:inline w-fit">${message}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg id='svg' class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>`;
    errMessage.classList.add(
      'bg-red-100',
      'border',
      'mx-auto',
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
  } else if (!newPassword || newPassword !== auth.password) {
    message = 'Please enter the same password you registered with.';
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
  } else {
    auth.authorized = true;
    sessionStorage.setItem('auth', JSON.stringify(auth));
    window.location.href = './securedPage.html';
  }
});
