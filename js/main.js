import { API } from "./api.js"
import {getFromLocal, removeFromLocal} from "./helper.js";
import { renderTimeline,mainEle, renderUserInfo, renderInfo } from "./ui.js";

const api = new API();

const user = getFromLocal("user");

// çıkış butonuna tıklanınca
mainEle.logoutBtn.addEventListener("click", () => {
    //kullanıcı login sayfasına yönlendir
    removeFromLocal("user");
    //kullanıcıyı login sayfasına yönlendir
    window.location = "/auth.html";
});

// Kullanıcı bilgilerini render et

document.addEventListener("DOMContentLoaded", () => {
    renderUserInfo(user);
});



const controlURL = async () => {
     const path = window.location.search.split("/")[0];
    const userName = window.location.search.split("/")[1];
     const id = window.location.hash.replace("#","");

     // kullanıcı yoksa login sayfasına yönlendir
     if (!user) {
        window.location = "/auth.html";
     }

// Api'dan tweetleri al
  const data = await api.fetchData(
    "timeline.php",
    "screenname",
    user.profile
);


//tweetlerine  renderlama
renderTimeline(data,mainEle.tweetsArea,user);



     // tweet detay sayfası
     if(path == "?status" && id) {
        // tweet detay verisini al
        const info = await fetchData("tweet.php","id",id);

        renderInfo(info,userName);
     }
};

// hem sayfa yuklendiğinde hem de id değiştiğinde bunu izle ve kontrol url'i çalıştır
["load","hashchange"].forEach((event) => {
    window.addEventListener(event,controlURL);
});