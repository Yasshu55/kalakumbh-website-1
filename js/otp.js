window.onload = async () => {
  console.log(location.href);
  // history.pushState(null, null, location.href);
  
  // window.addEventListener('popstate', function(event) {
  //   console.log("back button pressed");
  //   // Push the state again to stay on the same page
  //   history.pushState({
  //     state: location.href,
  //     title: document.title,
  //     url: location.href,
  //   }, null, location.href);
  //   event.preventDefault();
  // });
  const token = localStorage.getItem("token");
  const phoneNo = localStorage.getItem("phone");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const categories = localStorage.getItem("categories");
  
  
  if(categories && role && token && phoneNo && email ){
    console.log("redirecting to chat page");
    window.location.href = "/pages/chat.html";
  }
  else if(!categories && role && token && phoneNo && email ){
    console.log("redirecting to category page");
    window.location.href = "/pages/category.html";
  }
  else if(!role&& token && phoneNo && email){
    console.log("redirecting to roles page");
     window.location.href = "/pages/roles.html";
  }
  else if( !email && token && phoneNo){
    console.log("redirecting to signup page");
     window.location.href = "/pages/signup.html";
  }
  
  const phone = localStorage.getItem("phone");
  const button = document.getElementById("verify-btn");
  const input = document.getElementById("otp");
  button.addEventListener("click", async (e) => {
    console.log("button clicked");
    e.preventDefault();
    console.log(input.value);
    console.log(phone);
    if(phone === null){
      alert("Please enter a phone number");
      window.location.href = "/pages/join.html";
    }
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
