const submitBtn = document.getElementById('submitBtn');
const loginEmail = document.getElementById('signupEmail');
const userName = document.getElementById('userName');
const loginPassword = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('confirmPassword');
const showPasswordIcon = document.querySelector('i.fa-eye');
const type = document.getElementById('type');
console.log(submitBtn);
function showPassword() {
  if (loginPassword.type === 'password') {
    loginPassword.type = 'text';
    showPasswordIcon.style.color = 'red';
  } else {
    loginPassword.type = 'password';
    showPasswordIcon.style.color = '#ddd';
  }
}

function showError(input, message) {
  const formField = input.parentElement;
  formField.className = 'form-field error';

  if ((formField.className === 'form-field error')) {
    const alertMessage = formField.querySelector('.alert-message');
    alertMessage.style.visibility = 'visible';
    alertMessage.style.color = 'red';
    alertMessage.innerText = message;
  }
  return false;
}

function showSuccess(input) {
  const formField = input.parentElement;
  formField.className = 'form-field success';

  if ((formField.className === 'form-field success')) {
    const alertMessage = formField.querySelector('.alert-message');
    alertMessage.style.visibility = 'hidden';
  }
  return true;
}

function submitValidation(event) {
  event.preventDefault();
  let flag = true;
  if (loginEmail.value === '' && loginPassword.value === '' && confirmPassword.value === '' && userName.value === '') {
    flag = flag && showSuccess(userName);
  } else {
    flag = flag && showError(
      type,
      'values  cannot Correct ',
    );
  } if (!(loginEmail.value.includes('@'))) {
    flag = flag && showError(
      confirmPassword,
      'values  cannot Correct ',
    );
  } else {
    flag = flag && showSuccess(loginEmail);
  }
  if (loginPassword.value.length < 8 && loginPassword.value === confirmPassword.value) {
    flag = flag && showError(
      loginPassword,
      'Password must be more than 8characters',
    );
  } else {
    flag = flag && showSuccess(loginPassword);
  }
  return flag;
}

showPasswordIcon.addEventListener('click', showPassword);
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
//   const subeel = submitValidation(event);
// console.log(subeel)
//   if (subeel) {
    const data = {
      email: loginEmail.value,
      username: userName.value,
      password: loginPassword.value,
      confirmpassword: confirmPassword.value,
      type: type.value,
    };
    console.log(data);
    return fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  // }
});