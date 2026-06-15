const API = 'http://localhost:3000/issues'

let user = JSON.parse(localStorage.getItem('user'))
console.log(user.id);


//user profile displaying
let profile = document.querySelector('.displayProfile') 
profile.classList.add( 'fw-medium' , 'm-auto' , 'text-primary')
profile.innerHTML = `
<div class="d-flex align-items-center gap-3">

    <img src="../assets/profileimg.png"
         alt="Profile"
         class="rounded-circle border-2 flex-shrink-0"
         style="width:100px;height:100px;object-fit:cover;">

    <div>
        <h5 class="mb-2">${user.name} </h5>
        <p class="mb-1"><strong>Email:</strong> ${user.email}</p>
        <p class="mb-1"><strong>Department:</strong> ${user.department}</p>
        <p class="mb-0"><strong>Designation:</strong> ${user.designation}</p>
    </div>

</div>
`;


//raise ticket 

let raiseTicket = document.getElementById('raiseTicket') 

raiseTicket.addEventListener('click' , async function(){
    console.log('hi');
    
    let title = document.getElementById('title') 
    let details = document.getElementById('details') 
    let description = document.getElementById('description') 
    let priority = document.getElementById('priority') 

    if(!title.value || !details.value || !description.value || !priority.value) {
        alert("Please fill all the necessary fields")
    }

    let issue = {
        title : title.value , 
        details : details.value , 
        description : description.value , 
        priority : priority.value , 
        issueId:Date.now() , 
        createdDate : new Date().toISOString() , 
        status:'Open' , 
        remark : '' , 
        userId : user.id 
    }


    await fetch(API , {
        method:"POST" , 
        headers:{
            'Content-type' : 'application/json'
        } , 
        body:JSON.stringify(issue)
    }) 

    title.value = "" 
    description.value = "" 
    details.value = "" 
    priority.value = ""
    console.log('issue created');
    

    //dismiss the modal 

    let modalElement = document.getElementById('riseTicketModal') 
    let modal = bootstrap.Modal.getInstance(modalElement) 
    modal.hide()
})