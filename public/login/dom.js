const loginBtn = document.getElementById('loginbtn');
const email = document.getElementById('email');
const password = document.getElementById('password');

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const data = {
    email,
    password,
  };
  return fetch('/login', {
    method: 'POST',
    header: 'application/json',
    body: JSON.stringify(data),
  }).then((data) => data.json()).catch((data) => console.log(data));
});
