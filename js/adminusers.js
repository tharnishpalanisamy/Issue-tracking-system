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