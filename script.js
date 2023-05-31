let data;
fetch("bijoux.json")
.then(response => response.json())
.then(jsonData => {
data = jsonData;
loaddatafromjson();
})
.catch(error => console.log(error));



function getactualpage(){
  var path = window.location.pathname;
  var page = path.split("/").pop();

  return page
}




function findnameofthepage(){

  let nameofthefile = getactualpage()

  let getpositionofdot = nameofthefile.lastIndexOf(".");
  let nameofthepage = nameofthefile.slice(0, getpositionofdot);

  nameofthepage = String(nameofthepage)

  console.log(nameofthepage)

  console.log(data[nameofthepage])

  setCookie("visitedPage", nameofthepage, 365);

  return nameofthepage
}




// window.onload = function() {loaddatafromjson();}

const contentBottomJewels = document.querySelector(".content-bottom-jewels");

function loaddatafromjson(){

  contentBottomJewels.innerHTML = "";

  const jewelstype = data[findnameofthepage()];

  for (let jewelsID in jewelstype){
      const div = document.createElement("a");
      div.classList.add("content-bottom-jewels-box");
      div.id = jewelsID;
      div.addEventListener('click', assigncookie);
      div.href = "buy.html";

      const img = document.createElement("img");
      img.classList.add("content-bottom-jewels-box-img");
      img.alt = jewelstype[jewelsID].nome;
      img.src = jewelstype[jewelsID].fotoprincipale;
      div.appendChild(img);

      const a = document.createElement("a");
      a.classList.add("content-bottom-jewels-box-name");
      a.href = "";
      a.textContent = jewelstype[jewelsID].nome;
      div.appendChild(a);

      const span = document.createElement("span");
      span.classList.add("content-bottom-jewels-box-price");
      span.textContent = jewelstype[jewelsID].prezzo + " €";
      div.appendChild(span);

      contentBottomJewels.appendChild(div);
  }

}



function assigncookie(e){

  const jewelsID = e.currentTarget.id;

  setCookie("JewelsID", jewelsID, 365);

}





getcookiee()

function getcookiee(){

  const url = "bijoux.json";

  fetch(url)
  .then(response => response.json())
  .then(data => {
    
    const jewelstype = data[getCookie("visitedPage")];

    console.log(data)
    console.log(data.collane)
    console.log(data.orecchini)

    console.log(jewelstype)

    let jewelsid = getCookie("JewelsID");
    let abi = jewelstype[jewelsid].nome;
    let abi2 = jewelstype[jewelsid].descrizione;
    let abi3 = jewelstype[jewelsid].prezzo;
    let dataimg = jewelstype[jewelsid].foto1;
    let dataimg2 = jewelstype[jewelsid].foto2;
    let dataimg3 = jewelstype[jewelsid].foto3;
    let dataimg4 = jewelstype[jewelsid].foto4;


    loadinfofromcookie(abi, abi2, abi3, dataimg, dataimg2, dataimg3, dataimg4);

  })
  .catch(error => console.log(error));

}


function loadinfofromcookie(data, data2, data3, dataimg, dataimg2, dataimg3, dataimg4){

  let informazioninome = document.getElementById("nameebuyhtmlpage");
  let informazioninome2 = document.getElementById("nameebuyhtmlpage2");
  let informazionidescrizione = document.getElementById("descriptionbuyhtmlpage");
  let informazioniprezzo = document.getElementById("pricebuyhtmlpage");



  let dataupc = data.toUpperCase()

  const dataupca = data.split(" ");

  for (let i = 0; i < dataupca.length; i++) {
    dataupca[i] = dataupca[i][0].toUpperCase() + dataupca[i].substr(1);
  }

  informazioninome.textContent = dataupca.join(" ");
  informazioninome2.textContent = dataupc;
  informazionidescrizione.textContent = data2;
  informazioniprezzo.textContent = "€ " + data3;




  document.getElementById("foto1").src = dataimg;
  document.getElementById("foto2").src = dataimg2;
  document.getElementById("foto3").src = dataimg3;
  document.getElementById("foto4").src = dataimg4;







  let informazioninomemobile = document.getElementById("nameebuyhtmlpagemobile");
  let informazionidescrizionemobile = document.getElementById("descriptionbuyhtmlpagemobile");
  let informazioniprezzomobile = document.getElementById("pricebuyhtmlpagemobile");



  const dataupcamobile = data.split(" ");

  for (let i = 0; i < dataupca.length; i++) {
    dataupca[i] = dataupca[i][0].toUpperCase() + dataupca[i].substr(1);
  }

  informazioninomemobile.textContent = dataupcamobile.join(" ");
  informazionidescrizionemobile.textContent = data2;
  informazioniprezzomobile.textContent = "ACQUISTA ORA " + "€ " + data3;

  document.getElementById("fotomobile").src = dataimg2;
  document.getElementById("foto2mobile").src = dataimg3;
  document.getElementById("foto4mobile").src = dataimg4;
  
  
  let imgchangebuy = dataimg2
  let imgchangebuy2 = dataimg3
  let imgchangebuy3 = dataimg4

  const imgarrayy = [imgchangebuy, imgchangebuy2, imgchangebuy3]
  console.log(imgarrayy)

  changeimg()

  function changeimg(){

    let imgleft = document.getElementById("fotomobile");
    let imgcentral = document.getElementById("foto2mobile");
    let imgright = document.getElementById("foto4mobile");

    let leng = imgarrayy.length

    console.log(imgarrayy)

    for(let imgarrayindex in imgarrayy){

        setInterval(function() {

          imgleft.src = imgarrayy[imgarrayindex];
          imgcentral.src = imgarrayy[(imgarrayindex + 1) % leng];
          imgright.src = imgarrayy[(imgarrayindex + 2) % leng];
          
          imgarrayindex = (imgarrayindex + 1) % leng;

        }, 3000);
    }

  }

}






















function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}




const imgarray = ["img/photo/jewels.png", "img/photo/foto.jpg", "img/root/facebook.png"]

changeimg()

function changeimg(){

  let imgleft = document.getElementById("imgleft");
  let imgcentral = document.getElementById("imgcentral");
  let imgright = document.getElementById("imgright");

  let leng = imgarray.length

  for(let imgarrayindex in imgarray){

      setInterval(function() {

        imgleft.src = imgarray[imgarrayindex];
        imgcentral.src = imgarray[(imgarrayindex + 1) % leng];
        imgright.src = imgarray[(imgarrayindex + 2) % leng];
        
        imgarrayindex = (imgarrayindex + 1) % leng;

      }, 3000);
  }

}