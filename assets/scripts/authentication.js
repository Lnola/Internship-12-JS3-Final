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
            switchSignupToUsers();
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

function switchSignupToUsers() {
    $("#signup-input").addClass("display-none");
    $("#users-display").removeClass("display-none");
}

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


//testing
removeAuthenticationForTesting();

function removeAuthenticationForTesting() {
    $("#signup-input").addClass("display-none");
    $("#login-input").addClass("display-none");
    $("#users-display").removeClass("display-none");
}