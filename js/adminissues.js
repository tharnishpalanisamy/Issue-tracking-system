const API = `http://localhost:3000/issues` 

//fetech user's issues 
async function fetchIssues(){
let issuesData = await fetch(`${API}`) 
let issues = await issuesData.json() 
return issues
}

//if user touched specific view 

async function issueFiltering(){
    let status = localStorage.getItem('status') 
    let issues = await fetchIssues() 
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
        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${issue.title}</td>
            <td>${issue.details}</td>
            <td>${issue.description}</td>
            <td class = '${issue.priority}'>${issue.priority}</td>
            <td>${issue.raisedBy}</td>
            <td>${new Date(issue.createdDate).toLocaleDateString()}</td>
            <td class='${issue.status}'>${issue.status}</td>
            <td>${issue.remark}</td>
            <td >
                <button class = "btn editBtn"data-bs-toggle="modal" data-bs-target="#editIssueModal"  > 
                <i class="bi bi-pencil-square fs-3 editBtn"  data-id = "${issue.id}"></i> </button>
            </td>
        </tr>
        `;
    });
}

async function displayIssues() { 

    let issues = await  fetchIssues()
    createIssues(issues)
    
}

displayIssues()
if(localStorage.getItem('status')){
    issueFiltering()
}

//filtering 

let priority = document.getElementById('priority') 
let issue = document.getElementById('status') 

//createFilteredIssues function 

async function createFilteredIssues(){
    let priorityChoice = priority.value 
    let status = issue.value
    console.log(priorityChoice , status) ;

    let issuesData = await fetch(`${API}`) 
    let issues = await issuesData.json() 

    let filteredIssues = [] 

    if(priorityChoice === 'All' && status === 'All') {
        filteredIssues = [...issues]
    }
    else if(priorityChoice === 'All' && status != 'All') {
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
}

priority.addEventListener('change' , async function(){ 
    await createFilteredIssues()
})


issue.addEventListener('change' , async function(){
 await createFilteredIssues()
})






//edit button 
let currentIssueId ; 

document.addEventListener('click' , async function(event){ 
    if(event.target.classList.contains('editBtn')) {
        //existing values 
        console.log(event.target.dataset.id);
        let ID = event.target.dataset.id 
        let curIssueData = await fetch(`${API}?id=${ID}`)
        let curIssue = await curIssueData.json() 
        currentIssueId = curIssue[0].id
        document.getElementById('Status').value = curIssue[0].status 
        document.getElementById('remarks').value = curIssue[0].remark
  
    }
    
})

//saving the changes 
document.addEventListener('click' , async function(event){
    if (event.target.classList.contains('saveBtn')) {
        //modified vals 

        let updatedStatus = document.getElementById('Status').value 
        let updatedRemark = document.getElementById('remarks').value 
        await fetch(`${API}/${currentIssueId}` , {
            method:'PATCH' , 
            headers:{
                'Content-type' : 'application/json'
            } , 
            body:JSON.stringify({status : updatedStatus , remark : updatedRemark})
        })
        
        //only show filtered tasks 



        await createFilteredIssues()


    //closing the Modal 
        let modalElement = document.getElementById('editIssueModal') 
        let modal = bootstrap.Modal.getInstance(modalElement) 
        modal.hide()
    }

    


})



