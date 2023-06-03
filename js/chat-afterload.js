// window.onload = function () {
const local_data = JSON.parse(localStorage.getItem("userData"));
// console.log(local_data);
const uid = local_data["user_data"]["_id"];

// console.log(uid);
//   Filling the Chat Box
const chatList = document.querySelectorAll("#chat-group");
chatList.forEach((chatGroup) => {
  chatGroup.addEventListener("click", async (e) => {
    console.log("chat clicked");
    const messageBox = document.getElementById("message-box");
    messageBox.innerHTML = "";

    const targetGroup = e.target;
    const groupName = targetGroup.querySelector("#group-name").innerText;
    const messageNav = document.getElementById("message-nav");
    messageNav.innerHTML = groupName;
    const response = await fetch(
      `https://kalakumbh-server.kalakumbh.org/api/v1/chat/fetch?group_name=${groupName}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          contentType: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      const responsedata = await response.json();
      // console.log(responsedata);
      const groupMessages = responsedata["messages"];
      groupMessages.forEach((message) => {
        const messageBubble = document.createElement("div");
        messageBubble.id = "message";
        messageBubble.classList.add("flex", "my-2");
        // console.log(message["message"]);
        const sentTime = new Date(message["sent_time"]).toLocaleTimeString();
        if (message["user_id"] !== uid) {
          messageBubble.classList.add("justify-start");
          messageBubble.innerHTML = `<div class="right-0 p-2 bg-[#af19ff] border rounded-lg max-w-xl w-fit">
                <p class="text-sm text-gray-200 font-normal">${message["sender_name"]}</p>
                  <p class="w-fit">${message["message"]}</p>
                  <span class="text-xs text-gray-200 font-normal">${sentTime}</span>
              </div>`;
        } else if (message["user_id"] === uid) {
          messageBubble.classList.add("justify-end");
          messageBubble.innerHTML = `<div class="right-0 p-2 bg-gray-200 border rounded-lg max-w-xl w-fit">
                  <p class="text-sm text-[#af19ff] font-normal">${message["sender_name"]}</p>
                  <p class="w-fit text-gray-800">${message["message"]}</p>
                  <span class="text-xs text-gray-700 font-normal">${sentTime}</span>                
              </div>`;
        }
        messageBox.appendChild(messageBubble);
      });
      // console.log("yay messages received");
    }
  });
});

// Sending Messages
const messageInput = document.getElementById("message-input");
messageInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    // Check if the pressed key = Enter key
    e.preventDefault();
    sendButton.click(); // Trigger the click event for the send button
  }
});
const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", async (e) => {
  const messageNav = document.getElementById("message-nav");
  const groupName = messageNav.innerText.toLowerCase();
  //   console.log(groupName);
  const messageInput = document.getElementById("message-input");

  const user_message = messageInput.value.trim();
  // console.log(typeof user_message);
  if (groupName !== "Welcome to Chat" && user_message !== "") {
    const messageBox = document.getElementById("message-box");
    const sent_time = new Date().toISOString();
    const response = await fetch(
      "https://kalakumbh-server.kalakumbh.org/api/v1/chat/send",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          group_name: groupName,
          message: user_message,
          user_id: uid,
          sent_time: sent_time,
        }),
      }
    );

    if (response.status === 200) {
      const sentTime = new Date(sent_time).toLocaleTimeString();
      const responsedata = await response.json();
      // console.log(responsedata);
      const messageBubble = document.createElement("div");
      const name =
        local_data["user_data"]["firstName"] +
        " " +
        local_data["user_data"]["lastName"];
      messageBubble.id = "message";
      messageBubble.classList.add("flex", "my-2", "justify-end");
      messageBubble.innerHTML = `<div class="right-0 p-2 bg-gray-200 border rounded-lg max-w-xl w-fit">
          <p class="text-sm text-[#af19ff] font-normal">${name}</p>
                  <p class="w-fit text-gray-800">${messageInput.value}</p>
                  <span class="text-xs text-gray-700 font-normal">${sentTime}</span>
              </div>`;
      messageBox.appendChild(messageBubble);
      messageInput.value = "";
    }
  } else {
    // console.log("no groups");
  }
});
// };
