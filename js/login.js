    const API = 'http://localhost:3000/users'  

    //login button

    let loginBtn = document.getElementById('loginBtn') 

    loginBtn.addEventListener('click' , async function (){
        let role = document.querySelector('input[name="role"]:checked') 
        console.log('hi',role.value);

        let email = document.getElementById('email') 
        let password = document.getElementById('password') 
        console.log('clicked');
        
        if(!email.value || !password.value ) {
            alert("Please fill all the required columns") 
            return 
        }

        

        let employeeData = await fetch(`${API}?email=${email.value}&password=${password.value}`) 
        let employee = await employeeData.json() 
        console.log(employee);
        
        if (role.value == 'admin') {
            console.log('hi');
            
            if(employee.length == 1 && employee[0].role== 'admin') {
                alert('login successful') 
                email.value = "" 
                password.value = "" 
                window.location.href = './admindashboard.html' 
                return 
            }
            else{
                alert('wrong role choosen') 
                return 
            }
        }
        



        if(employee.length ==1 && employee[0].role != 'admin'){
            alert('login in successful') 
            localStorage.setItem('user' , JSON.stringify(employee[0])) 
            email.value = "" 
            password.value = "" 
            role.value = 'user'
            window.location.href = '../pages/user.html'
        }
        else{
            alert("failed")
        }


    })