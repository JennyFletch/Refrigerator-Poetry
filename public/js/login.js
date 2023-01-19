const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in');
      }
    }
};
  

const logout = async () => {
  console.log("click!");
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};


var loginForm = document.querySelector('.login-form');
if(loginForm) {
  loginForm.addEventListener('submit', loginFormHandler);
}

var navLogoutBtn = document.querySelector('#nav-logout');
if(navLogoutBtn) {
  navLogoutBtn.addEventListener('click', logout);
}

var logoutBtn = document.querySelector('#logout');
if(logoutBtn) {
logoutBtn.addEventListener('click', logout);
}