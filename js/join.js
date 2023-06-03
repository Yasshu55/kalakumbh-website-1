document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const prefill_response = await fetch(
      "https://kalakumbh-server.kalakumbh.org/api/v1/prefill",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (prefill_response.status === 200) {
      const prefill_data = await prefill_response.json();
      if (prefill_data["user_data"]["groups"]) {
        window.location.href = "/pages/chat.html";
      } else if (prefill_data["user_data"]["role"]) {
        window.location.href = "/pages/category.html";
      } else if (prefill_data["user_data"]["email"]) {
        window.location.href = "/pages/roles.html";
      } else if (prefill_data["user_data"]["phone"]) {
        window.location.href = "/pages/signup.html";
      }
      // const phoneNo = localStorage.getItem("phone");
    }
  }
});

const button = document.getElementById("get-btn");
const input = document.getElementById("phone");
input.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    // Check if the pressed key is the enter key
    e.preventDefault();
    button.click(); // Trigger the click event for the button
  }
});

button.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log(input.value);
  localStorage.setItem("phone", input.value);
  const response = await fetch(
    `https://kalakumbh-server.kalakumbh.org/api/v1/login/${input.value}`,
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
