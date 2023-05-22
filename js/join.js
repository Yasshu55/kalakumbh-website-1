const button = document.getElementById("get-btn");
const input = document.getElementById("phone");
button.addEventListener("click", async (e) => {
  e.preventDefault();
  //   console.log(input.value);
  sessionStorage.setItem("phone", input.value);
  const response = await fetch(
    `http://localhost:80/api/v1/login/${input.value}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // if status is 200 then redirect to otp page
  if (response.status === 200) {
    window.location.href = `/pages/otp.html`;
  } else {
    alert("Please Retry");
    location.reload();
  }
});
