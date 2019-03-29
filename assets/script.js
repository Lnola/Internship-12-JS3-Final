if (localStorage.getItem("Username") !== null) {
    switchSignupToLogin();
}

let signUpSubmitButton = document.getElementById("s-submit");

signUpSubmitButton.addEventListener("click", function () {
    let signUpInputsArray = document.getElementsByClassName("s-input");

    if (isAnyInputEmpty(signUpInputsArray)) {
        if (
            checkRepeatPassword(signUpInputsArray) &&
            checkMinLetters(signUpInputsArray)
        ) {
            localStorage.setItem("Username", signUpInputsArray[0].value);
            localStorage.setItem("Password", signUpInputsArray[1].value);
            alert("User saved");
        }
    }
});

let signInSubmitButton = document.getElementById("l-submit");

signInSubmitButton.addEventListener("click", function () {
    let signInInputsArray = document.getElementsByClassName("l-input");

    if (
        isAnyInputEmpty(signInInputsArray) &&
        isSameAsLocalStorage(signInInputsArray)
    ) {
        switchLoginToUsers();
    }
});

function switchSignupToLogin() {
    $("#signup-input").addClass("display-none");
    $("#login-input").removeClass("display-none");
}

function switchLoginToUsers() {
    $("#login-input").addClass("display-none");
    $("#users-display").removeClass("display-none");
}

function isAnyInputEmpty(array) {
    for (let input of array) {
        if (input.value === "") {
            alert("All inputs are required");
            return false;
        }
    }
    return true;
}

function checkRepeatPassword(array) {
    if (array[1].value !== array[2].value) {
        alert("Passwords don't match");
        return false;
    }
    return true;
}

function checkMinLetters(array) {
    for (let input of array) {
        if (input.value.length < 5) {
            alert("Input is too short");
            return false;
        }
    }
    return true;
}

function isSameAsLocalStorage(array) {
    if (
        array[0].value === localStorage.getItem("Username") &&
        array[1].value === localStorage.getItem("Password")
    )
        return true;

    alert("Username or password don't match");
    return false;
}



$("#signup-input").addClass("display-none");
$("#login-input").addClass("display-none");
$("#users-display").removeClass("display-none");



fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        addUsers(data);
        addDescriptionEventToUsers(data);
        addPostEventToUser();
    });

function addUsers(array) {
    let usersContainer = document.getElementById("main");
    for (let i = 0; i < array.length; i++) {
        usersContainer.innerHTML += `
        <div class= "offers__item">
            <img class="item__img" src="assets/images/offer.jpg" alt="Place Cage" />
            <p class="item__paragraph">
                ${array[i].name}
            </p>
            <span class="item__price">
                ${array[i].address.city}
            </span>
            <p class="item__price">
                ${array[i].email}
            </p>
            <button class="item__button">
                Posts
            </button>
        </div>`;
    }
}

function addDescriptionEventToUsers(data) {
    let array = document.querySelectorAll(".offers__item");

    array.forEach((item,index) => {
        console.log(data[index].name);
        item.addEventListener("click", () => {
            $("body").addClass("overflow-hidden");
            $("#user-details-background").removeClass("display-none");
            document.getElementById("user-details-content").innerHTML = `
            <h1>
                Name: ${data[index].name}
            </h1>
            <p>
                Username: ${data[index].username}
            </p>
            <p>
                Email: ${data[index].email}
            </p>
            <p>
                Phone: ${data[index].phone}
            </p>
            <p>
                Website: ${data[index].website}
            </p>
            <h1>
                Address:
            </h1>
            <p>
                Street: ${data[index].address.street}
            </p>
            <p>
                Suite: ${data[index].address.suite}
            </p>
            <p>
                City: ${data[index].address.city}
            </p>
            <p>
                Zipcode: ${data[index].address.zipcode}
            </p>
            <p>
                Lat: ${data[index].address.geo.lat}
            </p>
            <p>
                Lng: ${data[index].address.geo.lng}
            </p>
            <h1>
                Company:
            </h1>
            <p>
                Name: ${data[index].company.name}
            </p>
            <p>
                Phrase: ${data[index].company.catchPhrase}
            </p>
            <p>
                Bs: ${data[index].company.bs}
            </p>
            `;
        });
    });
}

function addPostEventToUser() {
    let array = document.querySelectorAll(".item__button");

    array.forEach(item => {
        item.addEventListener("click", e => {
            console.log(e);
            e.stopPropagation();
        })
    });
}