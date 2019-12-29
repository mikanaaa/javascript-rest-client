function cleanElement(el) {
  el.nextElementSibling.innerHTML = "";
}
function getXmlHttpRequest() {
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
function getFetch() {
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
      "https://jsonplaceholder.typicode.com/photos?id=" + $("#jquery-id").val(),
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
  $("#jqueryDelete").on("click", function(){
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts/10",
      type: "DELETE",
      success: (r,s,xhr)=>{
        console.log(r)
        console.log(s)
        console.log(xhr)
      }
    });
  });
});
function getAxios() {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(function(response) {
      for (const user of response.data) {
        let li = document.createElement("li");
        li.innerText = user.address.city;
        el.nextElementSibling.nextElementSibling.appendChild(li);
      }
    });
}
function postXmlHttpRequest() {
  let request = new XMLHttpRequest();
  request.open("POST", "https://jsonplaceholder.typicode.com/posts");
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 201) {
      alert("User created");
    }
  };
  let formData = new FormData();
  formData.append("name", "bill");
  formData.append("age", "100");

  request.send(formData);
}
function putFetch(){
  let ri = {};
  ri.method = "PUT"
  ri.body = '{"name": "Will", "age": 100}';
  fetch("https://jsonplaceholder.typicode.com/posts/1",ri).then(r => r.text()).then(r => alert(`User updated: ${r}`)).catch(e=>console.log(e));
}