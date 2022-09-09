const trendingData = document.getElementsByClassName('trendingData')[0];
const handleData = document.getElementsByClassName('handleData')[0];
const photography = document.getElementById('photography');
const nature = document.getElementById('nature');
const food = document.getElementById('food');
const job = document.getElementById('job');

function createPost(data, dataFor) {
  dataFor.textContent = '';
  data.post.map((ele) => {
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
    likes.setAttribute('class', 'fa-regular fa-heart');
    spanLike.appendChild(likes);

    infoDiv.append(postTitle, spanLike);
    postDiv.append(postImg, infoDiv);
    dataFor.appendChild(postDiv);
  });
}

fetch('/posts', {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
}).then((res) => res.json()).then((data) => createPost(data, handleData))
  .catch((err) => console.log(err));

fetch('/trending', {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
}).then((res) => res.json()).then((data) => createPost(data, trendingData))
  .catch((err) => console.log(err));

function fetchByCategory(category) {
  fetch(`/posts/${category}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((res) => res.json())
    .then((data) => createPost(data, handleData))
    .catch((err) => console.log(err));
}
food.addEventListener('click', () => { fetchByCategory('Food'); });
nature.addEventListener('click', () => { fetchByCategory('Nature'); });
photography.addEventListener('click', () => { fetchByCategory('Photography'); });
job.addEventListener('click', () => { fetchByCategory('Job'); });
