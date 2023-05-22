window.onload = async () => {
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
      sessionStorage.setItem("token", token);
      console.log("received token");
      window.location.href = "/pages/signup.html";
    } else if (response.status === 200) {
      console.log(`redirecting to chat page and the response is: ${response}`);
      const auth_header = response.headers.get("Authorization");
      const token = auth_header.split(" ")[1];
      sessionStorage.setItem("token", token);
      console.log("received token");
      window.location.href = "/pages/chat.html";
    } else if (response.status === 401) {
      alert("Wrong OTP. Please try again.");
      window.location.href = "/pages/join.html";
    } else if (response.status === 402) {
      alert("OTP expired. Please request a new OTP.");
      window.location.href = "/pages/join.html";
    } else {
      alert("An error occurred. Please try again later.");
      window.location.href = "/pages/join.html";
    }
  });
};