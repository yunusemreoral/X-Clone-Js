import { API } from "./api.js";
import { setToLocal } from "./helper.js";
import { authEle } from "./ui.js";
const api = new API();

const regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

// Regex yapısıyla 1 büyük harf bir küçük harf bir rakam,1 özel karakter birde en az 6 karakterden oluşma kontrolü yapıyoruz

// varsa hataları render edecek fonksiyon
const renderWarns = (nameWarning,passWarning) => {
    // isim hatası varsa
    if (nameWarning) {
        // eger isim hatası varsa bunu gereken yerde render et
        authEle.nameArea.innerHTML=`<p class="warning">${nameWarning}</p>`;
    } else {
        authEle.nameArea.innerHTML = "";
    }

    // şifre hatası varsa
    if(passWarning) {
        authEle.passArea.innerHTML = `<p class="warning">${passWarning}</p>`;
    } else {
        authEle.passArea.innerHTML = "";
    }
};

authEle.loginForm.addEventListener("submit", async (e) => {
// sayfa yenilemesini engelle
e.preventDefault();

// form gönderildiğinde inputlardaki değerleri eriş
const name = authEle.nameInput.value;
const password = authEle.passwordInput.value;

// isim ve şifre hatası için birer değişken oluştur

let nameWarning = null;
let passWarning = null;

// isimle ilgili hataları kontrol et

// isim değeri var mı?
if (!name) { 
nameWarning = "İsim kısmı boş bırakılamaz!";
} else if (name.length <5) {
    nameWarning = "İsim 5 karakterden kısa olamaz!";
} else {
    nameWarning = null;
}

// şifre ile ilgili hataları kontrol et
if (!password) {
    passWarning = "Şifre giriniz!";
} else if (password.length < 6) {
    passWarning = "Şifre 6 haneden kısa olamaz!";
} else if (!regex.test(password)) {
passWarning = "Zayıf şifre !!!";
} else {
    passWarning = null;
}

// hata varsa bunları render et
renderWarns(nameWarning,passWarning);

// hata yoksa
if (!nameWarning && !passWarning) {
    // apıye istek at ve kullanıcı verisini al
    const useData = await api.getUser(name);

    //veriyi localstorage'a kaydet
setToLocal("user",useData);
    // kullanıcıyı anasayfaya yönlendir
    window.location = "/";
    
}
});



