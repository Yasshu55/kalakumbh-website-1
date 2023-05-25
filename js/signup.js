const phone = localStorage.getItem("phone");
const token = localStorage.getItem("token");

const btn = document.getElementById("button");
const fnameInput = document.getElementById("fname");
const lnameInput = document.getElementById("lname");
const emailInput = document.getElementById("email");

// Add event listeners to input fields for the "keypress" event
fnameInput.addEventListener("keypress", handleKeyPress);
lnameInput.addEventListener("keypress", handleKeyPress);
emailInput.addEventListener("keypress", handleKeyPress);

// Event listener function to handle "keypress" event
function handleKeyPress(event) {
  if (event.keyCode === 13) {
    // Check if the pressed key is the enter key
    event.preventDefault();
    btn.click();
  }
}

btn.addEventListener("click", async (e) => {
  if (confirm("Are the details entered correct?")) {
    const fname = fnameInput.value;
    const lname = lnameInput.value;
    const email = emailInput.value;

    if (fname === "" || lname === "" || email === "") {
      alert("Please fill in all the input fields.");
      return;
    }


    const profile = {
      firstName: fname,
      lastName: lname,
      email: email,
      phone: phone,
    };

    const response = await fetch("http://localhost/api/v1/profile", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ profile: profile }),
    });

    if (response.status === 200) {
      const data = await response.json();
      window.location.href = "/pages/roles.html";
    }
  }
});
