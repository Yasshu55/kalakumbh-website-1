const button = document.getElementById("get-btn");
const input = document.getElementById("phone");
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
