const instaApp = {};

instaApp.getData = () => {
  const url = new URL("https://api.unsplash.com/photos/random");
  url.search = new URLSearchParams({
    client_id: "XWzFPYvrb6ZVb9IOR8msCNBb1fbfUkD-9i6DxYYRDNA",
    count: 7,
  });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      instaApp.displayData(data);
    });
};

instaApp.displayData = (photos) => {
  photos.forEach((photo) => {
    console.log(photo);

    //story
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");
    imgContainer.innerHTML = `
    <button>
    <img src=${photo.user.profile_image.medium} alt=Photo of ${
      photo.user.username
    }/>
    </button>
    <p> ${photo.user.username.substring(0, 8)}...</p>
`;

    const storyContent = document.querySelector(".storyContent");
    storyContent.appendChild(imgContainer);

    //user post
    const userPost = document.createElement("div");
    userPost.classList.add("userPost");

    userPost.innerHTML = `
    <div class="userInfo">
      <a href="#" class="userImg">
        <div class="imgContainer">
          <img
            src=${photo.user.profile_image.medium} alt=Photo of ${photo.user.username}
          />
        </div>
        <p>${photo.user.username}</p>
      </a>
      <button aria-label="more options">
        <i class="fa-solid fa-ellipsis postIcon" aria-hidden="true"></i>
      </button>
    </div>
    <div class="postImg">
      <img
      src=${photo.urls.regular} alt=${photo.alt_description}
      />
   </div>
    `;

    const postContainer = document.querySelector(".postContainer");
    const postSettings = document.querySelector(".postSettings");
    postContainer.prepend(userPost);
  });
};

const allPost = document.querySelectorAll(".userPost");
console.log(allPost);

instaApp.init = () => {
  instaApp.getData();
};

// instaApp.init();
