// window.onload = async () => {
console.log("hello");
const btns = document.querySelectorAll("#dropdown");
console.log(btns);
btns.forEach((btn) => {
  const dropbtn = btn.querySelector("#dropdownbutton");
  // console.log("hi");
  dropbtn.addEventListener("click", (e) => {
    const div = e.target.parentElement;
    const dropdownmenu = div.querySelector("#dropdownmenu");
    console.log("this is dropdown menu: " + dropdownmenu);
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
  localStorage.setItem("categories", JSON.stringify(clist));
  let categoryObj = {};
  clist.forEach((c) => {
    const category = c.querySelector("#dropdownbutton>span").innerText;
    const subcats = c.querySelector("#dropdownmenu>ul").querySelectorAll("li");
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
  const token = localStorage.getItem("token");
  console.log(body);
  const response = await fetch(
    "https://kalakumbh-server.kalakumbh.org/api/v1/profile/categories",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();
  console.log("category-afterload data: ------ " + data);
  if (response.status === 200) {
    window.location.href = "/pages/chat.html";
  }
});

const handleMenus = (targetdiv) => {
  const dropdownmenus = document.querySelectorAll("#dropdownmenu");
  dropdownmenus.forEach((d) => {
    if (d !== targetdiv && !d.classList.contains("hidden"))
      d.classList.add("hidden");
  });
};

function preback() {
  window.history.forward();
}
setTimeout("preback()", 0);
