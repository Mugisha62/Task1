const API_URL = "/users";

const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const usersList = document.getElementById("users");

let editId = null;

// READ
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

// CREATE + UPDATE
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim()
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

// EDIT
function editUser(id, name, email) {
  nameInput.value = name;
  emailInput.value = email;
  editId = id;
}

// DELETE
function deleteUser(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(fetchUsers);
}

// Load on start
fetchUsers();
