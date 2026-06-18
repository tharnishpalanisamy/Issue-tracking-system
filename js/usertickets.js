const API = `http://localhost:3000/issues` 

let user = JSON.parse(localStorage.getItem('user'))
//fetech user's issues 
async function fetchUserIssues(){
let userIssuesData = await fetch(`${API}?userId=${user.id}`) 
let userIssues = await userIssuesData.json() 
return userIssues
}


//if user touched specific view 

async function issueFiltering(){
    let status = localStorage.getItem('status') 
    let issues = await fetchUserIssues() 
    let filetered = [] 
    document.getElementById('status').value = status 
    issues.forEach(issue=>{
        if(issue.status == status) {
            filetered.push(issue)
        }
    })
    createIssues(filetered) 
    localStorage.removeItem('status')

}

function createIssues(issues) {
    let table  = document.querySelector('.table')
    let tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    issues.forEach((issue, index) => {
        let date = new Date(issue.createdDate)
        tbody.innerHTML += `
        <tr>
            <td  >${index + 1}</td>
            <td >${issue.title}</td>
            <td >${issue.details}</td>
            <td >${issue.description}</td>
            <td class = '${issue.priority}'>${issue.priority}</td>
            <td>${user.name}</td>
            <td >${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</td>
            <td class='${issue.status}'>${issue.status}</td>
            <td >${issue.remark ? issue.remark : "-"}</td>
        </tr>
        `;
    });
}

async function displayIssues() { 

    let issues = await  fetchUserIssues()
    createIssues(issues)
    
}

displayIssues()

if(localStorage.getItem('status')){
    issueFiltering()
}

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
    searchIssue.value = ""
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
    searchIssue.value = ""
    createIssues(filteredIssues)


        
})

//issue search 
let searchIssue = document.getElementById('searchIssue');
searchIssue.addEventListener('input', async function () {

    let issues = await fetchUserIssues();

    let searchText = searchIssue.value.toLowerCase();
    let selectedStatus = issue.value;
    let selectedPriority = priority.value;

    let filtered = issues.filter(ticket => {

        let matchesSearch =
            ticket.title.toLowerCase().includes(searchText);

        let matchesStatus =
            selectedStatus === 'All' ||
            ticket.status === selectedStatus;

        let matchesPriority =
            selectedPriority === 'All' ||
            ticket.priority === selectedPriority;

        return matchesSearch &&
               matchesStatus &&
               matchesPriority;
    });

    createIssues(filtered);
});
