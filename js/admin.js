const API = 'http://localhost:3000/issues';


//statistcs 
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.replace('../index.html');
}
let statistics = [] 

//dashboard
async function fetchStatistics() {
    let data = await fetch(API);
    let issues = await data.json();

    let totalCount = 0;
    let resolvedCount = 0;
    let progressCount = 0;
    let openCount = 0;
    let highCount = 0;
    let mediumCount = 0;
    let lowCount = 0;


    let highPriority = 0 

    issues.forEach(issue => {
        totalCount++;

        if(issue.priority == 'High'){
            highCount++
        }
        else if(issue.priority == 'Medium') {
            mediumCount++
        }
        else{
            lowCount ++
        }
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

//         createPriorityChart(
//         highCount,
//         mediumCount,
//         lowCount
//     );
//     // document.querySelector('.count').innerHTML = `Total Issues : ${totalCount}` 

//     const centerTextPlugin = {
//     id: 'centerText',
//     beforeDraw(chart) {
//         const { ctx } = chart;

//         const centerX = chart.width / 2;
//         const centerY = chart.height / 2;

//         ctx.save();

//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';

//         ctx.font = 'bold 42px Arial';
//         ctx.fillStyle = '#1E293B';
//         ctx.fillText(totalCount, centerX, centerY - 10);

//         ctx.font = '14px Arial';
//         ctx.fillStyle = '#64748B';
//         ctx.fillText('Total Issues', centerX, centerY + 22);

//         ctx.restore();
//     }
// };

// const existingChart = Chart.getChart("issueChart");

// if (existingChart) {
//     existingChart.destroy();
// }

// new Chart(document.getElementById('issueChart'), {
//     type: 'doughnut',
//     data: {
//         labels: ['Resolved', 'In Progress', 'Open'],
//         datasets: [{
//             data: [
//                 resolvedCount,
//                 progressCount,
//                 openCount
//             ],
//             backgroundColor: [
//                 '#22C55E',
//                 '#0EA5E9',
//                 '#F59E0B'
//             ],
//             borderWidth: 0
//         }]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         cutout: '75%',
//         plugins: {
//             legend: {
//                 position: 'bottom',
//                 labels: {
//                     usePointStyle: true,
//                     padding: 20
//                 }
//             }
//         }
//     },
//     plugins: [centerTextPlugin]
// });

}


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
            window.location.replace('./login.html');
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



//bar chart
// function createPriorityChart(high, medium, low){

//     new Chart(
//         document.getElementById('priorityChart'),
//         {
//             type:'bar',

//             data:{
//                 labels:[
//                     'High Priority',
//                     'Medium Priority',
//                     'Low Priority'
//                 ],

//                 datasets:[{
//                     data:[
//                         high,
//                         medium,
//                         low
//                     ],

//                     backgroundColor:[
//                         '#EF4444',
//                         '#F59E0B',
//                         '#10B981'
//                     ],

//                     borderRadius:12,
//                     borderSkipped:false
//                 }]
//             },

//             options:{
//                 indexAxis:'y',

//                 responsive:true,

//                 plugins:{
//                     legend:{
//                         display:false
//                     }
//                 },

//                 scales:{
//                     x:{
//                         beginAtZero:true,
//                         grid:{
//                             display:false
//                         }
//                     },

//                     y:{
//                         grid:{
//                             display:false
//                         }
//                     }
//                 }
//             }
//         }
//     );
// }