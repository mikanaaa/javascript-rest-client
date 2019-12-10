function cleanElement(el) {
  el.nextElementSibling.innerHTML = "";
}
function getXmlHttpRequest(el) {
  console.log("Request started.");
  cleanElement(el.nextElementSibling);
  let request = new XMLHttpRequest();
  request.open("get", "https://jsonplaceholder.typicode.com/albums");
  request.onreadystatechange = function(e) {
    if (request.readyState === 4 && request.status === 200) {
      let responseText = request.responseText;
      let responseObject = JSON.parse(responseText);
      for (const album of responseObject) {
        let li = document.createElement("li");
        li.innerText = `${album["userId"]} ${album["id"]} ${album["title"]}`;
        el.nextElementSibling.nextElementSibling.appendChild(li);
      }
    }
  };
  request.send();
}
function getFetch(el) {
  console.log("Fetching data.");
  cleanElement(el.nextElementSibling);
  let id = document.querySelector("#fetch-id").value;
  let baseUrl = "https://jsonplaceholder.typicode.com/users";
  fetch(`${baseUrl}?id=${id}`)
    .then(response => response.json())
    .then(users => {
      for (user of users) {
        let li = document.createElement("li");
        li.innerHTML = user.name;
        el.nextElementSibling.nextElementSibling.appendChild(li);
      }
    });
}
$(document).ready(() => {
  $("#getJquery").on("click", () => {
    $.get(
      "https://jsonplaceholder.typicode.com/photos?id="+$("#jquery-id").val(),
      (data, status) => {
        let li = document.createElement("li");
        let p = document.createElement("p");
        p.innerText = data[0].title;
        li.appendChild(p);
        let img = document.createElement("img");
        img.src = data[0].thumbnailUrl;
        li.appendChild(img);
        $("#jquery-list").prepend(li);
      }
    );
  });
});
