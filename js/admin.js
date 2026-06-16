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
    document.querySelector('.count').innerHTML = `Total Issues : ${totalCount}` 
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