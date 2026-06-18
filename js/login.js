const API = 'http://localhost:3000/users'  

//toaster
function showToast(message, type = 'success') {
const toast = document.getElementById('loginToast');

toast.className = `toast align-items-center text-bg-${type} border-0`;

toast.querySelector('.toast-body').textContent = message;

const bsToast = new bootstrap.Toast(toast, {
    delay: 3000
});

bsToast.show();
}

function removeSpinner(){
    document.querySelector('.login-text').classList.remove('d-none') 
    document.querySelector('.login-spinner').classList.add('d-none') 
    loginBtn.disabled = false
}
//login button

let loginBtn = document.getElementById('loginBtn') 

loginBtn.addEventListener('click' , async function (e){
    e.preventDefault()

    //spinner
    document.querySelector('.login-text').classList.add('d-none') 
    document.querySelector('.login-spinner').classList.remove('d-none') 
    loginBtn.disabled = true 

    let role = document.querySelector('input[name="role"]:checked') 
    console.log('hi',role.value);

    let email = document.getElementById('email') 
    let password = document.getElementById('password') 
    console.log('clicked');
    
    if(!email.value || !password.value ) {
        showToast('Please fill all fields', 'warning')
        removeSpinner() 
        return 
    }

    

    let employeeData = await fetch(`${API}?email=${email.value}&password=${password.value}`) 
    let employee = await employeeData.json() 
    console.log(employee);
    
    if (role.value == 'admin') {
        if(employee.length == 1 && employee[0].role== 'admin') {
            showToast('Login Successful 🎉', 'success'); 
            setTimeout(() => {
            localStorage.setItem('user' , JSON.stringify(employee[0])) 
            email.value = "" 
            password.value = "" 
            role.value = 'user'
            window.location.href = './admindashboard.html'
            
            }, 1500); 
            return 
        }
        else{
            showToast('Invalid role selected', 'danger')
            removeSpinner() 
            return 
        }
    }
    



    if(employee.length ==1 && employee[0].role != 'admin'){
        showToast('Login Successful 🎉', 'success'); 
        setTimeout(() => {
            localStorage.setItem('user' , JSON.stringify(employee[0])) 
        email.value = "" 
        password.value = "" 
        role.value = 'user'
        window.location.href = '../pages/user.html'
        removeSpinner()
        }, 1500);
    }
    else{
        showToast('User not found!', 'danger') 
        removeSpinner()
    }


})