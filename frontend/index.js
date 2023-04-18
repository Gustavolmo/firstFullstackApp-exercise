function showContacts() {
  fetch("/contacts")
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let contactName = data[i].name;
        let contactNumber = data[i].number;
        let textSpace = document.createElement("p");
        textSpace.textContent = contactName + " - " + contactNumber;

        let list = document.getElementById("contact-list");
        let tempDiv = document.createElement("div");
        tempDiv.classList = "tempDiv";

        let delButton = document.createElement("button");
        delButton.classList = "del";
        delButton.textContent = "X";
        delButton.addEventListener("click", function () {
          const tempDivDel = this.parentElement;
          tempDivDel.remove();

          fetch("/contacts/" + contactName, {
            method: "DELETE",
          });
        });

        textSpace.appendChild(delButton);
        tempDiv.appendChild(textSpace);
        list.appendChild(tempDiv);
      }
    });
}
showContacts();

function addFunction(name, number) {
  name = document.getElementById("name").value;
  number = document.getElementById("number").value;

  fetch("/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      number: number,
    }),
  }).then((res) => res.json());
  location.reload();
}
