// let categoryObj = {};

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM loaded");
  const token = localStorage.getItem("token");


  if (token) {
    const prefillResponse = await fetch(
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

    const prefilldata = await prefillResponse.json();
    if (prefillResponse.status === 200) {
      if (prefilldata["user_data"]["groups"]) {
        window.location.href = "/pages/chat.html";
      } else if (prefilldata["user_data"]["role"]) {
        // console.log("already prefilled");
        // localStorage.setItem("userData", JSON.stringify(prefilldata));
        // window.location.href = "/pages/chat.html";
        const data = await fetch(
          "https://kalakumbh-server.kalakumbh.org/api/v1/profile/categories",
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let categoryObj = await data.json();
        console.log(categoryObj);
        // categoryObj = {
        //   instrumentalist: ["tabla", "veena", "guitar", "keyboard"],
        //   "music producer": ["executive", "technical", "artist"],
        //   rapper: ["old school", "jazz", "rap rock", "crunk", "emo rap", "drill"],
        //   singer: ["hindustani", "carnatic", "western", "folk"],
        //   "sound engineer": [
        //     "recording engineer",
        //     "mixing engineer",
        //     "mastering engineer",
        //     "live sound engineer",
        //     "multimedia engineer",
        //   ],
        // };
        const categorydiv = document.getElementById("categories");
        for (const category in categoryObj) {
          const dropdownele = document.createElement("div");
          dropdownele.id = "dropdown";
          // dropdown button
          const dropdownbuttonele = document.createElement("div");
          dropdownbuttonele.id = "dropdownbutton";
          dropdownbuttonele.classList.add(
            "relative",
            "cursor-pointer",
            "p-2",
            "rounded-xl",
            "m-2",
            "bg-[#af19ff]",
            "text-black",
            "font-bold",
            "text-xl",
            "flex",
            "justify-center",
            "items-center"
          );
          dropdownbuttonele.innerHTML = `<span class="pointer-events-none">${category}</span><svg class=" pointer-events-none w-4 h-4 ml-2"
        aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7">
        </path>
        </svg>`;
          dropdownele.appendChild(dropdownbuttonele);
          // dropdown menu
          const dropdownmenuele = document.createElement("div");
          dropdownmenuele.id = "dropdownmenu";
          dropdownmenuele.classList.add(
            "fixed",
            "z-50",
            "bg-white",
            "rounded-xl",
            "hidden",
            "font-semibold",
            "text-[#af19ff]"
          );
          const ul = document.createElement("ul");
          const subcats = categoryObj[category];
          subcats.forEach((sc) => {
            const li = document.createElement("li");
            li.classList.add(
              "flex",
              "bg-white",
              "rounded-xl",
              "items-center",
              "p-2"
            );
            li.innerHTML = `<input id="${sc}" type="checkbox" value="${sc}"
            class="w-4 h-4 bg-gray-100 border-gray-300 rounded">
            <label for="${sc}" class="ml-2">${sc}</label>`;
            ul.appendChild(li);
            console.log("appending");
          });
          dropdownmenuele.appendChild(ul);
          dropdownele.appendChild(dropdownmenuele);
          categorydiv.appendChild(dropdownele);
        }
      } else if (prefilldata["user_data"]["email"]) {
        window.location.href = "/pages/roles.html";
      } else if (prefilldata["user_data"]["phone"]) {
        window.location.href = "/pages/signup.html";
      } else {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/pages/join.html";
    }
  } else {
    window.location.href = "/pages/join.html";
  }

  const script = document.createElement("script");
  script.src = "../js/category-afterload.js";
  script.async = true;
  document.head.appendChild(script);
});
