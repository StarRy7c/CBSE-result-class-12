document.addEventListener('DOMContentLoaded', function() {
    const resultForm = document.getElementById('resultForm');
    const resultDisplaySection = document.getElementById('resultDisplaySection');

    // Display current date in footer
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = today.toLocaleDateString('en-IN', options) + ' ' + today.toLocaleTimeString('en-IN');


    resultForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const studentName = document.getElementById('studentNameInput').value.trim();
        const rollNumber = document.getElementById('rollNumberInput').value.trim();
        const dob = document.getElementById('dobInput').value;

        if (!studentName || !rollNumber || !dob) {
            alert("Please fill in all fields.");
            return;
        }

        // Format DOB for display
        const dobDate = new Date(dob);
        const formattedDOB = `${dobDate.getDate().toString().padStart(2, '0')}/${(dobDate.getMonth() + 1).toString().padStart(2, '0')}/${dobDate.getFullYear()}`;

        // Display student details
        document.getElementById('displayName').textContent = studentName.toUpperCase();
        document.getElementById('displayRollNo').textContent = rollNumber;
        document.getElementById('displayDOB').textContent = formattedDOB;

        // --- Generate Dummy Marks ---
        const subjects = [
            { code: "301", name: "ENGLISH CORE", theoryMax: 80, practicalMax: 20 },
            { code: "042", name: "PHYSICS", theoryMax: 70, practicalMax: 30 },
            { code: "043", name: "CHEMISTRY", theoryMax: 70, practicalMax: 30 },
            { code: "041", name: "MATHEMATICS", theoryMax: 80, practicalMax: 20 },
            { code: "044", name: "BIOLOGY", theoryMax: 70, practicalMax: 30 }
            // You can add/remove/change subjects here
        ];

        const marksTableBody = document.getElementById('marksTableBody');
        marksTableBody.innerHTML = ''; // Clear previous results

        let totalObtained = 0;
        let grandTotalMaxMarks = 0;

        subjects.forEach(subject => {
            // Generate random marks (making sure they are plausible)
            // Theory marks: ensure minimum passing (e.g., 25% of theoryMax) up to 95% of theoryMax
            // Practical marks: usually higher, e.g., 60% of practicalMax up to practicalMax
            const minTheoryPass = Math.ceil(subject.theoryMax * 0.20); // Lower chance to fail individual theory
            const theoryMarks = Math.floor(Math.random() * (subject.theoryMax * 0.75 - minTheoryPass + 1)) + minTheoryPass;
            
            const minPracticalMarks = Math.ceil(subject.practicalMax * 0.50);
            const practicalMarks = Math.floor(Math.random() * (subject.practicalMax - minPracticalMarks + 1)) + minPracticalMarks;
            
            const subjectTotal = theoryMarks + practicalMarks;
            totalObtained += subjectTotal;
            grandTotalMaxMarks += (subject.theoryMax + subject.practicalMax);

            // Dummy positional grade (not strictly CBSE but for visual)
            let grade = "D";
            const subjectPercentage = (subjectTotal / (subject.theoryMax + subject.practicalMax)) * 100;
            if (subjectPercentage >= 90) grade = "A1";
            else if (subjectPercentage >= 80) grade = "A2";
            else if (subjectPercentage >= 70) grade = "B1";
            else if (subjectPercentage >= 60) grade = "B2";
            else if (subjectPercentage >= 50) grade = "C1";
            else if (subjectPercentage >= 40) grade = "C2";
            else if (subjectPercentage < 33) grade = "E (NEEDS IMPROVEMENT)";


            const row = marksTableBody.insertRow();
            row.insertCell().textContent = subject.code;
            row.insertCell().textContent = subject.name;
            row.insertCell().textContent = theoryMarks;
            row.insertCell().textContent = practicalMarks;
            row.insertCell().textContent = subjectTotal;
            row.insertCell().textContent = grade;
        });

        document.getElementById('totalMarksObtained').textContent = totalObtained;
        document.getElementById('grandTotalMarks').textContent = grandTotalMaxMarks;

        const overallPercentage = (totalObtained / grandTotalMaxMarks) * 100;
        document.getElementById('overallPercentage').textContent = overallPercentage.toFixed(2);

        const finalResultStatusElement = document.getElementById('finalResultStatus');
        const funnyMessageElement = document.getElementById('funnyMessage');
        funnyMessageElement.textContent = ''; // Clear previous funny message
        finalResultStatusElement.className = ''; // Clear previous result class

        if (overallPercentage < 40) {
            finalResultStatusElement.textContent = "NEEDS IMPROVEMENT";
            finalResultStatusElement.classList.add("FAIL"); // Style for fail

            const funnyMessages = [
                "Oops! Looks like your marks decided to play hide & seek... and they're expert hiders! Time for the 'belt treatment' from elders? 😂",
                "Your marks are currently on a solo trip to 'Below 40 Land'. Maybe send a study guide as a rescue map? 😉 Better luck next time!",
                "Houston, we have a... situation. These marks need a rocket boost! Prepare for re-entry into Study Mode. 🚀 Traditional motivation might be incoming!",
                "The 40% boss level was a bit too spicy this time! Time to grind more XP (Xtra Practice!). A family 'pep talk' might be scheduled. 😅",
                "Warning: Marks are too low! Activate emergency study protocol. And maybe hide the remote, the elders might suggest 'alternative' revision techniques! 😂"
            ];
            funnyMessageElement.textContent = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        } else {
            finalResultStatusElement.textContent = "PASS";
            finalResultStatusElement.classList.add("PASS"); // Style for pass
             if (overallPercentage >= 90) {
                funnyMessageElement.textContent = "Excellent! Topper in the making!";
            } else if (overallPercentage >= 75) {
                funnyMessageElement.textContent = "Great job! Keep it up!";
            } else if (overallPercentage >= 60) {
                funnyMessageElement.textContent = "Well done! Good effort!";
            } else {
                 funnyMessageElement.textContent = "You made it! Onwards and upwards!";
            }
        }

        resultDisplaySection.style.display = 'block';
        resultDisplaySection.scrollIntoView({ behavior: 'smooth' }); // Scroll to show results
    });
});

                         
