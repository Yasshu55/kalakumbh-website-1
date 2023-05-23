document.addEventListener("DOMContentLoaded", async () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    const response = await fetch("http://localhost/api/v1/prefill", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      sessionStorage.setItem("userData", JSON.stringify(data));
      //   const name = data["firstName"];
      //   const uid = data["_id"];
      const role = data["role"];
      groupNames = ["global"];
      if (role === "organizer") {
        groupNames.push("organizer");
      } else {
        const cats = [...Object.keys(data["user_data"]["categories"])];
        groupNames = groupNames.concat(cats);
      }
      console.log(groupNames);
      const chatList = document.getElementById("chat-list");
      groupNames.forEach((groupName) => {
        const group = document.createElement("div");
        group.innerHTML = `<div id="chat-group" class="my-2 bg-gradient-to-r from-[#af19bb] via-[#af19dd] to-[#af19bb] p-2 justify-center flex-col border border-gray-700 rounded-lg cursor-pointer ">
            <p id="group-name" class="text-xl text-center font-semibold pointer-events-none">${groupName}</p>
            
        </div>`;
        chatList.appendChild(group);
      });
    }
  }
});

window.onload = function () {
  const session_data = JSON.parse(sessionStorage.getItem("userData"));
  console.log(session_data);
  const uid = session_data["user_data"]["_id"];
  console.log(uid);
  //   Filling the Chat Box
  const chatList = document.querySelectorAll("#chat-group");
  chatList.forEach((chatGroup) => {
    chatGroup.addEventListener("click", async (e) => {
      const targetGroup = e.target;
      const groupName = targetGroup.querySelector("#group-name").innerText;
      const messageNav = document.getElementById("message-nav");
      messageNav.innerHTML = groupName;
      const response = await fetch(
        `http://localhost/api/v1/chat/fetch?group_name=${groupName}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            contentType: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const responsedata = await response.json();
        console.log(responsedata);
        const groupMessages = responsedata["messages"];
        const messageBox = document.getElementById("message-box");
        messageBox.innerHTML = "";
        groupMessages.forEach((message) => {
          const messageBubble = document.createElement("div");
          messageBubble.id = "message";
          messageBubble.classList.add("flex", "my-2");
          console.log(message["message"]);
          if (message["user_id"] !== uid) {
            messageBubble.classList.add("justify-start");
            messageBubble.innerHTML = `<div class="right-0 p-2 bg-[#af19ff] border rounded-lg max-w-xl w-fit">
              <p class="text-sm text-gray-200 font-normal">${message["sender_name"]}</p>
                <p class="w-fit">${message["message"]}</p>
                <span class="text-xs text-gray-200 font-normal">${message["sent_time"]}</span>
            </div>`;
          } else if (message["user_id"] === uid) {
            messageBubble.classList.add("justify-end");
            messageBubble.innerHTML = `<div class="right-0 p-2 bg-gray-200 border rounded-lg max-w-xl w-fit">
                <p class="text-sm text-[#af19ff] font-normal">${message["sender_name"]}</p>
                <p class="w-fit text-gray-800">${message["message"]}</p>
                const sentTime = new Date(message["sent_time"]).toLocaleTimeString();
            </div>`;
          }
          messageBox.appendChild(messageBubble);
        });
        console.log("yay messages received");
      }
    });
  });

  // Sending Messages
  const sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", async (e) => {
    const messageNav = document.getElementById("message-nav");
    const groupName = messageNav.innerText;
    const messageInput = document.getElementById("message-input");
    console.log(messageInput.value);
    const user_message = messageInput.value.trim();
    console.log(typeof user_message);
    if (groupName !== "Welcome to Chat" && user_message !== "") {
      const messageBox = document.getElementById("message-box");
      const sent_time = new Date().toISOString();
      const response = await fetch("http://localhost/api/v1/chat/send", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          group_name: groupName,
          message: user_message,
          user_id: uid,
          sent_time: sent_time,
        }),
      });
      if (response.status === 200) {
        const responsedata = await response.json();
        console.log(responsedata);
        const messageBubble = document.createElement("div");
        messageBubble.id = "message";
        messageBubble.classList.add("flex", "my-2", "justify-end");
        messageBubble.innerHTML = `<div class="right-0 p-2 bg-gray-200 border rounded-lg max-w-xl w-fit">
                <p class="w-fit text-gray-800">${messageInput.value}</p>
                <span class="text-xs text-gray-700 font-normal">${sent_time}</span>
            </div>`;
        messageBox.appendChild(messageBubble);
        messageInput.value = "";
      }
    } else {
      console.log("no groups");
    }
  });
};
