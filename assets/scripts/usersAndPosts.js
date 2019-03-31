fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => {
    addUsers(data);
    addDescriptionEventToUsers(data);

    fetch("https://jsonplaceholder.typicode.com/users/1/posts")
      .then(response => response.json())
      .then(posts => {
        addAllPostsEventToUser(posts);
        addNewPostEventToUser(posts);
      });
  });

function addUsers(array) {
  let usersContainer = document.getElementById("main");

  for (let i = 0; i < array.length; i++) {
    usersContainer.innerHTML += `
        <div class= "offers__item">
            <img class="item__img" src="assets/images/offer.jpg" alt="User Photo" />
            <p class="item__paragraph">
                ${array[i].name}
            </p>
            <span class="item__price">
                ${array[i].address.city}
            </span>
            <p class="item__price">
                ${array[i].email}
            </p>
            <button class="item__button">
                All Posts
            </button>
            <button class="add-post">
                New Post
            </button>
        </div>`;
  }
}

function addDescriptionEventToUsers(data) {
  let array = document.querySelectorAll(".offers__item");

  array.forEach((item, index) => {
    item.addEventListener("click", () => {
      openPopup();

      document.getElementById("popup-content").innerHTML += `
            <p id="close-button">&times;</p>
            <h1>
                Name: ${data[index].name}
            </h1>
            <p>
                Username: ${data[index].username}
            </p>
            <p>
                Email: ${data[index].email}
            </p>
            <p>
                Phone: ${data[index].phone}
            </p>
            <p>
                Website: ${data[index].website}
            </p>
            <hr>
            <h1>
                Address:
            </h1
            <hr>
            <p>
                Street: ${data[index].address.street}
            </p>
            <p>
                Suite: ${data[index].address.suite}
            </p>
            <p>
                City: ${data[index].address.city}
            </p>
            <p>
                Zipcode: ${data[index].address.zipcode}
            </p>
            <p>
                Lat: ${data[index].address.geo.lat}
            </p>
            <p>
                Lng: ${data[index].address.geo.lng}
            </p>
            <hr>
            <h1>
                Company:
            </h1>
            <p>
                Name: ${data[index].company.name}
            </p>
            <p>
                Phrase: ${data[index].company.catchPhrase}
            </p>
            <p>
                Bs: ${data[index].company.bs}
            </p>
            `;

      document.getElementById("close-button").addEventListener("click", () => {
        closePopup();
      });
    });
  });
}

function addAllPostsEventToUser(posts) {
  let buttonsArray = document.querySelectorAll(".item__button");
  let isAllButtons = true;

  addPostEvent(buttonsArray, posts, isAllButtons);
}

function addNewPostEventToUser(posts) {
  let buttonsArray = document.querySelectorAll(".add-post");
  let isAllButtons = false;

  addPostEvent(buttonsArray, posts, isAllButtons);
}

function addPostEvent(array, posts, isAllButtons) {
  array.forEach((item, index) => {
    item.addEventListener("click", e => {
      e.stopPropagation();

      openPopup();

      document.getElementById("popup-content").innerHTML += `
            <p id="close-button">&times;</p>
            <h2>
                User ID: ${index + 1}
            </h2>
            `;

      posts.forEach((element, i) => {
        if (index + 1 === posts[i].userId) {
          if (isAllButtons)
            document.getElementById(
              "popup-content"
            ).innerHTML += returnAllPostsInnerHtml(posts, i);
          else {
            document.getElementById(
              "popup-content"
            ).innerHTML = returnNewPostInnerHtml(index);

            resizeTextarea();

            document
              .getElementsByClassName("post__button")[0]
              .addEventListener("click", () => {
                if (isAnyInputEmpty($(".post__input"))) {
                  fetch("https://jsonplaceholder.typicode.com/posts", {
                    method: "POST",
                    body: JSON.stringify({
                      title: $(".post__input")[0].value,
                      body: $(".post__input")[1].value,
                      userId: index + 1
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                  })
                    .then(response => response.json())
                    .then(json => {
                      alert(`Post saved to user ${index + 1}`);
                      closePopup();
                    });
                }
              });
          }
        }
        document
          .getElementById("close-button")
          .addEventListener("click", () => {
            closePopup();
          });
      });
    });
  });
}

function openPopup() {
  $("body").addClass("overflow-hidden");
  $("#popup-background").removeClass("display-none");
}

function closePopup() {
  $("body").removeClass("overflow-hidden");
  $("#popup-background").addClass("display-none");
  document.getElementById("popup-content").innerHTML = "";
}

function returnAllPostsInnerHtml(posts, i) {
  return `
        <hr>
        <h2>
            Title: ${posts[i].title}
        </h2>
        <p>
            PostID: ${posts[i].id}
        </p>
        <p>
            Post: ${posts[i].body}
        </p>
        `;
}

function returnNewPostInnerHtml(index) {
  return `
        <p id="close-button">&times;</p>
        <h2>
            User ID: ${index + 1}
        </h2>
        <hr>
        <figure>
            <figcaption>
                <p class="new-post__description">
                    Title...
                </p>
            </figcaption>
            <textarea id="title__input" class="post__input" class="resize-text" rows="1"></textarea>
        </figure>
        <figure>
            <figcaption>
                <p class="new-post__description">
                    Share your thoughts...
                </p>
            </figcaption>
            <textarea id="body__input" class="post__input" class="resize-text" rows="3"></textarea>
        </figure>
        <button class="post__button">
            POST
        </button>
        `;
}

function resizeTextarea() {
  $("textarea").on("input", function() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
}
