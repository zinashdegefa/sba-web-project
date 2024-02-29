let submitRequest = document.getElementById("submitRequest");
let submitSignup = document.getElementById("submitSignup");
let submitLogin = document.getElementById("submitLogin");
let getStudent = document.getElementById("getStudent");
let errorMessage = document.getElementById("errorMessage");
let signupErrorMessage = document.getElementById("signupErrorMessage");
let loginErrorMessage = document.getElementById("loginErrorMessage");
let form = document.getElementById("form");
let displayStudent = document.getElementById("displayStudent");

let loginRequest = document.getElementById("loginRequest");
let signupForm = document.getElementById("signupForm");
let loginStu = document.getElementById("loginStu");

if (submitRequest != null) {
  submitRequest.addEventListener("click", submitFunc);
}

if (getStudent != null) {
  getStudent.addEventListener("click", getStudentFunc);
}

function submitFunc() {
  if (
    fName.value === "" ||
    lName.value === "" ||
    inputAddress.value === "" ||
    inputCity.value === "" ||
    inputState.value === "" ||
    inputZip.value === ""
  ) {
    errorMessage.style.display = "block";
    errorMessage.style.color = "red";
    errorMessage.innerText = "Please fill all the required fields!";
  } else if (!isZipcodeValid(inputZip.value)){
    errorMessage.style.display = "block";
    errorMessage.style.color = "red";
    errorMessage.innerText = "Zipcode is not valid!";
  } else {
    let addForm = document.getElementById("addStudent");

    addForm.style.display = "none";

    const data = {
      firstName: fName.value,
      lastName: lName.value,
      inputAddress: inputAddress.value,
      inputAddress2: inputAddress2.value,
      inputCity: inputCity.value,
      inputState: inputState.value,
      inputZip: inputZip.value,
    };
    console.log(data);
    console.log("Student first name: " + data.firstName);
    console.log("Student zip code: " + data.inputZip);

    var existingEntries = JSON.parse(localStorage.getItem("students"));
    if (existingEntries == null) existingEntries = [];

    // Save allEntries back to local storage
    existingEntries.push(data);
    localStorage.setItem("students", JSON.stringify(existingEntries));

    form.reset();

    errorMessage.style.display = "block";
    errorMessage.style.color = "green";
    errorMessage.innerText = "Your form is successfuly submitted!";
  }
}

function isZipcodeValid(zipCode) {

 return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
 
}

function getStudentFunc() {
  let displayStudentTable = document.getElementById("displayTable");
  let allStudents = document.getElementById("allStudents");

  let students = localStorage.getItem("students");

  let studentsJson = JSON.parse(students);
  console.log(studentsJson);

  displayStudentTable.style.display = "table";

  if (studentsJson !== "") {
    for (let student of studentsJson) {
      let tr = document.createElement("tr");

      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let td5 = document.createElement("td");
      let td6 = document.createElement("td");
      let td7 = document.createElement("td");

      td1.innerText = student.firstName;
      tr.appendChild(td1);

      td2.innerText = student.lastName;
      tr.appendChild(td2);

      td3.innerText = student.inputAddress;
      tr.appendChild(td3);

      td4.innerText = student.inputAddress2;
      tr.appendChild(td4);

      td5.innerText = student.inputCity;
      tr.appendChild(td5);

      td6.innerText = student.inputState;
      tr.appendChild(td6);

      td7.innerText = student.inputZip;
      tr.appendChild(td7);

      allStudents.appendChild(tr);
    }
  } else {
    console.log("No student record found");
  }
}

if (submitSignup != null) {
  submitSignup.addEventListener("click", signupFunc);
}


function signupFunc() {
  let username = document.getElementById("username");
  let password = document.getElementById("password");

  if (username.value === "" || password.value === "") {
    signupErrorMessage.style.display = "block";
    signupErrorMessage.style.color = "red";
    signupErrorMessage.innerText = "Please fill all the required fields!";
  } else {
    const userData = {
      username: username.value,
      password: password.value,
    };
    console.log(userData);
    console.log("userName: " + userData.username);
    console.log("Password: " + userData.password);

    let existingUsers = JSON.parse(localStorage.getItem("users"));
    if (existingUsers == null) existingUsers = [];

    existingUsers.push(userData);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    signupForm.reset();

    let goToSignin = document.getElementById("goToSignin");
    goToSignin.setAttribute("href", "index.html");
  }
}

if (submitLogin != null) {

  submitLogin.addEventListener("click", loginFunc);
}

function loginFunc() {
  let loginForm = document.getElementById("loginForm");
  let username = document.getElementById("username");
  let password = document.getElementById("password");

  console.log("Hello");
  if (username.value === "" || password.value === "") {
    loginErrorMessage.style.display = "block";
    loginErrorMessage.style.color = "red";
    loginErrorMessage.innerText = "Please fill all the required fields!";
  } else {
    const userInput = {
      username: username.value,
      password: password.value,
    };
    console.log(userInput);
    console.log("userName: " + userInput.username);
    console.log("Password: " + userInput.password);

    let existingUsers = JSON.parse(localStorage.getItem("users"));

    console.log(existingUsers);

    if(existingUsers === null){
      console.error("User not found");
      loginErrorMessage.style.display = "block";
      loginErrorMessage.style.color = "red";
      loginErrorMessage.innerText = "username or password not found";
      return;
    }

    for(user of existingUsers){

      if (userInput.username === user.username && userInput.password === user.password || user === "") {
        loginForm.reset();

        let goToHome = document.getElementById("goToHome");
        goToHome.setAttribute("href", "home.html");
        break;
      } else {
        console.error("User not found");
        loginErrorMessage.style.display = "block";
        loginErrorMessage.style.color = "red";
        loginErrorMessage.innerText = "username or password not found";
      }
    }

   
  }
}
