document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const categories = localStorage.getItem("categories");

  if (token) {
    const response = await fetch(
      "https://kalakumbh-server.kalakumbh.org/api/v1/prefill",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("userData", JSON.stringify(data));
      //   const name = data["firstName"];
      //   const uid = data["_id"];
      if (data["user_data"]["groups"]) {
        const role = data["user_data"]["role"];

        // console.log(role);
        groupNames = ["global"];
        if (role === "organizer") {
          groupNames.push("organizer");
        } else {
          if (!data["user_data"]["categories"]) {
            window.location.href = "/";
          }
          const cats = [...Object.keys(data["user_data"]["categories"])];
          groupNames = groupNames.concat(cats);
        }
        // console.log(groupNames);
        const chatList = document.getElementById("chat-list");
        groupNames.forEach((groupName) => {
          const group = document.createElement("div");
          group.innerHTML = `<div id="chat-group" class="my-2 bg-gradient-to-r from-[#af19bb] via-[#af19dd] to-[#af19bb] p-2 justify-center flex-col border border-gray-700 rounded-lg cursor-pointer ">
            <p id="group-name" class="text-xl text-center font-semibold pointer-events-none">${groupName}</p>
            
        </div>`;
          chatList.appendChild(group);
        });
      } else if (data["user_data"]["role"]) {
        window.location.href = "/pages/category.html";
      } else if (data["user_data"]["email"]) {
        window.location.href = "/pages/roles.html";
      } else if (prefill_data["user_data"]["phone"]) {
        window.location.href = "/pages/signup.html";
      }
    } else {
      window.location.href = "/pages/join.html";
    }
  } else {
    window.location.href = "/pages/join.html";
  }

  const script = document.createElement("script");
  script.src = "../js/chat-afterload.js";
  script.async = true;
  document.head.appendChild(script);
});

const signoutBtn = document.getElementById("signout-button");
signoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/pages/join.html";
});
