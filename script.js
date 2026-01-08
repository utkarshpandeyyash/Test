// Initialize votes if not present
if (!localStorage.getItem("votes")) {
    localStorage.setItem("votes", JSON.stringify({
        A: 0,
        B: 0,
        C: 0
    }));
}

// One-vote flag
if (!localStorage.getItem("hasVoted")) {
    localStorage.setItem("hasVoted", "false");
}

let votes = JSON.parse(localStorage.getItem("votes"));

const candidates = {
    A: { name: "Candidate A", img: "https://via.placeholder.com/70" },
    B: { name: "Candidate B", img: "https://via.placeholder.com/70" },
    C: { name: "Candidate C", img: "https://via.placeholder.com/70" }
};

// 🔐 Vote function (ONE VOTE ONLY)
function vote(candidate) {
    if (localStorage.getItem("hasVoted") === "true") {
        alert("❌ You have already voted!");
        return;
    }

    votes[candidate]++;
    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("hasVoted", "true");

    disableVoteButtons();
    showPopup(candidate);
}

// Disable buttons after voting
function disableVoteButtons() {
    const buttons = document.querySelectorAll(".candidate-box button");
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.6";
        btn.style.cursor = "not-allowed";
    });
}

// Popup
function showPopup(candidate) {
    document.getElementById("popupImg").src = candidates[candidate].img;
    document.getElementById("popupName").innerText = candidates[candidate].name;
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// 🔄 Disable buttons on page load if already voted
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("hasVoted") === "true") {
        disableVoteButtons();
    }
});

// 📊 Result page logic
function showResult() {
    const storedVotes = JSON.parse(localStorage.getItem("votes"));

    // show hidden result box
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

