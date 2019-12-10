function cleanElement(el) {
  el.nextElementSibling.innerHTML = "";
}
function getXmlHttpRequest(el) {
  console.log("Request started.");
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
  console.log("Fetching data.")
}