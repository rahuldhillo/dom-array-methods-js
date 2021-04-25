const api = `https://randomuser.me/api`;
const addUser = document.getElementById("user-btn");
const descSortBtn = document.getElementById("sort-desc");
const ascSortBtn = document.getElementById("sort-asc");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");

const appState = [];

class User {
  constructor(title, firstName, lastName, gender, email) {
    this.title = title;
    this.name = `${firstName} ${lastName}`;
    this.gender = gender;
    this.email = email;
  }
}

addUser.addEventListener("click", async function () {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  const user = userJson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(classUser);
  renderUserList(appState);
});

const renderUserList = (stateArr) => {
  userList.innerHTML = null; //clearing the component.
  stateArr.forEach((userObj) => {
    userList.innerHTML += `<div>
    ${userObj.title} ${userObj.name}
    <ul>
      <li> ${userObj.gender}</li>
      <li> ${userObj.email}</li>
    </ul>
    </div>`;
  });
};

searchInput.addEventListener("keyup", searchEventHandler);
descSortBtn.addEventListener("click", descSortHandler);
ascSortBtn.addEventListener("click", ascSortHandler);

function searchEventHandler(e) {
  const filteredAppState = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  renderUserList(filteredAppState);
}

function descSortHandler() {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? 1 : -1));
  renderUserList(appStateCopy);
}

function ascSortHandler() {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? -1 : 1));
  renderUserList(appStateCopy);
}
