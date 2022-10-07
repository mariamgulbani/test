let name = document.getElementById("name").value;
let surname = document.getElementById("surname").value;
let email = document.getElementById("email").value;
let phone = document.getElementById("phone").value;
function getAdd(){
     name = document.getElementById("name").value;
     surname = document.getElementById("surname").value;
     email = document.getElementById("email").value;
     phone = document.getElementById("phone").value;
    Connection.db.collection('users')
        .insertOne({
            name: `${name}`,
            surname: `${surname}`,
            email: `${email}`,
            phone: `${phone}`
        });

}
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click",getAdd);

