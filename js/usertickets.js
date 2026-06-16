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


//filtering 

let priority = document.getElementById('priority') 
let issue = document.getElementById('status') 


priority.addEventListener('change' , async function(){
    let priorityChoice = priority.value 
    let status = issue.value
    console.log(priorityChoice , status) ;

    let issuesData = await fetch(`${API}?userId=${user.id}`) 
    let issues = await issuesData.json() 

    let filteredIssues = [] 

    if(priorityChoice === 'All' && status === 'All') {
        filteredIssues = [...issues]
    }
    else if(priorityChoice === 'All' & status != 'All') {
        issues.forEach(issue=>{
            if(issue.status == status) {
            filteredIssues.push(issue)
            }
        })
    }
    else if (priorityChoice != 'All' && status == 'All') {
        issues.forEach(issue =>{
            if(issue.priority == priorityChoice) {
                filteredIssues.push(issue)
            }
        })
    }
    else{
        issues.forEach(issue =>{
            if(issue.priority == priorityChoice && issue.status == status) {
                filteredIssues.push(issue)
            }
        })
    }

    createIssues(filteredIssues)


        
})


issue.addEventListener('change' , async function(){
    let priorityChoice = priority.value 
    let status = issue.value
    console.log(priorityChoice , status) ;

    let issuesData = await fetch(`${API}?userId=${user.id}`) 
    let issues = await issuesData.json() 

    let filteredIssues = [] 

    if(priorityChoice === 'All' && status === 'All') {
        filteredIssues = [...issues]
    }
    else if(priorityChoice === 'All' & status != 'All') {
        issues.forEach(issue=>{
            if(issue.status == status) {
            filteredIssues.push(issue)
            }
        })
    }
    else if (priorityChoice != 'All' && status == 'All') {
        issues.forEach(issue =>{
            if(issue.priority == priorityChoice) {
                filteredIssues.push(issue)
            }
        })
    }
    else{
        issues.forEach(issue =>{
            if(issue.priority == priorityChoice && issue.status == status) {
                filteredIssues.push(issue)
            }
        })
    }

    createIssues(filteredIssues)


        
})