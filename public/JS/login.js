const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const showPasswordIcon = document.querySelector('i.fa-eye');

function showPassword() {
  if (loginPassword.type === 'password') {
    loginPassword.type = 'text';
    showPasswordIcon.style.color = '#10CA65';
  } else {
    loginPassword.type = 'password';
    showPasswordIcon.style.color = '#3F3C41';
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
  if (loginEmail.value === '' && loginEmail.value.includes('@')) {
    flag = flag && showError(
      loginEmail,
      'Email not Correct ',
    );
  } else {
    flag = flag && showSuccess(loginEmail);
  }
  if (loginPassword.value === '' || loginPassword.value.length < 6) {
    flag = flag && showError(
      loginPassword,
      'Password must be more than 6 characters',
    );
  }
  return flag;
}
showPasswordIcon.addEventListener('click', showPassword);
loginForm.addEventListener('submit', (event) => {
  if (submitValidation(event)) {
    const data = {
      email: loginEmail.value,
      password: loginPassword.value,
    };
    fetch('/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json())
      .then((data) => {
        if (data.error.includes('password')) {
          showError(
            loginPassword,
            'Password Not correct ',
          );
        }
      })
      .catch((err) => console.log(err));
  }
});
