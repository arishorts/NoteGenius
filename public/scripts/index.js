const tipForm = document.getElementById("tip-form");
const tipsContainer = document.getElementById("tip-container");

const createCard = (note) => {
  // Create card
  const cardEl = document.createElement("div");
  cardEl.classList.add("card", "mb-3");
  cardEl.setAttribute("key", note.id);

  // Create card header
  const cardHeaderEl = document.createElement("h4");
  cardHeaderEl.classList.add(
    "card-header",
    "bg-primary",
    "text-light",
    "p-2",
    "m-0"
  );
  cardHeaderEl.innerHTML = `${note.name} </br>`;

  // Create card body
  const cardBodyEl = document.createElement("div");
  cardBodyEl.classList.add("card-body", "bg-light", "p-2");
  cardBodyEl.innerHTML = `<p>${note.info}</p>`;

  // Append the header and body to the card element
  cardEl.appendChild(cardHeaderEl);
  cardEl.appendChild(cardBodyEl);

  // Append the card element to the tips container in the DOM
  tipsContainer.appendChild(cardEl);
};

// Get a list of existing tips from the server
const getNotes = () =>
  fetch("api/notes", {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error:", error);
    });

// Post a new tip to the page
const postNote = (note) =>
  fetch("api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data);
      createCard(note);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

// When the page loads, get all the tips
getNotes().then((data) => data.forEach((note) => createCard(note)));

// Function to handle when a user submits the feedback form
const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log("Form submit invoked");

  // Get the value of the tip and save it to a variable
  const inpotInfo = document.getElementById("tipText").value;

  // get the value of the username and save it to a variable
  const inputName = document.getElementById("tipUsername").value.trim();

  // Create an object with the tip and username
  const newNote = {
    name: inputName,
    info: inpotInfo,
  };
  // Make a fetch POST request to the server
  postNote(newNote);
};

// Listen for when the form is submitted
tipForm.addEventListener("submit", handleFormSubmit);
