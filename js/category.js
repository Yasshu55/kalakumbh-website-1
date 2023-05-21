let categoryObj = {};
document.addEventListener("DOMContentLoaded", async () => {
  const token = sessionStorage.getItem("token");
  console.log(token);
  if (token) {
    const data = await fetch("http://localhost/api/v1/profile/categories", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    categoryObj = await data.json();
  } else {
    window.location.href = "/pages/join.html";
  }
  //   categoryObj = {
  //     instrumentalist: ["tabla", "veena", "guitar", "keyboard"],
  //     "music producer": ["executive", "technical", "artist"],
  //     rapper: ["old school", "jazz", "rap rock", "crunk", "emo rap", "drill"],
  //     singer: ["hindustani", "carnatic", "western", "folk"],
  //     "sound engineer": [
  //       "recording engineer",
  //       "mixing engineer",
  //       "mastering engineer",
  //       "live sound engineer",
  //       "multimedia engineer",
  //     ],
  //   };
  const categorydiv = document.getElementById("categories");
  for (const category in categoryObj) {
    const dropdownele = document.createElement("div");
    dropdownele.id = "dropdown";
    // dropdown button
    const dropdownbuttonele = document.createElement("dropdownbutton");
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
    const dropdownmenuele = document.createElement("dropdownmenu");
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
      li.classList.add("flex", "bg-white", "rounded-xl", "items-center", "p-2");
      li.innerHTML = `<input id="${sc}" type="checkbox" value="${sc}"
                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded">
                        <label for="${sc}" class="ml-2">${sc}</label>`;
      ul.appendChild(li);
    });
    dropdownmenuele.appendChild(ul);
    dropdownele.appendChild(dropdownmenuele);
    categorydiv.appendChild(dropdownele);
  }
});

window.onload = function () {
  const btns = document.querySelectorAll("#dropdownbutton");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const div = e.target.parentElement;
      const dropdownmenu = div.querySelector("#dropdownmenu");
      console.log(dropdownmenu);
      handleMenus(dropdownmenu);
      if (dropdownmenu.classList.contains("hidden")) {
        dropdownmenu.classList.remove("hidden");
      } else {
        dropdownmenu.classList.add("hidden");
      }
    });
  });

  const submitbtn = document.getElementById("submitbtn");
  submitbtn.addEventListener("click", async () => {
    const categorydiv = document.getElementById("categories");
    const clist = categorydiv.querySelectorAll("#dropdown");
    let categoryObj = {};
    clist.forEach((c) => {
      const category = c.querySelector("#dropdownbutton>span").innerText;
      const subcats = c
        .querySelector("#dropdownmenu>ul")
        .querySelectorAll("li");
      categoryObj[category] = [];
      subcats.forEach((sc) => {
        const checkbox = sc.querySelector("input");
        if (checkbox.checked) {
          categoryObj[category].push(checkbox.value);
        }
      });
    });
    console.log(categoryObj);
    // alert("yay u are signed up");
    // window.location.href = "/pages/chat.html";
    const body = { categories: {} };
    for (const category in categoryObj) {
      if (categoryObj[category].length > 0) {
        body["categories"][category] = categoryObj[category];
      }
    }
    const token = sessionStorage.getItem("token");
    console.log(body);
    const response = await fetch("http://localhost/api/v1/profile/categories", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status === 200) {
      window.location.href = "/pages/chat.html";
    }
  });
};

const handleMenus = (targetdiv) => {
  const dropdownmenus = document.querySelectorAll("#dropdownmenu");
  dropdownmenus.forEach((d) => {
    if (d !== targetdiv && !d.classList.contains("hidden"))
      d.classList.add("hidden");
  });
};
