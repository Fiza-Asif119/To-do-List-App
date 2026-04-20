var cardBg;

// _____________________________________________________________CREATE POST
function post() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;

    if (title.trim() && description.trim()) {

        var postObj = {
            title: title,
            description: description,
            image: cardBg || "images/1.jfif"
        };

        var allPosts = JSON.parse(localStorage.getItem("posts")) || [];

        allPosts.push(postObj);
        // allPosts.unshift(postObj);

        localStorage.setItem("posts", JSON.stringify(allPosts));

        showPosts();

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        cardBg = null;

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Title & description can't be empty!",
        });
    }
}

// _______________________________________________________________ SHOW POSTS FUNCTION
function showPosts() {
    var posts = document.getElementById("posts");
    var allPosts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.innerHTML = "";

    //_________________________________ always show container
    posts.style.display = "flex";

    if (allPosts.length === 0) {
        posts.innerHTML = "<p class='text-center'>No posts yet</p>";
        return;
    }

    for (var i = 0; i < allPosts.length; i++) {
        posts.innerHTML += `
        <div class="col-sm-12 col-md-6 col-lg-4">
            <div class="card mt-3" style="width: 18rem;">
                <img src="${allPosts[i].image}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${allPosts[i].title}</h5>
                    <p class="card-text">${allPosts[i].description}</p>
                    <button class="btn btn-primary" onclick="editPost(${i})">Edit</button>
                    <button class="btn btn-primary" onclick="deletePost(${i})">Delete</button>
                </div>
            </div>
        </div>`;
    }
}

// _____________________________________________________________DELETE POST
function deletePost(index) {
    var allPosts = JSON.parse(localStorage.getItem("posts")) || [];

    allPosts.splice(index, 1);

    localStorage.setItem("posts", JSON.stringify(allPosts));

    showPosts();
}

//____________________________________________________________ EDIT POST
function editPost(index) {
    var allPosts = JSON.parse(localStorage.getItem("posts")) || [];

    document.getElementById("title").value = allPosts[index].title;
    document.getElementById("description").value = allPosts[index].description;

    allPosts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(allPosts));

    showPosts();
    createPost();
}

// ___________________________________________________________SHOW POST BOX
function createPost() {
    document.getElementById("postBox").style.display = "block";
}

// __________________________________________________________HIDE POST BOX
function hidePost() {
    document.getElementById("postBox").style.display = "none";
}

// ____________________________________________________________REGISTER
function register() {
    var fullName = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("inputPassword5").value;

    if (!fullName || !email || !password) {
        Swal.fire("Error", "All fields required", "error");
        return;
    }

    var userObj = {
        name: fullName,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(userObj));

    Swal.fire("Registered!", "Now login", "success");

    showLogin();
}

// _______________________________________________________________LOGIN
function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    var user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
        localStorage.setItem("isLoggedIn", "true");

        document.getElementById("pageLogin").style.display = "none";
        document.getElementById("posts").style.display = "flex";

        document.getElementById("authText").style.display = "none";

        Swal.fire("Welcome!", "Login successful", "success");
    } else {
        Swal.fire("Error", "Invalid credentials", "error");
    }
}

// __________________________________________________________LOGOUT
function logout() {
    localStorage.setItem("isLoggedIn", "false");

    document.getElementById("posts").style.display = "none";
    document.getElementById("pageSignup").style.display = "block";

    // 🔥 show auth text again
    document.getElementById("authText").style.display = "block";
}

// ____________________________________________________________SWITCH PAGES
function showLogin() {
    document.getElementById("pageSignup").style.display = "none";
    document.getElementById("pageLogin").style.display = "block";
    document.getElementById("authText").style.display = "block";
}

function showSignup() {
    document.getElementById("pageSignup").style.display = "block";
    document.getElementById("pageLogin").style.display = "none";
    document.getElementById("authText").style.display = "block";
}

// _____________________________________________________________SELECT IMAGE
function selectImg(src, element) {
    cardBg = src;

    var bgImg = document.getElementsByClassName("bgImg");

    for (var i = 0; i < bgImg.length; i++) {
        bgImg[i].classList.remove("selectedImg");
    }

    element.classList.add("selectedImg");
}

// ________________________________________________________________CHECK USER ON LOAD
if (localStorage.getItem("isLoggedIn") === "true") {
    document.getElementById("pageSignup").style.display = "none";
    document.getElementById("pageLogin").style.display = "none";
    document.getElementById("posts").style.display = "flex";
    document.getElementById("authText").style.display = "none";
} else {
    if (localStorage.getItem("user")) {
        document.getElementById("pageSignup").style.display = "none";
        document.getElementById("pageLogin").style.display = "block";
        document.getElementById("authText").style.display = "block";
    }
}

// __________LOAD POSTS
showPosts();