const API = 'http://localhost:3000/issues';


//dashboard
async function fetchStatistics() {
    let data = await fetch(API);
    let issues = await data.json();

    let totalCount = 0;
    let resolvedCount = 0;
    let progressCount = 0;
    let openCount = 0;
    let highPriority = 0 

    issues.forEach(issue => {
        totalCount++;
        if(issue.priority == 'High' && issue.status == 'Open') {
            highPriority ++
        }
        if (issue.status === 'Closed') {
            resolvedCount++;
        }
        else if (issue.status === 'In Progress') {
            progressCount++;
        }
        else if (issue.status === 'Open') {
            openCount++;
        }
    });
    
    document.querySelector('.totalCount').textContent = totalCount;
    document.querySelector('.resolvedCount').textContent = resolvedCount;
    document.querySelector('.progressCount').textContent = progressCount;
    document.querySelector('.openCount').textContent = openCount; 
    document.querySelector('.resolvedRate').innerText = `${Math.round((resolvedCount / totalCount) * 100  , 2)}%` 
    document.querySelector('.highPriorityCount').innerHTML = highPriority

    //for user statistics
    let usersData = await fetch('http://localhost:3000/users') 
    let users = await usersData.json() 

    document.querySelector('.totalUsers').innerText = users.length 


    // document.querySelector('.count').innerHTML = `Total Issues : ${totalCount}` 
    // createChart( openCount, resolvedCount, progressCount);
}

// function createChart( open, resolved, progress) {
//     new Chart(document.getElementById("issueChart"), {
//         type: "doughnut",
//         data: {
//             labels: ["Open", "Resolved", "In Progress"],
//             datasets: [{
//                 data: [ open, resolved, progress],
//                 backgroundColor: [
//                     "#ef4444",
//                     "#3b82f6",
//                     "#22c55e",
//                 ],
//                 borderWidth: 0
//             }]
//         },
//         options: {
//             cutout: "75%",
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: "bottom"
//                 },
//                 tooltip: {
//                 enabled: true
//             }
//             }
//         }
//     });
// }

fetchStatistics ();


//dynamic filtering based in click
let resolvedView = document.getElementById('resolvedView') 
resolvedView.addEventListener('click' , function(){
    localStorage.setItem('status' , 'Closed') 
    window.location.href = './adminissues.html'
})

let pendingView = document.getElementById('pendingView') 
pendingView.addEventListener('click' , function(){
    localStorage.setItem('status' , 'In Progress') 
    window.location.href = './adminissues.html'
})

let openView = document.getElementById('openView') 
openView.addEventListener('click' , function(){
    localStorage.setItem('status' , 'Open') 
    window.location.href = './adminissues.html'
}) 

let highPriority = document.getElementById('highPriority') 
highPriority.addEventListener('click' , function(){
    localStorage.setItem('priority' , 'High') 
    localStorage.setItem('status' , 'Open')
    window.location.href = './adminissues.html'
})

let resolvedRate = document.getElementById('resolvedRate') 
resolvedRate.addEventListener('click' , function(){
    localStorage.setItem('status' , 'Closed') 
    window.location.href = './adminissues.html'
})

let recentIssues = document.getElementById('recentIssues') 
recentIssues.addEventListener('click' , function(){
    localStorage.setItem('status' , 'Open') 
    window.location.href = './adminissues.html'
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


//creating issues
function createIssues(issues) {
    let table  = document.querySelector('.table')
    let tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    issues.forEach((issue, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${issue.title}</td>
            <td class = '${issue.priority}'>${issue.priority}</td>
            <td>${issue.raisedBy}</td>
            <td>${new Date(issue.createdDate).toLocaleDateString()}</td>
            <td class='${issue.status}'>${issue.status}</td>
        </tr>
        `;
    });
}

async function displayRecentIssues(){
    let issuesData = await fetch(API) 
    let issues = await issuesData.json()  
    let filtered = issues.filter(issue=>issue.status == 'Open') 
    filtered.reverse() 
    filteredList = []
    let count = 0 ; 
    for(let i = 0 ; i < filtered.length ; i++) {
        filteredList.push(filtered[i])
        count ++ 
        if(count == 5) {
            break
        }
    }
    createIssues(filteredList)
}

displayRecentIssues()

