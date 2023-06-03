const token = localStorage.getItem("token");
const roleBtns = document.querySelectorAll("#role-btn");

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
      } else if(prefill_data["user_data"]["email"]){
          roleBtns.forEach((roleBtn) => {
            roleBtn.addEventListener("click", async (event) => {
              const div = event.target;
              const role = div.querySelector("#role-value").textContent;
          
              console.log(`sending this data token:${token} and role:${role}`);
              const response = await fetch("https://kalakumbh-server.kalakumbh.org/api/v1/profile/role", {
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
      else if (!prefill_data["user_data"]["email"] && prefill_data["user_data"]["phone"]) {
        window.location.href = "/pages/signup.html";
      }
      else{
        window.location.href = "/pages/join.html";
      }
    }
  }
  check()


}
else {
  window.location.href = "/pages/join.html";
}
