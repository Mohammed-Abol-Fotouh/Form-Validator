const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// show error message
const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = "form-control error";
	const small = formControl.querySelector("small");
	small.innerText = message;
};

// show succes outline
const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
};

// Check email is valid
const checkEmail = (input) => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, "Email is not valid");
	}
};

// check password is valid
const checkPassword = (input) => {
	const re =
		/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$/;
	if (re.test(input.value)) {
		showSuccess(input);
	} else {
		showError(input, `Only allowed to include A-Za-z0-9!#%`);
	}
};

// check required
const checkRequired = (inputArr) => {
	// loop through each element and validate for empty
	inputArr.forEach((input) => {
		if (input.value.trim() === "") {
			showError(input, `${getFieldName(input)} is required!`);
		} else {
			showSuccess(input);
		}
	});
};

// check input value length
const checkLength = (input, min, max) => {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} should be at least ${min} characters`,
		);
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} should be less than ${max} characters`,
		);
	} else {
		showSuccess(input);
	}
};

// check password match
const passwordMatch = (input, input2) => {
	if (input.value !== input2.value) {
		showError(input2, "Password do not match");
	}
};

// get input field name
const getFieldName = (input) => {
	// capitalize first character in each field id
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// event listeners
form.addEventListener("submit", (e) => {
	e.preventDefault();

	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 8, 32);
	checkEmail(email);
	checkPassword(password);
	passwordMatch(password, password2);
});
