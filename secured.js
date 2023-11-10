let auth = JSON.parse(sessionStorage.getItem('auth'));
const notAllowed = () => {
	if (!auth || auth.authorized === false) {
		window.location.href = './unauthorizedPage.html';
	}
};

let data = auth;
let message = '';

let balance = data.deposit || 0;
document.querySelector('#private').innerHTML = balance;
let welcomeMessage = document.querySelector('#welcomeMessage');
const user = `<span class='text-orange-500 uppercase italic'>${
  data.firstName || null
}</span>`;
welcomeMessage.innerHTML = `Welcome ${user}! This is your personal account. You can add or withdraw funds.`;
//deposit logic
const addButton = document.querySelector('#add');
addButton.addEventListener('click', () => {
  let addInput = document.getElementById('inputAdd');
  if (addInput.value <= 0) {
    message = 'Amount value is not valid';
    addInput.value = ''
    errMessage.innerHTML = `<strong class="font-bold">Error!</strong>
  <span class="block sm:inline">${message}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg id= "svg" class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>`;
    errMessage.classList.add(
      'bg-red-100',
      'border',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'lg:w-[50%]',
      'mx-auto',
      'rounded',
      'relative',
      'my-2'
    );
    document.querySelector('#svg').addEventListener('click', () => {
      errMessage.innerHTML = '';
      errMessage.classList = '';
    });
    return
  }
  let fundsValue = Number(addInput.value);
  balance = fundsValue + data.deposit;
  data.deposit = balance;
  addInput.value = '';
 auth = data;
 sessionStorage.setItem('auth', JSON.stringify(auth));
  fundsValue != 0 &&
    updateTable('Deposit', `+ ${fundsValue}`, getTransactionDate());
  document.querySelector('#private').innerHTML = balance;
});
//withdrawal logic
const withdrawButton = document.querySelector('#Withdraw');
const errMessage = document.querySelector('#errMessage');
 message = '';
withdrawButton.addEventListener('click', () => {
  let withdrawInput = document.getElementById('inputWithdraw');
  let withdrawValue = Number(withdrawInput.value);
  if (withdrawValue > balance) {
    message = 'You do not have sufficient balance in your account!';
    errMessage.innerHTML = `<strong class="font-bold">Error!</strong>
  <span class="block sm:inline">${message}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg id= "svg" class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>`;
    errMessage.classList.add(
      'bg-red-100',
      'border',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'lg:w-[50%]',
      'mx-auto',
      'rounded',
      'relative'
    );
    document.querySelector('#svg').addEventListener('click', () => {
      errMessage.innerHTML = '';
      errMessage.classList = '';
    });
    return
  } else if (withdrawInput.value <= 0) {
    message = 'Amount value is not valid';
  withdrawInput.value = '';

    errMessage.innerHTML = `<strong class="font-bold">Error!</strong>
  <span class="block sm:inline">${message}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg id= "svg" class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>`;
    errMessage.classList.add(
      'bg-red-100',
      'border',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'lg:w-[50%]',
      'mx-auto',
      'rounded',
      'relative',
      'my-2'
    );
    document.querySelector('#svg').addEventListener('click', () => {
      errMessage.innerHTML = '';
      errMessage.classList = '';
    });
    return
  
  } else {
    balance = data.deposit - withdrawValue;
    data.deposit = balance;
    auth = data
     sessionStorage.setItem('auth', JSON.stringify(auth));
    withdrawValue != 0 &&
      updateTable('Withdrawal', `- ${withdrawValue}`, getTransactionDate());
  }
  document.querySelector('#private').innerHTML = balance;
  withdrawInput.value = '';
});

document.getElementById('signOut').addEventListener('click', function () {
  auth.authorized = false;
  sessionStorage.setItem('auth', JSON.stringify(auth));
    window.location.href = './bankSimulator.html';
});

//Date helper
function getTransactionDate() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let period = 'A.M';
  if (hour > 12) {
    hour = hour - 12;
    period = 'P.M';
  } else if (hour == 0) {
    hour = 12;
  }

  if (minute < 10) {
    minute = '0' + minute;
  }
  return (
    month + '/' + day + '/' + year + '  ' + hour + ':' + minute + ' ' + period
  );
}

// table builder
function updateTable(transactionType, amount, date) {
  let table = document.getElementById('table');
  let newRow = `<tr class="bg-gray-800"><td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${transactionType}</td class="px-6 py-4"><td>${amount}</td><td class="px-6 py-4">${date}</td></tr>`;
  table.innerHTML += newRow;
}
