const phone = localStorage.getItem("phone");
const token = localStorage.getItem("token");
// const url_data = new URL(window.location);  // Get the URL data
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

// const token = localStorage.getItem("token");
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

if(token){
  const btn = document.getElementById("button");
  const fnameInput = document.getElementById("fname");
  const lnameInput = document.getElementById("lname");
  const emailInput = document.getElementById("email");


  // Add event listeners to input fields for the "keypress" event
  fnameInput.addEventListener("keypress", handleKeyPress);
  lnameInput.addEventListener("keypress", handleKeyPress);
  emailInput.addEventListener("keypress", handleKeyPress);



  //   const btn = document.getElementById("button");
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
      const fname = document.getElementById("fname").value;
      const lname = document.getElementById("lname").value;
      const email = document.getElementById("email").value;
      }
    else{
      location.reload();
    }
      
      if(fname === "" || lname === "" || email === ""){
        alert("Please enter all the details");
        return;
      }
    
      localStorage.setItem("email", email);
      const profile = {
        firstName: fname,
        lastName: lname,
        email: email,
        phone: phone,
      };
    
      
      // send token in the authorisation headers
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
    else if (response.status === 498) {
      window.location.href = "/pages/join.html";
    }
  }
)
} else {
  window.location.href = "/pages/join.html";
}


