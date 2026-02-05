const API_URL = "http://localhost:3000/users";

const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const usersList = document.getElementById("users");

let editId = null;

// GET USERS DATA
function fetchUsers() {
  fetch(API_URL)
    .then(res => res.json())
    .then(users => {
      usersList.innerHTML = "";

      users.forEach(user => {
        const li = document.createElement("li");

        li.innerHTML = `
          <span><strong>${user.name}</strong> - ${user.email}</span>
          <div class="actions">
            <button class="edit" onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
            <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
          </div>
        `;

        usersList.appendChild(li);
      });
    });
}

// ADD or UPDATE USER
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const userData = {
    name: nameInput.value,
    email: emailInput.value
  };

  if (editId) {
    fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    }).then(() => {
      editId = null;
      form.reset();
      fetchUsers();
    });
  } else {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    }).then(() => {
      form.reset();
      fetchUsers();
    });
  }
});

// EDIT USER INFO
function editUser(id, name, email) {
  nameInput.value = name;
  emailInput.value = email;
  editId = id;
}

// DELETE USER Info
function deleteUser(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  }).then(fetchUsers);
}

// Load users on start
fetchUsers();
