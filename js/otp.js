window.onload = async () => {

  const token = localStorage.getItem("token");  
  const phone = localStorage.getItem("phone");
  const button = document.getElementById("verify-btn");
  const input = document.getElementById("otp");

  async function check() {
    if (token) {
      const prefill_response = await fetch("http://localhost/api/v1/prefill", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
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
    }
  }
  check()
  


  button.addEventListener("click", async (e) => {
    console.log("button clicked");
    e.preventDefault();
    console.log(input.value);
    console.log(phone);
    const response = await fetch(`http://localhost/api/v1/login/${phone}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: input.value }),
    });
    const data = await response.json();
    if (response.status === 201) {
      console.log(`redirecting to signup page oh new user and data is ${data}`);
      console.log(data);
      console.log(response.headers.has("Authorization"));
      // for (var pair of response.headers.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }
      // const auth_header = response.headers.get("Authorization");
      const token = data["token"];
      localStorage.setItem("token", token);
      console.log("received token");
      window.location.href = "/pages/signup.html";
    } else if (response.status === 200) {
      const token = data["token"];
      localStorage.setItem("token", token);
      console.log("received token");
      window.location.href = "/pages/chat.html";
    } else if (response.status === 401) {
      alert("Wrong OTP. Please try again.");
      location.reload(); // Refresh the page for resubmission
    } else if (response.status === 402) {
      alert("OTP expired. Please request a new OTP.");
      window.location.href = "/pages/join.html";
    } 
    else if (response.status === 498) {
      alert("Error occurred. Please try again.");
      window.location.href = "/pages/join.html";
    }
    else {
      alert("An error occurred. Please try again.");
      window.location.href = "/pages/join.html";
    }
  });

  // OTP expiration timer
  // const otpExpirationTime = 90; // 90 seconds
  // setTimeout(() => {
  //   alert("OTP expired. Redirecting to join page.");
  //   window.location.href = "/pages/join.html";
  // }, otpExpirationTime * 1000);
};
