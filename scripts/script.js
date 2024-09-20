document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  fetch('http://localhost:3333/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username, password: password })
  })
  .then(response => {
    // Verifica se a resposta tem o status correto e se é JSON
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Response is not JSON");
    }
    return response.json();
  })
  .then(data => {
    if (data.token) {
      alert('Login successful!');
      localStorage.setItem('token', data.token);
      window.location.href = "welcome.html";
    } else {
      document.getElementById("error-message").textContent = data.message;
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById("error-message").textContent = "An error occurred. Please try again.";
  });
});
