const API = 'http://localhost:3000/users' 

//displaying employees 

function createUsers(users) {
    let table  = document.querySelector('.table')
    let tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    users.forEach((user, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class = '${user.department}'>${user.department}</td>
            <td>${user.designation}</td>
            <td>${user.dateOfJoining ? user.dateOfJoining : "-"}</td>
        </tr>
        `;
    });
}


async function fetchUsers(){
    let usersData = await fetch(API) 
    let users = await usersData.json() 

    createUsers(users)
}

fetchUsers()

let department = document.getElementById('department') 
department.addEventListener('change' , async function(){
    let deptVal = department.value 

    let usersData = await fetch(API) 
    let users = await usersData.json() 
    let filteredUsers = [] 
    if (deptVal == 'All') {
        createUsers(users)
    }
    else{
    users.forEach(user=>{
        if(user.department == deptVal) {
            filteredUsers.push(user)
        }
    })
    createUsers(filteredUsers)
}
})


//logout 
function removeSpinner(){
    document.querySelector('.logout-text').classList.remove('d-none');
    document.querySelector('.logout-spinner').classList.add('d-none');
    logoutBtn.disabled = false;
}
let logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', function () {

document.querySelector('.logout-text').classList.add('d-none');
document.querySelector('.logout-spinner').classList.remove('d-none');
logoutBtn.disabled = true;

Swal.fire({
    title: "Are you sure?",
    text: "Do you want to Logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout!"
}).then((result) => {

    if (result.isConfirmed) {

        setTimeout(() => {
            Swal.fire({
            title: "Logged Out!",
            text: "You have been Logged Out!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
        }, 800);

        setTimeout(() => {
            localStorage.removeItem('user');
            window.location.href = './login.html';
            removeSpinner()
        }, 1500);

    } else {

        // Restore button state if user cancels
        removeSpinner()
    }

});
});