async function check() {
  const token = localStorage.getItem("token");
  if (token) {
    const prefill_response = await fetch(
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
    const prefill_data = await prefill_response.json();
    if (prefill_data["user_data"]["groups"]) {
      window.location.href = "/pages/chat.html";
    } else if (prefill_data["user_data"]["role"]) {
      window.location.href = "/pages/category.html";
    } else if (prefill_data["user_data"]["email"]) {
      window.location.href = "/pages/roles.html";
    } else if (prefill_data["user_data"]["phone"]) {
      window.location.href = "/pages/signup.html";
    }
  }
}
check();
