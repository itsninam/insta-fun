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

  const body = document.querySelector("body");
  const errorText = document.createElement("h2");
  errorText.classList.add("errorText");

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      instaApp.displayData(data);
      instaApp.suggestions(data);
    })
    .catch((err) => {
      if (err.message === "Not Found") {
        console.log("Not found");
        body.innerHTML = "";
        errorText.innerText = "Data Not Found. Please try again later";
        body.appendChild(errorText);
      } else {
        console.log("Something went wrong");
        body.innerHTML = "";
        errorText.innerText = "Something went wrong. Please try again later";
        body.appendChild(errorText);
      }
    });
};

instaApp.displayData = (photos) => {
  photos.forEach((photo) => {
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
       <div class="commentButtons">
          <button> ❤️ </button>
          <button> 🙌  </button>
          <button> ⨁ </button>
       </div>
     </form>
   </div>
 </div>
    `;
    const postContainer = document.querySelector(".postContainer");
    postContainer.appendChild(userPost);
  });
};

instaApp.suggestions = (suggestions) => {
  suggestions.slice(-5).forEach((suggestion) => {
    const suggestions = document.createElement("div");
    suggestions.classList.add("userImg");
    suggestions.innerHTML = `
              <div class="flexContainer">
                <div class="imgContainer">
                <a href="#">
                  <img
                  src=${suggestion.user.profile_image.medium} alt=Photo of ${suggestion.user.username}
                  />
                </a>
                </div>
                <div class="userName">
                  <a href="#">${suggestion.user.username}</a>
                  <p>Followed by ${suggestion.user.username}</p>
                </div>
                <div class="switch">
                  <a href="#">Follow</a>
                </div>
              </div>
    `;

    const suggestionsContainer = document.querySelector(".userSuggestions");
    suggestionsContainer.appendChild(suggestions);
  });
};

instaApp.updateLikes = () => {
  const heartIcon = document.querySelector(".postContainer");

  heartIcon.addEventListener("click", (event) => {
    if (event.target.classList[1] === "fa-heart") {
      event.target.classList.toggle("fa-solid");
      event.target.classList.toggle("liked");

      const likes = document.querySelectorAll(".postLikes");
      likes.forEach((like) => {
        const num = like.innerText.substring(0, 3);
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
};

instaApp.mediaQueries = () => {
  const mediaQuery = window.matchMedia("(max-width: 600px)");
  const child = document.querySelector(".storyContent").childNodes;

  mediaQuery.addEventListener("change", () => {
    if (mediaQuery.matches) {
      child[8].style.display = "none";
      child[9].style.display = "none";
      console.log("below 600");
    } else {
      child[8].style.display = "block";
      child[9].style.display = "block";
      console.log("above 600");
    }
  });
};

instaApp.mobile = () => {
  const mediaQuery = window.matchMedia("(max-width: 600px)");

  const child = document.querySelector(".storyContent");
  child.addEventListener("click", (event) => {
    console.log(event.target.childNodes);
  });
  // console.log(child.childNodes[8]);

  // if (mediaQuery.matches && e.target.classList[8] === "imgContainer") {
  //   child[8].style.display = "none";
  //   child[9].style.display = "none";
  //   console.log("below 600");
  // } else {
  //   child[8].style.display = "block";
  //   child[9].style.display = "block";
  //   console.log("above 600");
  // }
};

instaApp.init = () => {
  instaApp.getData();
  instaApp.updateLikes();
  instaApp.mediaQueries();
  instaApp.mobile();
};

instaApp.init();
