// Initialize storage
if (!localStorage.getItem("votes")) {
    localStorage.setItem("votes", JSON.stringify({ A: 0, B: 0, C: 0 }));
}
if (!localStorage.getItem("hasVoted")) {
    localStorage.setItem("hasVoted", "false");
}

let votes = JSON.parse(localStorage.getItem("votes"));

// Voting (ONE vote only)
function vote(candidate) {
    if (localStorage.getItem("hasVoted") === "true") {
        alert("You have already voted!");
        return;
    }

    votes[candidate]++;
    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("hasVoted", "true");
    alert("Vote submitted successfully!");
}

// Show results
function showResult() {
    const v = JSON.parse(localStorage.getItem("votes"));

    document.getElementById("voteA").innerText = v.A;
    document.getElementById("voteB").innerText = v.B;
    document.getElementById("voteC").innerText = v.C;

    let total = v.A + v.B + v.C;
    document.getElementById("totalVotes").innerText = total;

    let max = Math.max(v.A, v.B, v.C);
    let winner = "No votes yet";

    if (max > 0) {
        if (v.A === max) winner = "Candidate A";
        if (v.B === max) winner = "Candidate B";
        if (v.C === max) winner = "Candidate C";
    }

    document.getElementById("winner").innerText = "🏆 Winner: " + winner;
}

// Reset with secret code
function resetVotes() {
    let code = prompt("Enter admin code:");

    if (code === "admin123") {
        localStorage.setItem("votes", JSON.stringify({ A: 0, B: 0, C: 0 }));
        localStorage.setItem("hasVoted", "false");
        alert("Voting reset successful!");
        location.reload();
    } else {
        alert("Wrong code!");
    }
}
function verifyUser() {
    let userId = prompt("Enter User ID:");
    let password = prompt("Enter Password:");

    // Demo credentials (for project)
    if (userId === "user001" && password === "vote123") {
        localStorage.setItem("hasVoted", "false");
        alert("✅ Verification successful! You can vote again.");

        // Enable buttons
        const buttons = document.querySelectorAll(".candidate-box button");
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        });

    } else {
        alert("❌ Invalid User ID or Password");
    }
}

