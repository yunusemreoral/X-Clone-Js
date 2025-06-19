// apının bizi tanıması için gereken bir obje
const options = {
   method: 'GET',
	headers: {
		'x-rapidapi-key': '79eac7a873msh477868e3c82eaabp174c4fjsn456e5a128f4e',
		'x-rapidapi-host': 'twitter-api45.p.rapidapi.com',
  },
};

//baseurl
const baseUrl = "https://twitter-api45.p.rapidapi.com";

export class API {
    // KURUCU METOD
    constructor() {}

    // kullanıcı verileri alan fonskiyon
    async getUser(userName) {
        try{
            // apıye istek at
            const res = await fetch(`https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${userName}`,
                options
            );
            // apıden gelen veriyi js nesnesine çevir
            const data = await res.json();

            //veriyi dönder
        return data;
     }
        catch(err) {
            console.log(`hata: ${err}`);
        }
        
    }
   
    // kullanıcın attıgı tweetleri alan fonskiyon
    async fetchData(endopint,paramName,paramValue) {
        const res = await fetch(
            `${baseUrl}/${endopint}?${paramName}=${paramValue}`,
            options
        );

        const data = await res.json();
        // eger data içerisindeki timeline değeri varsa bunu yoksa datayı renturn et
        return data.timeline ? data.timeline : data;
    }
}