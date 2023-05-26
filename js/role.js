const token = localStorage.getItem("token");
const roleBtns = document.querySelectorAll("#role-btn");
const phone = localStorage.getItem("phone");
const email = localStorage.getItem("email");

// window.addEventListener("beforeunload", async (event) => {
//   console.log("beforeunload "+event.target.location.href);
  
//   if(!token || !phone){
//     window.location.href = "pages/join.html";
//   } else if(!token){
//     window.location.href = "pages/otp.html";
//   }
//   else {
//     window.location.href = "pages/chat.html";
//   }
// });


if(token && phone && email){

roleBtns.forEach((roleBtn) => {
  roleBtn.addEventListener("click", async (event) => {
    const div = event.target;
    const role = div.querySelector("#role-value").textContent;
    localStorage.setItem("role", role);
    console.log(`sending this data token:${token} and role:${role}`);
    const response = await fetch("http://localhost/api/v1/profile/role", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: role.toLowerCase() }),
    });

    if (response.status === 200) {
      const data = await response.json();
      const token = data["token"];
      localStorage.setItem("token", token);

      if (role === "organizer") {
        window.location.href = "pages/chat.html";
      }
      window.location.href = "/pages/category.html";
    } 
    else if (response.status === 498) {
      window.location.href = "/pages/join.html";
    }
  });
});
}
 else if(!email && phone && token){
  window.location.href = "/pages/signup.html";
 }
else {
  window.location.href = "/pages/join.html";
}
