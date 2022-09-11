const trendingData = document.getElementsByClassName('trending')[0];
const handleData = document.getElementsByClassName('handleData')[0];
const popDiv = document.getElementsByClassName('popDiv')[0];
const closepop = document.getElementsByClassName('closepop')[0];
const photography = document.getElementById('photography');
const nature = document.getElementById('nature');
const food = document.getElementById('food');
const job = document.getElementById('job');
const addPOST = document.getElementById('addPOST');
const inputsPost = document.getElementById('inputsPost');
const categorySelection = document.getElementById('categorySelection');
const title = document.getElementById('title');
const content = document.getElementById('content');
const imgInput = document.getElementById('imgInput');
const add = document.getElementById('add');
const sectionPost = document.getElementById('sectionPost');
const logout = document.getElementById('logout');

addPOST.addEventListener('click', () => {
  popDiv.style.display = 'block';
  inputsPost.style.display = 'block';
  sectionPost.style.display = 'none';
});
add.addEventListener('click', () => {
  if (imgInput.value !== '' && content.value !== '' && title.value !== '') {
    const postData = {
      content: content.value,
      title: title.value,
      category: categorySelection.value,
      imageUrl: imgInput.value,
    };
    fetch('/addPosts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postData),
    });
    window.location.reload();
  } else {
    const fillAll = document.createElement('p');
    fillAll.textContent = 'All input must not be empty ';
    inputsPost.append(fillAll);
  }
});

closepop.addEventListener('click', () => {
  popDiv.style.display = 'none';
});

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
function ActionIncreaseHandler(actionType) {
  return ++actionType;
}
function ActionDecreaseHandler(actionType) {
  return --actionType;
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
    likes.setAttribute('class', ' fa-heart');

    likeContainer(likes, likespan, postId);

    const ratespan = document.createElement('span');
    ratespan.textContent = data.post[0].like;

    const rates = document.createElement('i');
    rates.setAttribute('class', 'fa-solid fa-arrow-up');

    const hr = document.createElement('hr');
    ratespan.appendChild(rates);
    likespan.appendChild(likes);
    actionDiv.append(likespan, ratespan);
    userDiv.append(userImage, userName);
    infoDiv.append(contentPop, imgContent);
    appended.append(userDiv, infoDiv, actionDiv, hr);
  }).catch((err) => console.log(err));
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
logout.addEventListener('click', () => {
  fetch('/logout', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => window.location.reload());
});

function likeContainer(likes, spanLike, id) {
  likes.classList.add('fa-heart');
  fetchByLikeByPost('/userAction', { postId: id })
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
      fetchByLikeByPost('/userLike', { postId: id, newLike: 1 });
      spanLike.appendChild(likes);
    } else {
      spanLike.textContent = ActionDecreaseHandler(spanLike.textContent);
      likes.classList.remove('fa-solid');
      likes.classList.add('fa-regular');
      likes.style.color = '#3f3c41';
      fetchByLikeByPost('/userLike', { postId: id, newLike: 0 });
      spanLike.appendChild(likes);
    }
  });
}

food.addEventListener('click', () => { fetchByCategory('Food'); });
nature.addEventListener('click', () => { fetchByCategory('Nature'); });
photography.addEventListener('click', () => { fetchByCategory('Photography'); });
job.addEventListener('click', () => { fetchByCategory('Job'); });
