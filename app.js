var cardBg;
var currentEditCard;
function editPost(btn) {
    var card = btn.parentNode.parentNode
    var title = card.children[1].children[0].innerText;
    var description = card.children[1].children[1].innerText;
    // console.log(title,description);
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    card.remove()

}

function deletePost(btn) {
    var card = btn.parentNode.parentNode
    var title = card.children[1].children[0];
    // console.log(title,description);
    card.remove()
}

function post() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var posts = document.getElementById("posts");

    if (title.trim() && description.trim()) {
        posts.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4">
    <div class="card mt-3" style="width: 18rem;">
                    <img src="${cardBg || 'images/1.jfif'}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <button class="btn btn-primary" onclick="editPost(this)">Edit</button>
                        <button class="btn btn-primary" onclick="deletePost(this)">Delete</button>
                    </div>
                </div>
                </div>`
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Title & description can't be empty!",
        });
    }

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
}

function createPost() {
    document.getElementById("postBox").style.display = "block";
}
function hidePost() {
    document.getElementById("postBox").style.display = "none";
}
function pageSignup(){
    document.getElementById("pageSignup").style.display = "none";
}
function register() {
    var fullName = document.getElementById("userName").value;
    var cellNumb = document.getElementById("cellNumb").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("inputPassword5").value;

    if (
        fullName.trim() === "" ||
        cellNumb.trim() === "" ||
        email.trim() === "" ||
        password.trim() === ""
    ) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "All fields are required!"
        });
    }

    // email check
    if (!email.includes("@") || !email.includes(".")) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Enter a valid email"
        });
        return;
    }

    // password check
    if (password.length < 8) {
        Swal.fire({
            icon: "error",
            title: "Weak Password",
            text: "Minimum 8 characters required"
        });
        return;
    }

    Swal.fire({
        title: "Done",
        icon: "success"
    });

    document.getElementById("posts").style.display = "flex";
    document.getElementById("pageSignup").style.display = "none";
}

function selectImg(src) {
    cardBg = src;
    // console.log(src, event.target.className);
    var bgImg = document.getElementsByClassName("bgImg");

    for (var i = 0; i < bgImg.length; i++) {
        console.log(bgImg[i].className);

        bgImg[i].className = "bgImg"
    }
    event.target.classList.add("selectedImg")
}