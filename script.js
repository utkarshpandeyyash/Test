// Initialize votes if not present
if (!localStorage.getItem("votes")) {
    localStorage.setItem("votes", JSON.stringify({
        A: 0,
        B: 0,
        C: 0
    }));
}

// Read votes
let votes = JSON.parse(localStorage.getItem("votes"));

const candidates = {
    A: { name: "Candidate A", img: "https://via.placeholder.com/70" },
    B: { name: "Candidate B", img: "https://via.placeholder.com/70" },
    C: { name: "Candidate C", img: "https://via.placeholder.com/70" }
};

// Voting function (used on index.html)
function vote(candidate) {
    votes[candidate]++;
    localStorage.setItem("votes", JSON.stringify(votes));
    showPopup(candidate);
}

// Popup functions (used on index.html)
function showPopup(candidate) {
    document.getElementById("popupImg").src = candidates[candidate].img;
    document.getElementById("popupName").innerText = candidates[candidate].name;
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Result display function (used on result.html)
function showResult() {
    const storedVotes = JSON.parse(localStorage.getItem("votes"));

    document.querySelector(".result").style.display = "block";

    document.getElementById("voteA").textContent = storedVotes.A;
    document.getElementById("voteB").textContent = storedVotes.B;
    document.getElementById("voteC").textContent = storedVotes.C;

    const total = storedVotes.A + storedVotes.B + storedVotes.C;
    document.getElementById("totalVotes").textContent = total;

    let maxVotes = Math.max(storedVotes.A, storedVotes.B, storedVotes.C);
    let winners = [];

    if (storedVotes.A === maxVotes && maxVotes > 0) winners.push("Candidate A");
    if (storedVotes.B === maxVotes && maxVotes > 0) winners.push("Candidate B");
    if (storedVotes.C === maxVotes && maxVotes > 0) winners.push("Candidate C");

    document.getElementById("winner").textContent =
        winners.length === 0
            ? "No votes yet"
            : "🏆 Winner: " + winners.join(" & ");
}

