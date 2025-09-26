const API_URL = "http://localhost:3000";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiI2OGQ2ZDM3MDZhMDE0YmM4YWViY2UxOWMiLCJpYXQiOjE3NTg5MTY0MDYsImV4cCI6MTc1OTc4MDQwNn0.ONehNblFu0ZuhaEFQsZFdhhhL3L_M-lrycrsxa0kdLk";

const modal = document.getElementById("userModal");
const closeModal = document.getElementById("closeModal");
const openCreateModal = document.getElementById("openCreateModal");
const modalTitle = document.getElementById("modalTitle");
const userForm = document.getElementById("userForm");

async function fetchUsers() {
  const res = await fetch(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  renderUsers(data.data || []);
}

function renderUsers(users) {
  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "";
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.address?.city || ""}</td>
      <td>${user.address?.country || ""}</td>
      <td>
        <button class="action edit" onclick="openEditModal('${user._id}', '${user.name}', '${user.email}', '${
      user.address?.city || ""
    }', '${user.address?.country || ""}')">Edit</button>
        <button class="action delete" onclick="softDeleteUser('${user._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function openEditModal(id, name, email, city, country) {
  modalTitle.textContent = "Edit User";
  document.getElementById("userId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("city").value = city;
  document.getElementById("country").value = country;
  document.getElementById("password").value = "";
  modal.classList.add("show");
}

async function softDeleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) return;
  await fetch(`${API_URL}/admin/user/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  fetchUsers();
}

openCreateModal.addEventListener("click", () => {
  modalTitle.textContent = "Create User";
  userForm.reset();
  document.getElementById("userId").value = "";
  modal.classList.add("show");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = document.getElementById("userId").value;
  const userData = !userId
    ? {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        city: document.getElementById("city").value,
        country: document.getElementById("country").value,
        password: document.getElementById("password").value,
      }
    : {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        address: { city: document.getElementById("city").value, country: document.getElementById("country").value },
        password: document.getElementById("password").value || undefined,
      };

  const method = userId ? "PUT" : "POST";
  const url = userId ? `${API_URL}/admin/user/${userId}` : `${API_URL}/user/register`;

  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  modal.classList.remove("show");
  fetchUsers();
});

fetchUsers();
