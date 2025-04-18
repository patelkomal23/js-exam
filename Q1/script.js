 
function showLogin() {
  document.getElementById("signup").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

function showSignup() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("signup").classList.remove("hidden");
}

function showResultBoard() {
  document.getElementById("signup").classList.add("hidden");
  document.getElementById("login").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
}

function signup() {
  let username = document.getElementById("signupstudentname").value;
  let password = document.getElementById("signupPassword").value;

  if (username && password) {
    let user = {
      username: username,
      password: password
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful! Please login.");
    showLogin();
  } else {
    alert("Please fill all fields.");
  }
}

function login() {
  let username = document.getElementById("loginUsername").value;
  let password = document.getElementById("loginPassword").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.username === username && user.password === password) {
    alert("Login successful!");
    showResultBoard();
    loadResults();
  } else {
    alert("Invalid credentials.");
  }
}

function logout() {
  location.reload(); 
}

function loadResults() {
  let loader = document.querySelector('.loader');
  let tbody = document.querySelector('tbody');

  loader.style.display = "block"; 

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(function(response) {
      return response.json();
    })
    .then(function(students) {
      students.forEach(function(student) {
        let score = Math.floor(Math.random() * 100) + 1;
        let row = `
          <tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${score}</td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    })
    .catch(function(error) {
console.log(error);
    })
  
}