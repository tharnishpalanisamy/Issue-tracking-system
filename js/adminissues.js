const API = `http://localhost:3000/issues` 

//fetech user's issues 
async function fetchIssues(){
let issuesData = await fetch(`${API}`) 
let issues = await issuesData.json() 
return issues
}

const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.replace('../index.html');
}

//toast
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


//if user touched specific view 

async function issueFiltering(){
    let status = localStorage.getItem('status') || null 
    let priority = localStorage.getItem('priority') || null 
    let issues = await fetchIssues() 
    let filetered = [] 
    document.getElementById('status').value = status || 'All' 
    document.getElementById('priority').value = priority || 'All'

    issues.forEach(issue=>{
        if (status && priority) {
            if(issue.status == status  && issue.priority == priority) {
                filetered.push(issue)
            }
        }
        else if(status) {
            if(issue.status == status) {
            filetered.push(issue)
        }
        }
        else if(priority) {
            if(issue.priority == priority) {
                filetered.push(issue    )
            }
        }
        
    })
    createIssues(filetered) 
    localStorage.removeItem('status')
    localStorage.removeItem('priority')

}





function createIssues(issues) {
    let table  = document.querySelector('.table')
    let tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    issues.forEach((issue, index) => {
        let curDate = new Date(issue.createdDate)
        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${issue.title}</td>
            <td>${issue.details}</td>
            <td>${issue.description}</td>
            <td class = '${issue.priority}'>${issue.priority}</td>
            <td>${issue.raisedBy}</td>
            <td>${curDate.getDate()}/${curDate.getMonth()}/${curDate.getFullYear()}</td>
            <td class='${issue.status}'>${issue.status}</td>
            <td>${issue.remark?issue.remark : "-"}</td>
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
if(localStorage.getItem('status') || localStorage.getItem('priority')){
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

        showToast('Issue Updated' , 'success')
    //closing the Modal 
        let modalElement = document.getElementById('editIssueModal') 
        let modal = bootstrap.Modal.getInstance(modalElement) 
        modal.hide()
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
            window.location.replace('./login.html')
            removeSpinner()
        }, 1500);

    } else {

        // Restore button state if user cancels
        removeSpinner()
    }

});
});


//search by title 

let searchIssue = document.getElementById('searchIssue');

searchIssue.addEventListener('input', async function () {

    let value = searchIssue.value.toLowerCase().trim();

    let data = await fetch(API);
    let issues = await data.json();

    let filtered = issues.filter(item =>
        item.title.toLowerCase().includes(value) &&
        (issue.value === 'All' || item.status === issue.value) &&
        (priority.value === 'All' || item.priority === priority.value)
    );

    createIssues(filtered);
});


//date filter
let applyBtn = document.getElementById('applyBtn');

applyBtn.addEventListener('click', async function () {
    let fromDate = document.getElementById('fromDate');
    let toDate = document.getElementById('toDate');

    if (!fromDate.value) {
        showToast('From Date cannot be empty', 'warning');
        return;
    }

    let from = new Date(fromDate.value);
    from.setHours(0, 0, 0, 0);

    let to = toDate.value ? new Date(toDate.value) : new Date();
    to.setHours(23, 59, 59, 999);

    if (from > to) {
        showToast('From Date cannot be greater than To Date', 'warning');
        return;
    }
    let status = document.getElementById('status') 
    let issuesData = await fetch(API);
    let issues = await issuesData.json();

    let filtered = issues.filter(issue => {
        let issueDate = new Date(issue.createdDate);
        return issueDate >= from && issueDate <= to && 
        (issue.status == status.value|| status.value == 'All')
        && (issue.priority == priority.value || priority.value == 'All')
    });


    createIssues(filtered);

    let modalElement = document.getElementById('filterModal');
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

});