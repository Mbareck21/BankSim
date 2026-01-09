const loginbtn = document.getElementById('loginbtn');
const errMessage = document.querySelector('#errMessage');
const welcomeMsg = document.querySelector('#welcome');
const createAccount = document.querySelector('#createAccount');
let auth = JSON.parse(sessionStorage.getItem('auth'));

if (auth && auth.firstName) {
  createAccount.remove();
  welcomeMsg.innerHTML = `Welcome <span class="font-extrabold text-orange-500">${auth.firstName}</span>! You can now login into your personal account.`;
} else {
   createAccount.style.display = '';
}

loginbtn.addEventListener('click', function () {
  // Refresh auth in case of new sign up in another tab (though session storage is per tab usually, good practice if using local storage, but here it is session)
  auth = JSON.parse(sessionStorage.getItem('auth'));

  if (!auth) {
    showError(errMessage, 'Please sign up before trying to log in.');
    return;
  }

  const newEmail = document.querySelector('#email').value;
  const newPassword = document.querySelector('#password').value;

  if (!newEmail || newEmail !== auth.email) {
    showError(errMessage, 'Please enter the same email you registered with.');
  } else if (!newPassword || newPassword !== auth.password) {
    showError(errMessage, 'Please enter the same password you registered with.');
  } else {
    auth.authorized = true;
    sessionStorage.setItem('auth', JSON.stringify(auth));
    window.location.href = './securedPage.html';
  }
});