const authEle = {
    loginForm: document.querySelector("#login"),
    nameInput: document.querySelector("#name"),
    passwordInput: document.querySelector("#password"),
    nameArea: document.querySelector(".name-warning"),
    passArea: document.querySelector(".pass-warning"),
};

const mainEle = {
    tweetsArea: document.querySelector(".tweets-area"),
    logoutBtn: document.querySelector("#logout-btn"),
    userInfo: document.querySelector(".user-info"),
    main: document.querySelector("main"),
};

// tweet içeriğindeki media'yı renderlayan fonskiyon

const getMedia = (media) => {
    //fotograf
    if(media.photo){
        return `<img src="${media.photo[0].media_url_https}"/>`
    }

    //video
    if(media.video){
        const filteredVideo = media.video[0].variants.filter((item) => item.content_type === "video/mp4");

        return `<video src="${filteredVideo[0].url}"controls></video>`;
    }

    //ne fotograf ne video ise
    return ""
};

// kullanıcı tweetlerine göre renderlama yapan fonksiyon
const renderTimeline = (tweets,outlet,user) => {

  // ilk olarak outlet içini boşalt
  outlet.innerHTML = "";

    // tweet dizisini dön html oluştur
    let timelineHtml = tweets.map((tweet) => `<div class="tweet">
        
        <div class="body">
          <div class="user">
            <img class="user-image" src="${user.avatar} " alt="user-image"/>
            <div class="info">
              <h5>${user.name} </h5>
              <p>@${user.profile}</p>
              <p class="tweet-time">${moment(tweet.created_at).fromNow()}</p>
            </div>
            <i class="bi bi-three-dots"></i>
          </div>
          <a href="?status/${user.profile}#${tweet.tweet_id}" class="content">
            <p>${tweet.text} </p>
             ${getMedia(tweet.media)}
          </a>
          <div class="buttons">
            <button class="bi bi-chat"><span>${tweet.replies} </span></button>
            <button class="bi bi-recycle"><span>${tweet.retweets} </span></button>
            <button class="bi bi-heart"><span>${tweet.favorites} </span></button>
            <button class="bi bi-bookmark"><span>${tweet.bookmarks} </span></button>
          </div>
        </div>
      </div>`).join("");

      // oluşturulan html'i arayüze aktar
outlet.innerHtml = timelineHtml;
};

// kullanıcı verileri kısmını dinamik şekilde renderlayan fonskiyon

const renderUserInfo = (user) => {

mainEle.userInfo.innerHTML = `<img src="${user.avatar}"/>
      <div>
        <p id="user-name">${user.name}</p>
        <p id="user-tagname">${user.profile}</p>
        <button id="logout-btn">
          <i class="bi bi-door-open-fill"></i>
          <span>Çıkış Yap</span>
        </button>
      </div>`
};

// tweet detay sayfasını renderlayan fonskiyon
const renderInfo = (info) => {
  mainEle.main.innerHTML = "";
  
  const hmtl = `
  <div class="info-area">
  
  <div class="top">
  <i class"bi bi-arrow-left-short"></i>
  <h3>Gönderi</h3>
  </div>

  <div class="tweet-info">
  <div class="user">
 
  <div class="info">
  <img src="${info.author.image} "/>

  <h5>${info.author.name}</h5>
  <p>${info.author.screen_name}</p>
  </div>

  <button>Abone Ol</button>

  </div>

  <div class="content">
  <p>${info.text}</p>
  </div>

  <div class="data">
  
  <p>
  <span class="count">${info.retweets}</span>
  <span>Yeniden Gönderi</span>
  </p>

   <p>
  <span class="count">${info.quotes}</span>
  <span>Alıntılar</span>
  </p>

   <p>
  <span class="count">${info.likes}</span>
  <span>Beğeni</span>
  </p>

   <p>
  <span class="count">${info.bookmarks}</span>
  <span>Yer İşareti</span>
  </p>


  </div>

  <div class="buttons">
            <button class="bi bi-chat"><span>${info.quotes} </span></button>
            <button class="bi bi-recycle"><span>${info.retweets} </span></button>
            <button class="bi bi-heart"><span>${info.likes} </span></button>
            <button class="bi bi-bookmark"><span>${info.bookmarks} </span></button>
          </div>
  
  </div>
   </div>
   
   `;

   mainEle.main.innerHTML = hmtl;
};

export {authEle,renderTimeline,mainEle,renderUserInfo,renderInfo};