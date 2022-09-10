const trendingData = document.getElementsByClassName('trendingData')[0];
const handleData = document.getElementsByClassName('handleData')[0];
const photography = document.getElementById('photography');
const nature = document.getElementById('nature');
const food = document.getElementById('food');
const job = document.getElementById('job');
const addPOST = document.getElementById('addPOST');
const popDiv = document.getElementsByClassName('popDiv')[0];
const closepop = document.getElementsByClassName('closepop')[0];
const sectionPost = document.getElementById('sectionPost');

closepop.addEventListener('click', () => {
  popDiv.style.display = 'none';
});
function fetchByCategory(category) {
  fetch(`/posts/${category}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => createPost(data, handleData))
    .catch((err) => console.log(err));
}

function fetchByLikeByPost(endpoint, postId) {
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(postId),
  })
    .then((res) => res.json());
}

function userAction(data, actionType) {
  if (data.actions.length !== 0) {
    if (data.actions[0].likes) {
      actionType.classList.add('fa-solid');
    }
  } else {
    actionType.classList.add('fa-regular');
  }
}

function createPost(data, dataFor) {
  dataFor.textContent = '';

  data.post.map((ele) => {
    const postDiv = document.createElement('div');
    postDiv.setAttribute('class', 'postDiv');

    const postImg = document.createElement('img');
    postImg.setAttribute('class', 'postImg');
    postImg.src = ele.imageurl;
    postImg.addEventListener('click',()=>{postInfo(ele.id)});

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

    spanLike.addEventListener('click', () => {
      alert('you must login');
    });

    infoDiv.append(postTitle, spanLike);
    postDiv.append(postImg, infoDiv);
    dataFor.appendChild(postDiv);
  });
}

fetch('/posts', {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
})
  .then((res) => res.json())
  .then((data) => createPost(data, handleData))
  .catch((err) => console.log(err));

fetch('/trending', {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
})
  .then((res) => res.json())
  .then((data) => createPost(data, trendingData))
  .catch((err) => console.log(err));

function postInfo(postId) {
  sectionPost.style.display = 'block';
  popDiv.style.display = 'block';
  sectionPost.textContent = '';

  cretinPost(postId).then((data) => {
    const userDiv = document.createElement('div');
    userDiv.setAttribute('class', 'userDiv');

    const userImage = document.createElement('img');
    userImage.setAttribute('class', 'userImages');
    userImage.src = data.post[0].imageuser;

    const userName = document.createElement('a');
    userName.href = `/profile/${data.post[0].userid}`;
    userName.textContent = data.post[0].username;

    const infoDiv = document.createElement('div');
    const contentPop = document.createElement('p');
    contentPop.textContent = data.post[0].content;

    const imgContent = document.createElement('img');
    imgContent.textContent = data.post[0].imagepost;
    imgContent.setAttribute('class', 'imgContent');

    const actionDiv = document.createElement('div');
    actionDiv.setAttribute('class', 'actionDiv');

    const likespan = document.createElement('span');
    likespan.textContent = data.post[0].like;
    const likes = document.createElement('i');
    likes.setAttribute('class', 'fa-regular fa-heart');

    const ratespan = document.createElement('span');
    ratespan.textContent = data.post[0].like;

    const rates = document.createElement('span');
    rates.textContent = 'votes';

    const hr = document.createElement('hr');

    ratespan.appendChild(rates);
    likespan.appendChild(likes);
    actionDiv.append(likespan, ratespan);
    userDiv.append(userImage, userName);
    infoDiv.append(contentPop, actionDiv, hr);
    sectionPost.append(userDiv, infoDiv);
  }).catch((err) => console.log(err));
}
function cretinPost(postId) {
  return fetch('/cretinPost', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ postId }),
  }).then((res) => res.json());
}

food.addEventListener('click', () => { fetchByCategory('Food'); });
nature.addEventListener('click', () => { fetchByCategory('Nature'); });
photography.addEventListener('click', () => { fetchByCategory('Photography'); });
job.addEventListener('click', () => { fetchByCategory('Job'); });
addPOST.addEventListener('click', () => { alert('you must login'); });
