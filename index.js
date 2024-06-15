document.addEventListener('DOMContentLoaded', (event) => {
    // Get references to the form and the table body where records will be displayed
    const form = document.getElementById('registration-form');
    const recordsTableBody = document.getElementById('records-table-body');

    // Function to save records to local storage
    function saveToLocalStorage(records) {
        localStorage.setItem('studentRecords', JSON.stringify(records));
    }

    // Function to load records from local storage
    function loadFromLocalStorage() {
        const records = JSON.parse(localStorage.getItem('studentRecords')) || [];
        return records;
    }

    // Function to add a row to the table for a given student
    function addRow(student) {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" onclick="editRow(this)">Edit</button>
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </td>
        `;

        recordsTableBody.appendChild(newRow);
    }

    // Function to refresh the table by loading all records from local storage and displaying them
    function refreshTable() {
        recordsTableBody.innerHTML = '';
        const records = loadFromLocalStorage();
        records.forEach(student => addRow(student));
    }

    // Function to edit a row in the table
    window.editRow = function(button) {
        const row = button.parentNode.parentNode;
        const cells = row.getElementsByTagName('td');

        // Populate the form fields with the current values from the row
        document.getElementById('student-name').value = cells[0].innerText;
        document.getElementById('student-id').value = cells[1].innerText;
        document.getElementById('email-id').value = cells[2].innerText;
        document.getElementById('contact-no').value = cells[3].innerText;

        // Remove the row from the table and update local storage
        row.remove();
        saveToLocalStorage(loadFromLocalStorage().filter(student => student.id !== cells[1].innerText));
    }

    // Function to delete a row in the table
    window.deleteRow = function(button) {
        const row = button.parentNode.parentNode;
        const cells = row.getElementsByTagName('td');
        row.remove();
        saveToLocalStorage(loadFromLocalStorage().filter(student => student.id !== cells[1].innerText));
    }

    // Add an event listener for the form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const studentName = document.getElementById('student-name').value;
        const studentId = document.getElementById('student-id').value;
        const emailId = document.getElementById('email-id').value;
        const contactNo = document.getElementById('contact-no').value;

        // Validate the form fields
        if (!/^[a-zA-Z\s]+$/.test(studentName)) {
            alert('Student Name must contain only letters.');
            return;
        }

        if (!/^\d+$/.test(studentId)) {
            alert('Student ID must contain only numbers.');
            return;
        }

        if (!/^\d+$/.test(contactNo)) {
            alert('Contact No must contain only numbers.');
            return;
        }

        // Create a new student object
        const student = {
            name: studentName,
            id: studentId,
            email: emailId,
            contact: contactNo
        };

        // Add the new student to the table and update local storage
        addRow(student);
        const records = loadFromLocalStorage();
        records.push(student);
        saveToLocalStorage(records);

        // Reset the form fields
        form.reset();
    });

    // Load and display the records when the page is loaded
    refreshTable();
});
