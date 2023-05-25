const button = document.getElementById("get-btn");
const input = document.getElementById("phone");

input.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") { // Check if the pressed key is the enter key
    e.preventDefault();
    button.click(); // Trigger the click event for the button
  }
});

button.addEventListener("click", async (e) => {
  e.preventDefault();
  //   console.log(input.value);
  localStorage.setItem("phone", input.value);
  const response = await fetch(`http://localhost/api/v1/login/${input.value}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // if status is 200 then redirect to otp page
  if (response.status === 200) {
    window.location.href = `/pages/otp.html`;
  } else {
    alert("Please Retry");
    location.reload();
  }
});
