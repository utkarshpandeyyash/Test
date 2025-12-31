let votes = { A: 0, B: 0, C: 0 };

// Candidate data
const candidates = {
    A: { name: "Candidate A", img: "https://via.placeholder.com/70" },
    B: { name: "Candidate B", img: "https://via.placeholder.com/70" },
    C: { name: "Candidate C", img: "https://via.placeholder.com/70" }
};

// Vote Function (Multiple votes allowed)
function vote(candidate) {
    votes[candidate]++;
    showPopup(candidate);
}

// Show success popup
function showPopup(candidate) {
    document.getElementById("popupImg").src = candidates[candidate].img;
    document.getElementById("popupName").innerText = candidates[candidate].name;
    document.getElementById("popup").style.display = "flex";
}

// Close popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Show result ONLY when button clicked
function updateResult() {
    document.getElementById("voteA").innerText = votes.A;
    document.getElementById("voteB").innerText = votes.B;
    document.getElementById("voteC").innerText = votes.C;

    let total = votes.A + votes.B + votes.C;
    document.getElementById("totalVotes").innerText = total;

    let maxVotes = Math.max(votes.A, votes.B, votes.C);
    let winner = "No votes yet";

    if (maxVotes > 0) {
        if (votes.A === maxVotes) winner = "Candidate A";
        if (votes.B === maxVotes) winner = "Candidate B";
        if (votes.C === maxVotes) winner = "Candidate C";
    }

    document.getElementById("winner").innerText = "🏆 Winner: " + winner;
    document.getElementById("result").style.display = "block";
}
