const API = `http://localhost:3000/issues` 

let user = JSON.parse(localStorage.getItem('user'))
//fetech user's issues 
async function fetchUserIssues(){
let userIssuesData = await fetch(`${API}?userId=${user.id}`) 
let userIssues = await userIssuesData.json() 
return userIssues
}

fetchUserIssues()


function createIssues(issues) {
    let table  = document.querySelector('.table')
    let tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    issues.forEach((issue, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${issue.title}</td>
            <td>${issue.details}</td>
            <td>${issue.description}</td>
            <td class = '${issue.priority}'>${issue.priority}</td>
            <td>${user.name}</td>
            <td>${new Date(issue.createdDate).toLocaleDateString()}</td>
            <td class='${issue.status}'>${issue.status}</td>
        </tr>
        `;
    });
}

async function displayIssues() { 

    let issues = await  fetchUserIssues()
    createIssues(issues)
    
}

displayIssues()