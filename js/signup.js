const phone = localStorage.getItem("phone");
const token = localStorage.getItem("token");
// const url_data = new URL(window.location);  // Get the URL data
console.log(location.href);

if(token){
  async function check() {
    if (token) {
      const prefill_response = await fetch("https://kalakumbh-server.kalakumbh.org/api/v1/prefill", {
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
      }
    }
  }
  check()

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
    const isConfirmed = confirm("Are you sure you want to submit?");
      if (isConfirmed) {
      const fname = document.getElementById("fname").value;
      const lname = document.getElementById("lname").value;
      const email = document.getElementById("email").value;

      
      if(fname === "" || lname === "" || email === ""){
        alert("Please enter all the details");
        return;
      }
    
      const profile = {
        firstName: fname,
        lastName: lname,
        email: email,
        phone: phone,
      };
    
      
      // send token in the authorisation headers
      const response = await fetch("https://kalakumbh-server.kalakumbh.org/api/v1/profile", {
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
else{
  location.reload();
  }
 }
)
} else {
  window.location.href = "/pages/join.html";
}


