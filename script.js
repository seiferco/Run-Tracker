// ====================== EDIT RUN SECTION ======================
const editRunModal = document.getElementById("editRunModal");
const editCloseBtn = document.getElementById("editCloseBtn");
const editRunForm = document.getElementById("editRunForm");

// Array to store all runs
const runs = [
    { name: 'Run 1', distance: '5 miles', start: 'My House', stop: 'Trader Joes' },
    { name: 'Run 2', distance: '2 miles', start: 'Avery Park', stop: 'Dixon Recreation Center' }
];

// To keep track of which run is being edited
let selectedRunIndex = null;

// Function to set up event listeners for each run
function setupRunEventListeners() {
    document.querySelectorAll('.run').forEach((run, index) => {
        run.onclick = function() {
            selectedRunIndex = index; // Set the index of the selected run
            const selectedRun = runs[index];
            document.getElementById('name').value = selectedRun.name;
            document.getElementById('distance').value = selectedRun.distance.replace(' miles', '');
            document.getElementById('start').value = selectedRun.start;
            document.getElementById('stop').value = selectedRun.stop;

            clearConfirmation(); // Clear previous confirmation
            editRunModal.style.display = "block";
        };
    });
}

// Initial setup for the existing runs
setupRunEventListeners();

// Close the modal
editCloseBtn.onclick = function() {
    editRunModal.style.display = "none";
}

// Function to display confirmation dialog
function confirmEdit() {
    const editSubmitBtn = document.getElementById("editSubmitBtn");

    // Clear previous confirmation buttons and warning
    clearConfirmation();

    const confirmBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");
    const warning1 = document.createElement("p");

    warning1.style.color = "red";
    warning1.style.textAlign = "center";
    confirmBtn.style.marginRight = "10px";
    cancelBtn.style.marginLeft = "10px";

    warning1.innerText = "Are you sure you want to update this run? This will overwrite the current values.";
    confirmBtn.innerText = "Confirm";
    cancelBtn.innerText = "Cancel";

    editSubmitBtn.innerText = "";

    editSubmitBtn.appendChild(confirmBtn);
    editSubmitBtn.appendChild(cancelBtn);
    editRunForm.appendChild(warning1);

    // Return a promise to handle user choice
    return new Promise((resolve) => {
        confirmBtn.onclick = function() {
            resolve(true); // User confirmed
        }
        cancelBtn.onclick = function() {
            resolve(false); // User canceled
        }
    });
}

// Clear any existing confirmation elements
function clearConfirmation() {
    const editSubmitBtn = document.getElementById("editSubmitBtn");
    editSubmitBtn.innerHTML = "Submit"; // Reset button text
    const warning = editRunForm.querySelector("p");
    if (warning) warning.remove();
}

// Handle form submission to update the run details
editRunForm.onsubmit = async function(event) {
    event.preventDefault(); // Prevent form submission

    const updatedRun = {
        name: document.getElementById('name').value,
        distance: document.getElementById('distance').value + ' miles',
        start: document.getElementById('start').value,
        stop: document.getElementById('stop').value
    };

    // Confirm that the user actually wants to update this run
    const choice = await confirmEdit(); // Wait for user response
    if (!choice) {
        editRunModal.style.display = "none"; // Close modal if canceled
        return;
    }

    // Update the run data in the array
    runs[selectedRunIndex] = updatedRun;

    // Update the displayed run information
    const runElements = document.querySelectorAll('.run');
    const runToUpdate = runElements[selectedRunIndex];
    runToUpdate.querySelector('.name').innerText = updatedRun.name;
    runToUpdate.querySelector('.distance').innerText = updatedRun.distance;
    runToUpdate.querySelector('.start').innerText = updatedRun.start;
    runToUpdate.querySelector('.end').innerText = updatedRun.stop;

    editRunModal.style.display = "none"; // Close modal
    clearConfirmation(); // Reset confirmation UI
}

// ====================== ADD NEW RUN SECTION ======================
const newRunButton = document.getElementById("newRunButton");
const newRunModal = document.getElementById("newRunModal");
const newCloseBtn = document.getElementById("newCloseBtn");
const newRunForm = document.getElementById("newRunForm");

newRunButton.onclick = function() {
    newRunModal.style.display = "block";
}

newCloseBtn.onclick = function() {
    newRunModal.style.display = "none";
}

newRunForm.onsubmit = function(event) {
    event.preventDefault();
    const newRun = {
        name: document.getElementById("newName").value,
        distance: document.getElementById("newDistance").value + ' miles',
        start: document.getElementById("newStart").value,
        stop: document.getElementById("newStop").value
    };

    // Add new run to list of runs
    runs.push(newRun);

    const listOfRuns = document.getElementById("list-of-runs");
    const newRunDiv = document.createElement("div");
    newRunDiv.classList.add("run");

    // Create and set new html tags to user entered information
    let newName = document.createElement("h2");
    newName.innerHTML = `========= <span class='name'>${newRun.name}</span> =========`;

    let newDistance = document.createElement("p");
    newDistance.innerHTML = `<span class="runFeature">Distance: </span> <span class="distance">${newRun.distance}</span>`;

    let newStart = document.createElement("p");
    newStart.innerHTML = `<span class="runFeature">Start: </span> <span class="start">${newRun.start}</span>`;

    let newStop = document.createElement("p");
    newStop.innerHTML = `<span class="runFeature">End: </span> <span class="end">${newRun.stop}</span>`;

    let formatting = document.createElement("h2");
    formatting.innerHTML = `========================`;

    // Add new html to div
    newRunDiv.appendChild(newName);
    newRunDiv.appendChild(newDistance);
    newRunDiv.appendChild(newStart);
    newRunDiv.appendChild(newStop);
    newRunDiv.appendChild(formatting);

    // Add new div to page
    listOfRuns.appendChild(newRunDiv);

    // Clear form
    document.getElementById("newName").value = '';
    document.getElementById("newDistance").value = '';
    document.getElementById("newStart").value = '';
    document.getElementById("newStop").value = '';

    newRunModal.style.display = "none";

    // Set up event listener for the new run
    setupRunEventListeners();
}





// function displayQuote(data1) {
//     const quoteBody = document.createElement('h2')

//     // Set the text of the h2 element to the fetched quote
//     quoteBody.textContent = `"${data1[0].q}" - ${data1[0].a}`;

//     // Append the h2 element to the body of the document
//     document.body.appendChild(quoteBody);
// }