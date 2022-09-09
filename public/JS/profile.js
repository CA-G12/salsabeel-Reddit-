const posts = document.getElementsByClassName('posts')[0];
const imageUrl = document.getElementById('imageUrl');
const coverUrl = document.getElementById('coverUrl');
const userName = document.getElementById('username');

function createPost(data) {
  if (data.length !== 0) {
    posts.textContent = '';
    data.map((ele) => {
      const postDiv = document.createElement('div');

      const postImg = document.createElement('img');
      postImg.setAttribute('class', 'postImg');
      postImg.src = ele.imageurl;

      const infoDiv = document.createElement('div');
      infoDiv.setAttribute('class', 'infoDiv');

      const postTitle = document.createElement('h3');
      postTitle.setAttribute('class', 'postTitle');
      postTitle.textContent = ele.title;

      const spanLike = document.createElement('span');
      spanLike.textContent = '5';

      const likes = document.createElement('i');
      likes.setAttribute('class', 'fa-regular fa-heart');
      spanLike.appendChild(likes);

      infoDiv.append(postTitle, spanLike);
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

function handleUserInfo(data) {
  const { username, imageurl, coverurl } = data.info[0];
  imageUrl.src = imageurl;
  coverUrl.src = coverurl;
  userName.textContent = username;
}

fetch('/userPosts', {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
}).then((res) => res.json())
  .then((data) => createPost(data.posts))
  .catch((err) => console.log(err));

fetch('/user', {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
}).then((res) => res.json())
  .then((data) => handleUserInfo(data))
  .catch((err) => console.log(err));
