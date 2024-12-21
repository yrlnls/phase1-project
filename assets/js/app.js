 // Sample data for users
const users = [
  { username: "applicant1", password: "password1", type: "applicant" },
  { username: "admin", password: "admin123", type: "admin" }
];

// Handle login for applicants and admins
function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    alert('Login successful');
    window.location.href = user.type === 'applicant' ? 'loan_application.html' : 'dashboard.html';
  } else {
    alert('Invalid credentials');
  }
}

// Handle registration for applicants
function register(event) {
  event.preventDefault();
  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;

  // Store the new user
  users.push({ username, password, type: 'applicant' });
  alert('Registration successful');
  window.location.href = 'login.html';
}

// Handle admin login
function adminLogin(event) {
 event.preventDefault();
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;

  const admin = users.find(u => u.username === username && u.password === password && u.type === 'admin');

  if (admin) {
    localStorage.setItem('user', JSON.stringify(admin));
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid admin credentials');
  }
}

// Populate loan applications on the admin dashboard
function populateLoanApplications() {
  const applications = [
    { applicant: "tillen", loanAmount: 10000, status: "Pending" },
    { applicant: "mark", loanAmount: 5000, status: "Approved" }
  ];

  const loanTable = document.getElementById('loanApplications');
  loanTable.innerHTML = applications.map(app => `
    <tr>
      <td>app.applicant</td>
      <td>{app.loanAmount}</td>
      <td>${app.status}</td>
      <td><button>Approve</button> <button>Reject</button></td>
    </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname === '/dashboard.html') {
    populateLoanApplications();
  }
});