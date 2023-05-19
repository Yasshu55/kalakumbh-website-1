const phone = sessionStorage.getItem("phone");

const button = document.getElementById("verify-btn");
const input = document.getElementById("otp");
button.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log(input.value);
  const response = await fetch(`http://localhost/api/v1/login/${phone}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ otp: input.value }),
  });
  if (response.status === 200) {
    const data = await response.json();
    token = data.token;
    sessionStorage.setItem("token", token);
    window.location.href = "/pages/singup.html";    
  }
});
