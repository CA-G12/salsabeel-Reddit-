const posts = document.getElementsByClassName('posts')[0];
const craft = document.getElementsByClassName('craft')[0];
const craft2 = document.getElementsByClassName('craft')[1];
const imageUrl = document.getElementById('imageUrl');
const coverUrl = document.getElementById('coverUrl');
const userName = document.getElementById('username');
const photography = document.getElementById('photography');
const nature = document.getElementById('nature');
const food = document.getElementById('food');
const job = document.getElementById('job');
const param = window.location.href.lastIndexOf('/') === 29 || window.location.href.lastIndexOf('/') === 39;
const paramPart = window.location.href[40] || window.location.href[30];
craft.addEventListener('click', () => {
  window.location.href = '/';
});
craft2.addEventListener('click', () => {
  window.location.href = '/';
});
function fetchByLikeByPost(endpoint, postId) {
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(postId),
  })
    .then((res) => res.json());
}

function createPost(data) {
  if (data.length !== 0) {
    posts.textContent = '';
    data.map((ele) => {
      const postDiv = document.createElement('div');
      postDiv.setAttribute('class', 'postDiv');

      const postImg = document.createElement('img');
      postImg.setAttribute('class', 'postImg');
      postImg.src = ele.imageurl;

      const infoDiv = document.createElement('div');
      infoDiv.setAttribute('class', 'infoDiv');

      const postTitle = document.createElement('h3');
      postTitle.setAttribute('class', 'postTitle');
      postTitle.textContent = ele.title;

      const spanLike = document.createElement('span');
      spanLike.textContent = ele.like;

      const likes = document.createElement('i');
      likes.classList.add('fa-heart');
      fetchByLikeByPost('/userAction', { postId: ele.id })
        .then((action) => {
          if (action.actions.length > 0 && action.actions[0].liked) {
            likes.classList.add('fa-solid');
          } else {
            likes.classList.add('fa-regular');
          }
        })
        .catch((err) => console.log(err));
      spanLike.appendChild(likes);
      spanLike.addEventListener('click', () => {
        if (likes.classList.contains('fa-regular')) {
          spanLike.textContent = ActionIncreaseHandler(spanLike.textContent);
          likes.classList.remove('fa-regular');
          likes.classList.add('fa-solid');
          likes.style.color = '#10CA65';
          fetchByLikeByPost('/userLike', { postId: ele.id, newLike: 1 });
          spanLike.appendChild(likes);
        } else {
          spanLike.textContent = ActionDecreaseHandler(spanLike.textContent);
          likes.classList.remove('fa-solid');
          likes.classList.add('fa-regular');
          likes.style.color = '#3f3c41';
          fetchByLikeByPost('/userLike', { postId: ele.id, newLike: 0 });
          spanLike.appendChild(likes);
        }
        window.location.reload();
      });

      spanLike.appendChild(likes);
      infoDiv.append(postTitle, spanLike);
      if (!param) {
        const deleteIcon = document.createElement('i');
        deleteIcon.setAttribute('class', 'fa-sharp fa-solid fa-trash');
        deleteIcon.addEventListener('click', (event) => {
          if (confirm('Are you sure ?')) {
            fetch('/deletePost', {
              method: 'DELETE',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ postId: ele.id }),
            }).then((data) => { console.log(data.done); })
              .catch(console.log);
          }
        });
        infoDiv.append(deleteIcon);
      }
      postDiv.append(postImg, infoDiv);
      posts.appendChild(postDiv);
    });
  } else {
    const NoPosts = document.createElement('img');
    NoPosts.setAttribute('class', 'NoPosts');
    NoPosts.src = '../assets/noPost.png';
    posts.appendChild(NoPosts);
  }
}
function ActionIncreaseHandler(actionType) {
  return ++actionType;
}
function ActionDecreaseHandler(actionType) {
  return --actionType;
}

function handleUserInfo(data) {
  const { username, imageurl, coverurl } = data.info[0];
  imageUrl.src = imageurl;
  coverUrl.src = coverurl;
  userName.textContent = username;
}
if (param) {
  fetch(`/user/${paramPart}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((res) => res.json())
    .then((data) => handleUserInfo(data))
    .catch((err) => console.log(err));
} else {
  fetch('/user', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((res) => res.json())
    .then((data) => handleUserInfo(data))
    .catch((err) => console.log(err));
}

if (param) {
  fetch(`/userPosts/${paramPart}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((res) => res.json())
    .then((data) => createPost(data.posts))
    .catch((err) => console.log(err));
} else {
  fetch('/userPosts', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((res) => res.json())
    .then((data) => createPost(data.posts))
    .catch((err) => console.log(err));
}
function fetchByCategory(category) {
  fetch(`/posts/${category}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => createPost(data, handleData))
    .catch((err) => console.log(err));
}
food.addEventListener('click', () => { fetchByCategory('Food'); });
nature.addEventListener('click', () => { fetchByCategory('Nature'); });
photography.addEventListener('click', () => { fetchByCategory('Photography'); });
job.addEventListener('click', () => { fetchByCategory('Job'); });