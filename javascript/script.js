
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
  let studentname = document.getElementById("signupstudentname").value;
  let password = document.getElementById("signupPassword").value;

  if (studentname && password) {
    let student = {
      studentname: studentname,
      password: password
    };
    localStorage.setItem("student", JSON.stringify(student));
    alert("Signup successful! Please login.");
    showLogin();
  } else {
    alert("Please fill all fields.");
  }
}

function login() {
  let studentname = document.getElementById("loginstudentname").value;
  let password = document.getElementById("loginPassword").value;

  let student = JSON.parse(localStorage.getItem("student"));

  if (student && student.studentname === studentname && student.password === password) {
    alert("Login successful!");
    showResultBoard();
    loadResults();
  } else {
    alert("Invalid data.");
  }
}

function logout() {
  location.reload();
}

function loadResults() {
  let Loading = document.querySelector('.Loading');
  let tbody = document.querySelector('tbody');

  Loading.style.display = "block";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
      return response.json();
    })
    .then(function (students) {
      students.forEach(function (student) {
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
    .catch(function (error) {
      console.log(error);
    })

}