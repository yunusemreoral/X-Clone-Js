// localstorage'a veri ekleyen fonskiyon
const setToLocal = (key,data) => {
    //datayı stringe çevir
    const strData = JSON.stringify(data);

    // localstroage ekleme yap
    localStorage.setItem(key,strData);
};

const getFromLocal = (key) => {
    // localstorage belirtilen key'e sahip verileri al
    const strData = localStorage.getItem(key);

    // veriyi js nesnesine çevir
    const data = JSON.parse(strData);

    // veriyi döndür
    return data;
};

const removeFromLocal = (key) => {
    // localstorageden beliritlen key'e sahip verileri siler
    localStorage.removeItem(key);
};

export {setToLocal,getFromLocal,removeFromLocal};