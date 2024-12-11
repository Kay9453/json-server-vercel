let url = "http://localhost:3000";
let exhibitionData = [];
let myCollection = [];
let token = "";
let userId = "";

function login() {
  axios
    .post(`${url}/login`, {
      email: "test1@gmail.com",
      password: "test1",
    })
    .then((response) => {
      token = response.data.accessToken;
      userId = response.data.user.id;
      console.log("我登入啦!", token, userId);
    })
    .catch((error) => {
      console.log(error.response);
    });
}

// 加入我的收藏
function addCollection(userId, id) {
  const data = {
    exhibitionId: id,
    userId: userId,
  };
  axios
    .post(`${url}/600/users/${id}/favorites`, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("已加入收藏");
    })
    .catch((error) => {
      console.log(error.response);
    });
}

// 取得展覽資料
function getExhibitionData() {
  axios
    .get(`${url}/exhibitions`)
    .then((response) => {
      exhibitionData = response.data;
      console.log(exhibitionData);
      renderData();
    })
    .catch((error) => {
      console.log(error.response);
    });
}

const pictureList = document.querySelector(".pictureList");

function renderData() {
  let str = "";
  exhibitionData.forEach((item) => {
    str += `<div class="col" data-id="${item.id}">
                <img src="${item.url}" class="card-img-top" alt="...">
                <div class="card">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title">${item.name}</h5>
                            <a href="#" class="addCollectionBtn btn btn-outline-success">加入收藏</a>
                        </div>
                      <p class="card-text">${item.description}</p>
                      <div class="d-flex justify-content-between align-items-center">
                          <a href="#" class="btn btn-primary">我要買</a>
                          <span>NT$${item.price}</span>
                      </div>
                    </div>
                </div>
            </div>`;
    pictureList.innerHTML = str;
  });
}

pictureList.addEventListener("click",(e) =>{
    e.preventDefault();
    const id = e.target.closest(".col").getAttribute("data-id");
    if (e.target.classList.contains("addCollectionBtn")){
        addCollection(userId,id);
    }
});


function init() {
  getExhibitionData();
}

init();
login();
