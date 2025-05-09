document.querySelector(".dark-mode-btn").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

// Load notes on startup
window.onload = function () {
    loadNotes();
};

function saveNote() {
    let noteText = document.getElementById("noteInput").value;
    if (noteText.trim() === "") return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("noteInput").value = "";
    loadNotes();
}

function loadNotes() {
    let notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        let noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `<p>${note}</p>
            <button class="delete-btn" onclick="deleteNote(${index})">❌</button>`;
        notesContainer.appendChild(noteElement);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

// Search Notes
document.getElementById("searchBox").addEventListener("input", function () {
    let searchText = this.value.toLowerCase();
    document.querySelectorAll(".note").forEach(note => {
        note.style.display = note.innerText.toLowerCase().includes(searchText) ? "block" : "none";
    });
});