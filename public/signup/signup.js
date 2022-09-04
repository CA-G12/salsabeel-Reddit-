const signupBtn = document.getElementById('sign-up-btn');
const email = document.getElementById('email');
const password = document.getElementById('password');
const username = document.getElementById('username');
const confirmpassword = document.getElementById('confirmpassword');
const selectType = document.getElementById('type');

signupBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const data = {
    email: email.value,
    username: username.value,
    password: password.value,
    confirmpassword: confirmpassword.value,
    type: selectType.value,
  };
  return fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
});
