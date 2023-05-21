const phone = sessionStorage.getItem("phone");
const token = sessionStorage.getItem("token");

const btn = document.getElementById("button");
btn.addEventListener("click", async (e) => {
  console.log("clicked");
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
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
      "Authorization": `Bearer ${token}`,
    
    },
    body: JSON.stringify({ profile: profile }),
  });
  if (response.status === 200) {
    const data = await response.json();
    window.location.href = "/pages/roles.html";
  }
});
