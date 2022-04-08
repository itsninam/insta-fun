const instaApp = {};

instaApp.randomHour = () => {
  return Math.floor(Math.random() * 12) + 1;
};

instaApp.getData = () => {
  const url = new URL("https://api.unsplash.com/photos/random/");
  url.search = new URLSearchParams({
    client_id: "XWzFPYvrb6ZVb9IOR8msCNBb1fbfUkD-9i6DxYYRDNA",
    count: 7,
    orientation: "squarish",
  });

  fetch(url)
    .then((response) => {
      if (response.ok) {
        response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      instaApp.displayData(data);
    })
    .catch((err) => {
      if (err.message === "Not found ") {
        console.log("Not found", err);
      } else {
        console.log("Something went wrong", err);
      }
    });
};

instaApp.displayData = (photos) => {
  photos.forEach((photo) => {
    console.log(photo);

    //story
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");
    imgContainer.innerHTML = `
    <a href="${photo.user.links.html}" target="_blank" rel="noopener">
    <img src=${photo.user.profile_image.medium} alt=Photo of ${
      photo.user.username
    }/>
    </a>
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
            src=${photo.user.profile_image.medium} alt=Photo of ${
      photo.user.username
    }
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

   <div class="postSettings">
   <div class="postIcons">
     <div class="leftIcons">
       <button aria-label="like photo">
         <i
           class="fa-regular fa-heart postIcon"
           aria-hidden="true"
         ></i>
       </button>
       <button aria-label="leave a comment">
         <i
           class="fa-regular fa-comment postIcon"
           aria-hidden="true"
         ></i>
       </button>
       <button aria-label="send to other user">
         <i
           class="fa-regular fa-paper-plane postIcon"
           aria-hidden="true"
         ></i>
       </button>
     </div>
     <div class="bookmark">
       <button aria-label="bookmark post">
         <i class="fa-regular fa-bookmark postIcon"></i>
       </button>
     </div>
   </div>
   <div class="postLikes">
     <p class="like">${photo.likes} likes</p>
   </div>
   <div class="postComments">
     <p>
       <span>${photo.user.username}</span> ${photo.description}
     </p>
   </div>
   <div class="timePosted">
     <p> ${instaApp.randomHour()} hours ago</p>
   </div>
   <div class="addComment">
     <form action="">
       <button aria-label="emoticons">
         <i class="fa-regular fa-face-smile emoticonsIcon"></i>
       </button>
       <label for="postComment" class="sr-only">Add a comment</label>
       <textarea
         name="postComment"
         id="postComment"
         placeholder="Add a comment..."
       ></textarea>
       <button>Post</button>
     </form>
   </div>
 </div>
   
    `;

    const postContainer = document.querySelector(".postContainer");
    postContainer.appendChild(userPost);
  });
};

instaApp.updateLikes = () => {
  const heartIcon = document.querySelector(".postContainer");

  heartIcon.addEventListener("click", (event) => {
    const hearts = document.querySelectorAll(".fa-heart");
    hearts.forEach((heart) => {
      if (event.target.classList[1] === "fa-heart") {
        event.target.classList.toggle("fa-solid");
        event.target.classList.toggle("liked");

        const likes = document.querySelectorAll(".postLikes");

        likes.forEach((like) => {
          const num = like.innerText.substring(0, 3);
          console.log(num);
          if (event.target.classList[3] === "fa-solid") {
            const addOne = parseInt(num) + 1;
            like.innerText = `${addOne} likes`;
          } else {
            const addOne = parseInt(num) - 1;
            like.innerText = `${addOne} likes`;
          }
        });
      }
    });
  });
};

instaApp.init = () => {
  instaApp.getData();
  instaApp.updateLikes();
};

instaApp.init();
