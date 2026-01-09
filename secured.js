let auth = JSON.parse(sessionStorage.getItem('auth'));
const notAllowed = () => {
	if (!auth || auth.authorized === false) {
		window.location.href = './unauthorizedPage.html';
	}
};
notAllowed();

let data = auth;
let message = '';
let balance = data.deposit || 0;
document.querySelector('#private').innerHTML = balance;
let welcomeMessage = document.querySelector('#welcomeMessage');
const user = `<span class='text-orange-500 uppercase italic'>${
  data.firstName || 'User'
}</span>`;
welcomeMessage.innerHTML = `Welcome ${user}! This is your personal account. You can add or withdraw funds.`;

const errMessage = document.querySelector('#errMessage');

// Load transactions
if (data.transactions) {
  data.transactions.forEach(t => {
    updateTable(t.type, t.amount, t.date);
  });
} else {
  data.transactions = [];
}

// Deposit logic
const addButton = document.querySelector('#add');
addButton.addEventListener('click', () => {
  let addInput = document.getElementById('inputAdd');
  if (addInput.value <= 0) {
    showError(errMessage, 'Amount value is not valid');
    addInput.value = '';
    return;
  }
  let fundsValue = Number(addInput.value);
  balance = fundsValue + data.deposit;
  data.deposit = balance;
  addInput.value = '';
  
  const date = getTransactionDate();
  const amountStr = `+ ${fundsValue}`;
  
  // Store transaction
  data.transactions.push({ type: 'Deposit', amount: amountStr, date: date });
  
  sessionStorage.setItem('auth', JSON.stringify(data));
  updateTable('Deposit', amountStr, date);
  document.querySelector('#private').innerHTML = balance;
});

// Withdrawal logic
const withdrawButton = document.querySelector('#Withdraw');
withdrawButton.addEventListener('click', () => {
  let withdrawInput = document.getElementById('inputWithdraw');
  let withdrawValue = Number(withdrawInput.value);
  
  if (withdrawInput.value <= 0) {
    showError(errMessage, 'Amount value is not valid');
    withdrawInput.value = '';
    return;
  }
  
  if (withdrawValue > balance) {
    showError(errMessage, 'You do not have sufficient balance in your account!');
    return;
  } 
  
  balance = data.deposit - withdrawValue;
  data.deposit = balance;
  
  const date = getTransactionDate();
  const amountStr = `- ${withdrawValue}`;
  
  // Store transaction
  data.transactions.push({ type: 'Withdrawal', amount: amountStr, date: date });
  
  sessionStorage.setItem('auth', JSON.stringify(data));
  updateTable('Withdrawal', amountStr, date);
  
  document.querySelector('#private').innerHTML = balance;
  withdrawInput.value = '';
});

document.getElementById('signOut').addEventListener('click', function () {
  auth.authorized = false;
  sessionStorage.setItem('auth', JSON.stringify(auth));
  window.location.href = './bankSimulator.html';
});

// Date helper
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

// Table builder
function updateTable(transactionType, amount, date) {
  let table = document.getElementById('table');
  let newRow = `<tr class="bg-gray-800"><td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${transactionType}</td class="px-6 py-4"><td>${amount}</td><td class="px-6 py-4">${date}</td></tr>`;
  table.innerHTML += newRow;
}