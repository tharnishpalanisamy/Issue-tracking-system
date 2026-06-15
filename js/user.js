const API = 'http://localhost:3000/issues'

let user = localStorage.getItem('user')
console.log(user.email);

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
        remark : ''
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