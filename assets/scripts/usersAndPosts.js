fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        addUsers(data);
        addDescriptionEventToUsers(data);
        fetch("https://jsonplaceholder.typicode.com/users/1/posts")
            .then(response => response.json())
            .then(posts => {
                addPostEventToUser(posts)
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
                Posts
            </button>
        </div>`;
    }
}

function addDescriptionEventToUsers(data) {
    let array = document.querySelectorAll(".offers__item");

    array.forEach((item, index) => {
        item.addEventListener("click", () => {
            $("body").addClass("overflow-hidden");
            $("#popup-background").removeClass("display-none");
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
                $("body").removeClass("overflow-hidden");
                $("#popup-background").addClass("display-none");
                document.getElementById("popup-content").innerHTML = "";
            });
        });
    });
}

function addPostEventToUser(posts) {
    let array = document.querySelectorAll(".item__button");

    array.forEach((item, index) => {
        item.addEventListener("click", e => {
            e.stopPropagation();
            $("body").addClass("overflow-hidden");
            $("#popup-background").removeClass("display-none");
            document.getElementById("popup-content").innerHTML += `
                    <p id="close-button">&times;</p>
                    <h2>
                        User ID: ${index + 1}
                    </h2>
                    `;

            posts.forEach((element, i) => {
                if (index + 1 === posts[i].userId) {
                    document.getElementById("popup-content").innerHTML += `
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
                document.getElementById("close-button").addEventListener("click", () => {
                    $("body").removeClass("overflow-hidden");
                    $("#popup-background").addClass("display-none");
                    document.getElementById("popup-content").innerHTML = "";
                });
            });
        });
    });
}