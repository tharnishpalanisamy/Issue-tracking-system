const API = 'http://localhost:3000/issues'

//if not logged in 
if(!localStorage.getItem('user')) {
    window.location.href = './login.html'
}

//toaster
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



let user = JSON.parse(localStorage.getItem('user'))
console.log(user.id);

console.log(user.email);


//dynamic name 

let name = document.querySelector('.welcome-name') 
name.innerHTML = `Welcome ${user.name} 👋 ` 

//user profile displaying
function updateProfile(){
    let profile = document.querySelector('.displayProfile') 
profile.classList.add('w-100', 'p-3', 'rounded-3', 'bg-light', 'border', 'border-light-subtle')
profile.innerHTML = `
<div class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-4">

    <!-- Profile Image Wrapper -->
    <div class="position-relative flex-shrink-0">
        <img src="../assets/profileimg.png"
             alt="Profile Picture of ${user.name}"
             class="rounded-circle border border-3 border-white shadow-sm"
             style="width: 110px; height: 110px; object-fit: cover;">
    </div>

    <!-- Profile Details -->
    <div class="text-center text-sm-start flex-grow-1">
        <h4 class="fw-bold text-dark mb-1">${user.name}</h4>
        <span class="badge text-bg-primary bg-gradient px-3 py-1.5 rounded-pill mb-3 fs-7 fw-medium">${user.designation}</span>
        
        <div class="d-flex flex-column gap-2 text-secondary fs-6">
            <div class="d-flex align-items-center justify-content-center justify-content-sm-start gap-2">
                <i class="bi bi-envelope text-muted"></i>
                <span>${user.email}</span>
            </div>
            <div class="d-flex align-items-center justify-content-center justify-content-sm-start gap-2">
                <i class="bi bi-building text-muted"></i>
                <span>${user.department} Department</span>
            </div>
        </div>
    </div>

</div>
`;
}

updateProfile()
fetchStatistic()
//profile edit 

let editName = document.getElementById('editName') 
let editEmail = document.getElementById('editEmail') 

editName.value = user.name 
editEmail.value = user.email

let saveChangesBtn = document.getElementById('saveChangesBtn') 
saveChangesBtn.addEventListener('click' , async function(){
    if(!editName.value || !editEmail.value) {
        alert('input error')
        return 
    }

    await fetch(`http://localhost:3000/users/${user.id}` , {
        method:"PATCH" , 
        headers:{
            'Content-type' : 'application/json'
        } , 
        body:JSON.stringify({
            name:editName.value , 
            email : editEmail.value
        })
    })

    let updatedUserData = await fetch(`http://localhost:3000/users/${user.id}`) 
    let updatedUser = await updatedUserData.json() 
    localStorage.setItem('user' , JSON.stringify(updatedUser))
    user = updatedUser
    name.innerHTML = `Welcome ${user.name} 👋`
    updateProfile()


    //hide modal 
    let modalElement = document.getElementById('editProfileModal') 
    let modal = bootstrap.Modal.getInstance(modalElement) 
    modal.hide()
})
// let editBtn = document.getElementById('editBtn') 
// editBtn.addEventListener('click' , function)

//load the dashboard

async function fetchStatistic(){
    let fetchedData = await fetch(`${API}?userId=${user.id}`)
    let issues = await fetchedData.json() 

    let total = 0 ; 
    let closed = 0 ; 
    let progress = 0 
    let open = 0 

    issues.forEach(issue=>{
        total ++ 
        if(issue.status =='Open') {
            open++
        }
        else if(issue.status == 'Closed') {
            closed ++
        }
        else if (issue.status == 'In Progress') {
            progress ++
        }
    })

    let issuesCount = document.querySelector(".issuesCount") 
    issuesCount.innerHTML = total  

    let resolvedCount = document.querySelector('.resolvedCount') 
    resolvedCount.innerHTML = closed 

    let pendingCount = document.querySelector('.pendingCount') 
    pendingCount.innerHTML = progress

    let openCount = document.querySelector('.openCount') 
    openCount.innerHTML = open
}

fetchStatistic()


//raise ticket 
function removeSpinner(){
    document.querySelector('.riseTicketModal-text').classList.remove('d-none') 
    document.querySelector('.riseTicketModal-spinner').classList.add('d-none') 
    raiseTicket.disabled = false
}
let raiseTicket = document.getElementById('raiseTicket') 

raiseTicket.addEventListener('click' , async function(){
    
    //spinner
    document.querySelector('.riseTicketModal-text').classList.add('d-none') 
    document.querySelector('.riseTicketModal-spinner').classList.remove('d-none') 
    raiseTicket.disabled = true 
    
    let title = document.getElementById('title') 
    let details = document.getElementById('details') 
    let description = document.getElementById('description') 
    let priority = document.getElementById('priority') 

    if(!title.value || !details.value || !description.value || !priority.value) {
        showToast('Please fill the Required Fields' , 'warning')
        removeSpinner() 
        return 
    }
    showToast('Ticekt Raised Successfully' , 'success') 

    let issue = {
        title : title.value , 
        details : details.value , 
        description : description.value , 
        priority : priority.value , 
        issueId:Date.now() , 
        createdDate : new Date().toISOString() , 
        status:'Open' , 
        remark : '' , 
        userId : user.id , 
        raisedBy:user.name 
    }


    await fetch(API , {
        method:"POST" , 
        headers:{
            'Content-type' : 'application/json'
        } , 
        body:JSON.stringify(issue)
    }) 

    
    

    //dismiss the modal 
    setTimeout(() => {
        
        fetchStatistic()


        title.value = "" 
        description.value = "" 
        details.value = "" 
        priority.value = ""


        let modalElement = document.getElementById('riseTicketModal') 
        let modal = bootstrap.Modal.getInstance(modalElement) 
        modal.hide()
        removeSpinner()
    }, 1200);
    
})


//resolved count view 

let resolvedView = document.getElementById('resolvedView') 
resolvedView.addEventListener('click' , function(){
    localStorage.setItem('status' , 'Closed') 
    window.location.href = './usertickets.html'
})

let pendingView = document.getElementById('pendingView') 
pendingView.addEventListener('click' , function(){
    localStorage.setItem('status' , 'In Progress') 
    window.location.href = './usertickets.html'
})

let openView = document.getElementById('openView') 
openView.addEventListener('click' , function(){
    localStorage.setItem('status' , 'Open') 
    window.location.href = './usertickets.html'
})


//user logout 

let logoutBtn = document.getElementById('logoutBtn') 
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

            Swal.fire({
                title: "Logged Out!",
                text: "You have been Logged Out!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });

            localStorage.removeItem('user');

            setTimeout(() => {
                window.location.href = './login.html';
            }, 1500);

        } else {

            document.querySelector('.logout-text').classList.remove('d-none');
            document.querySelector('.logout-spinner').classList.add('d-none');
            logoutBtn.disabled = false;

        }

    });

});