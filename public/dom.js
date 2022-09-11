const trendingData = document.getElementsByClassName('trending')[0];
const handleData = document.getElementsByClassName('handleData')[0];
const photography = document.getElementById('photography');
const nature = document.getElementById('nature');
const popular = document.getElementById('popular');
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

function getTrending(data) {
  const tendingDiv = document.createElement('div');
  tendingDiv.setAttribute('class', 'trendingData');

  data.post.map((ele) => {
    const postDiv = document.createElement('div');
    postDiv.setAttribute('class', 'trendingDiv');

    const postImg = document.createElement('img');
    postImg.setAttribute('class', 'postImg');
    postImg.src = ele.imageurl;

    const postTitle = document.createElement('h3');
    postTitle.setAttribute('class', 'postTitle');
    postTitle.textContent = ele.title;

    postDiv.append(postImg, postTitle);
    tendingDiv.append(postDiv);
  });
  trendingData.append(tendingDiv);
}

function createPost(data, dataFor) {
  dataFor.textContent = '';
  data.post.map((ele) => {
    const postDiv = document.createElement('div');
    postDiv.setAttribute('class', 'postDiv');
    postInfo(ele.id, postDiv);
    dataFor.appendChild(postDiv);
  });
}
function postInfo(postId, appended) {
  cretinPost(postId).then((data) => {
    console.log(data);
    const userDiv = document.createElement('div');
    userDiv.setAttribute('class', 'userDiv');

    const userImage = document.createElement('img');
    userImage.setAttribute('class', 'userImages');
    userImage.src = data.post[0].imageuser;

    const userName = document.createElement('a');
    userName.href = `/profile/${data.post[0].userid}`;
    userName.textContent = data.post[0].username;

    const infoDiv = document.createElement('div');
    infoDiv.setAttribute('class', 'infoDiv');
    const contentPop = document.createElement('p');
    contentPop.textContent = data.post[0].content;

    const imgContent = document.createElement('img');
    imgContent.src = data.post[0].imagepost;
    imgContent.setAttribute('class', 'postImg');

    const actionDiv = document.createElement('div');
    actionDiv.setAttribute('class', 'actionDiv');

    const likespan = document.createElement('span');
    likespan.textContent = data.post[0].like;
    const likes = document.createElement('i');
    likes.setAttribute('class', 'fa-regular fa-heart');
    likes.addEventListener('click', () => {
      alert('You should Login !!');
    });

    const ratespan = document.createElement('span');
    ratespan.textContent = data.post[0].like;

    const rates = document.createElement('span');
    rates.textContent = 'votes';

    const hr = document.createElement('hr');
    ratespan.appendChild(rates);
    likespan.appendChild(likes);
    actionDiv.append(likespan, ratespan);
    userDiv.append(userImage, userName);
    infoDiv.append(contentPop, imgContent);
    appended.append(userDiv, infoDiv, actionDiv, hr);
  }).catch((err) => console.log(err));

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
  .then((data) => getTrending(data))
  .catch((err) => console.log(err));

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
