const token = localStorage.getItem("token");
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
  });
});
