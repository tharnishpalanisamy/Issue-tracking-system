const API = 'http://localhost:3000/users'  

//creating user 

let createAccountBtn = document.getElementById('createAccount') 

createAccountBtn.addEventListener('click' , async function(){
    let name = document.getElementById('name') 
    let email = document.getElementById('email') 
    let department = document.getElementById('department') 
    let designation = document.getElementById('designation') 


    if(!name.value || !email.value || !department.value || 
        !designation.value || department.value === 'Select Your Department'
    ){
        alert("Enter All The required Fields ") 
        return 
    }

    let nameRegex = /^[a-zA-z ]{3,}$/ 
    let emailRegex = /^[a-zA-Z0-9+_%-]+@[a-zA-Z+_%-]+\.[a-zA-Z]{2,}$/ 
    

    let user = {
        email : email.value , 
        name : name.value , 

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