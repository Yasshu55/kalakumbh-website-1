const token = sessionStorage.getItem("token");
const roleBtns = document.querySelectorAll("#role-btn");

roleBtns.forEach((roleBtn) => {
  roleBtn.addEventListener("click", async (event) => {
    const div = event.target;
    const role = div.querySelector("#role-value").textContent;
    console.log(`sending this data token:${token} and role:${role}`);
    const response = await fetch("http://localhost/api/v1/profile/role", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, role: role }),
    });
    if (response.status != 200) {
      window.location.href = "/pages/categories.html";
    }
  });
});
