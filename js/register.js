const API = 'http://localhost:3000/users';

// Toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('loginToast');

    toast.className = `toast border-0 shadow text-bg-${type}`;

    toast.querySelector('.toast-body').textContent = message;

    const bsToast = new bootstrap.Toast(toast, {
        delay: 3000
    });

    bsToast.show();
}

// Spinner
let createAccountBtn = document.getElementById('createAccount');

function showSpinner() {
    document.querySelector('.register-text').classList.add('d-none');
    document.querySelector('.register-spinner').classList.remove('d-none');
    createAccountBtn.disabled = true;
}

function removeSpinner() {
    document.querySelector('.register-text').classList.remove('d-none');
    document.querySelector('.register-spinner').classList.add('d-none');
    createAccountBtn.disabled = false;
}

// Inputs
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameErr = document.getElementById('nameErr');
const emailErr = document.getElementById('emailErr');
const passwordErr = document.getElementById('passwordErr');

// Regex
const nameRegex = /^[a-zA-Z ]{3,}$/;
const emailRegex = /^[a-zA-Z0-9+_%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

// Dynamic Validation
nameInput.addEventListener('input', () => {
    if (!nameInput.value.trim()) {
        nameErr.innerText = 'Name is required';
    } else if (!nameRegex.test(nameInput.value)) {
        nameErr.innerText = 'Minimum 3 letters required';
    } else {
        nameErr.innerText = '';
    }
});

emailInput.addEventListener('input', () => {
    if (!emailInput.value.trim()) {
        emailErr.innerText = 'Email is required';
    } else if (!emailRegex.test(emailInput.value)) {
        emailErr.innerText = 'Enter valid email';
    } else {
        emailErr.innerText = '';
    }
});

passwordInput.addEventListener('input', () => {
    if (!passwordInput.value.trim()) {
        passwordErr.innerText = 'Password is required';
    } else if (!passwordRegex.test(passwordInput.value)) {
        passwordErr.innerText =
            'Need 8 chars, 1 capital, 1 number & 1 symbol';
    } else {
        passwordErr.innerText = '';
    }
});

// Register
createAccountBtn.addEventListener('click', async function () {

    let department = document.getElementById('department');
    let designation = document.getElementById('designation');

    showSpinner();

    // Clear Errors
    nameErr.innerText = '';
    emailErr.innerText = '';
    passwordErr.innerText = '';

    // Empty Validation
    if (
        !nameInput.value.trim() ||
        !emailInput.value.trim() ||
        !passwordInput.value.trim() ||
        !department.value ||
        !designation.value.trim()
    ) {
        showToast('Please fill all required fields', 'warning');
        removeSpinner();
        return;
    }

    // Regex Validation
    if (!nameRegex.test(nameInput.value)) {
        nameErr.innerText = 'Minimum 3 letters required';
        removeSpinner();
        return;
    }

    if (!emailRegex.test(emailInput.value)) {
        emailErr.innerText = 'Enter valid email';
        removeSpinner();
        return;
    }

    if (!passwordRegex.test(passwordInput.value)) {
        passwordErr.innerHTML =
            'Need 8 chars, 1 capital, 1 number & 1 symbol';
        removeSpinner();
        return;
    }

    try {

        // Check Duplicate Email
        let existingData = await fetch(
            `${API}?email=${emailInput.value}`
        );

        let existingUser = await existingData.json();

        if (existingUser.length > 0) {
            showToast('Email already registered', 'danger');
            removeSpinner();
            return;
        }

        const user = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value,
            department: department.value,
            designation: designation.value.trim(),
            role: 'user',
            dateOfJoining: new Date().toISOString()
        };

        await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        showToast('Account created successfully 🎉', 'success');

        setTimeout(() => {
            window.location.href = './login.html'; 
            removeSpinner()
        }, 1500);

    } catch (error) {
        console.error(error);
        showToast('Something went wrong. Try again.', 'danger');
        removeSpinner();
    }
});