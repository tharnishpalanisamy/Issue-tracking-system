const API = 'http://localhost:3000/issues';


//dashboard
async function fetchStatistics() {
    let data = await fetch(API);
    let issues = await data.json();

    let totalCount = 0;
    let resolvedCount = 0;
    let progressCount = 0;
    let openCount = 0;

    issues.forEach(issue => {
        totalCount++;

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