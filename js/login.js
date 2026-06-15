const API = 'http://localhost:3000/users'  

//login button

let loginBtn = document.getElementById('loginBtn') 

loginBtn.addEventListener('click' , async function (){
    let email = document.getElementById('email') 
    let password = document.getElementById('password') 
    console.log('clicked');
    
    if(!email.value || !password.value) {
        alert("Please fill all the required columns") 
        return 
    }

    let employeeData = await fetch(`${API}?email=${email.value}&password=${password.value}`) 
    let employee = await employeeData.json() 
    console.log(employee);
    
    if(employee.length ==1){
        alert('login in successful') 
        localStorage.setItem('user' , JSON.stringify(employee[0]))
        window.location.href = '../pages/user.html'
    }
    else{
        alert("failed")
    }

})