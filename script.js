// async function fetchCandidateData(searchTerm) {
//     try {
//         const response = await fetch(`/get_candidate_data/?search=${searchTerm}`);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching candidate data:', error);
//     }
// }

// async function convertToPDF() {
//     const searchTerm = document.getElementById('searchInput').value;
//     const candidateData = await fetchCandidateData(searchTerm);

//     // Initialize jsPDF
//     const doc = new jsPDF();

//     // Add content to PDF
//     let y = 20;
//     candidateData.forEach(candidate => {
//         doc.text(20, y, `Application Number: ${candidate.application_number}`);
//         doc.text(20, y + 10, `Name: ${candidate.name}`);
//         doc.text(20, y + 20, `Exam Score: ${candidate.score}`);
//         y += 40; // Adjust vertical spacing as needed
//     });

//     // Save the PDF
//     doc.save('candidates_scores.pdf');
// }
// Sample candidate data (replace with actual data)
const candidates = [
    { name: 'Candidate 1', rollNumber: '001', score: 85, details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis dolor et erat convallis, vel congue lacus pretium.' },
    { name: 'Candidate 2', rollNumber: '002', score: 72, details: 'Sed vitae magna non mi bibendum efficitur. Proin dignissim auctor nisi nec elementum.' },
    // Add more candidate data as needed
];

// Function to populate the table with candidate data
function populateTable() {
    const tableBody = document.querySelector('#candidateTable tbody');
    tableBody.innerHTML = '';
    
    candidates.forEach(candidate => {
        const row = `
            <tr>
                <td>${candidate.name}</td>
                <td>${candidate.rollNumber}</td>
                <td>${candidate.score}</td>
                <td><button onclick="generateDetailsPDF('${candidate.name}', '${candidate.rollNumber}', ${candidate.score}, '${candidate.details}')">Get Details</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Function to generate PDF with full details of the selected candidate
function generateDetailsPDF(name, rollNumber, score, details) {
    const doc = new jsPDF();
    doc.text(20, 20, `Name: ${name}`);
    doc.text(20, 30, `Roll Number: ${rollNumber}`);
    doc.text(20, 40, `Score: ${score}`);
    doc.text(20, 50, `Details: ${details}`);
    doc.save(`${name}_details.pdf`);
}

// Populate the table when the page loads
populateTable();

// script.js

async function generateDetailsPDF(identifier) {
    try {
        const response = await fetch(`/get_candidate_details/?identifier=${identifier}`);
        const data = await response.json();
        
        const doc = new jsPDF();
        doc.text(20, 20, `Name: ${data.name}`);
        doc.text(20, 30, `Roll Number: ${data.roll_number}`);
        doc.text(20, 40, `Score: ${data.score}`);
        doc.text(20, 50, `Details: ${data.details}`);
        doc.save(`${data.name}_details.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}
