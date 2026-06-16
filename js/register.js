const API = 'http://localhost:3000/users'  

//creating user 

let createAccountBtn = document.getElementById('createAccount') 

createAccountBtn.addEventListener('click' , async function(){
    let name = document.getElementById('name') 
    let email = document.getElementById('email') 
    let password = document.getElementById('password')
    let department = document.getElementById('department') 
    let designation = document.getElementById('designation') 


    if(!name.value || !email.value || !department.value || 
        !designation.value || department.value === 'Select Your Department'
    ){
        alert("Enter All The required Fields ") 
        return 
    }
    let nameErr = document.getElementById('nameErr') 
    let emailErr = document.getElementById('emailErr') 
    let passwordErr = document.getElementById('passwordErr')
    //regex
    let nameRegex = /^[a-zA-z ]{3,}$/ 
    let emailRegex = /^[a-zA-Z0-9+_%-]+@[a-zA-Z+_%-]+\.[a-zA-Z]{2,}$/ 
    let passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/

    nameErr.innerText = "" 
    passwordErr.innerHTML = "" 
    email.innerText = ""
    //regex checking 
    if(!nameRegex.test(name.value)) {
        nameErr.innerText = 'Name should only contain letters and spaces' 
        return 
    }
    if(!emailRegex.test(email.value)) {
        emailErr.innerText = "Email should be in the correct format" 
        return 
    }
    if(!passwordRegex.test(password.value)) {
        passwordErr.innerHTML = '<br>Password should atleast contain one Capital , number and symbols '
        return 
    }

    let user = {
        email : email.value , 
        name : name.value , 
        password : password.value , 
        department : department.value , 
        designation : designation.value , 
        dateOfJoining : new Date().toISOString() 
    }
    
    await fetch(API , {
        method:'POST' , 
        headers:{
            'Content-type':'application/json' 
        } , 
        body:JSON.stringify(user)
    })

    console.log('submitted');

    window.location.href = './login.html'
})