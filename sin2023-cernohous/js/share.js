'use strict';
//zmenit link radek 36

const kontejner1 = document.getElementById("schovanyKontejner");
const kontejner2 = document.getElementById("schovanyKontejner2");
const kontejner3 = document.getElementById("schovanyKontejner3");
const kontejner4 = document.getElementById("schovanyKontejner4");
const kontejner5 = document.getElementById("schovanyKontejner5");
const kontejner6 = document.getElementById("schovanyKontejner6");

const btnupdate = document.getElementById("update");

let errorKontejner = document.getElementById("errorKontejner");

let error1 = false;
let typ = kontejner3.value;
let jazyk = kontejner4.value;
let lekce = kontejner5.value;
let dataZdroj = kontejner1.value;
let jazykPridany = kontejner4.value;
let lekcePridana = kontejner5.value;
dataZdroj = dataZdroj.replaceAll("\'", "\"");
dataZdroj = JSON.parse(dataZdroj);


if (typeof dataZdroj.slovicka[jazykPridany] == "undefined") {
  error1 = true;
}
if (typ == "lesson") {
  if (typeof dataZdroj.slovicka[jazyk][lekcePridana] == "undefined") {
    error1 = true;
  }
}

if (error1 == true) {
  errorKontejner.innerHTML = `Unfortunately, this ${typ} doesn´t exist anymore<br> <a class="hlavniStranabtn" style="color: white; padding: 0.1rem;" href="http://127.0.0.1/cernohous/sin2023-cernohous/sin2023-cernohous/index.php">Go to Langlet</a>`; //změnit URL adresu aby odkazovala na index.php
  errorKontejner.hidden = false;
}
else if (kontejner2.value) {
  let data = kontejner2.value;
  data = data.replaceAll("\'", "\"");
  data = JSON.parse(data);
  if (typ == "language") {
    let umisteni = false;
    while (!umisteni) {
      if (typeof data.slovicka[jazyk] != "undefined") {
        jazyk = jazyk + "_1";
      }
      else {
        umisteni = true;
      }
    }

    data.slovicka[jazyk] = dataZdroj.slovicka[jazykPridany];
  }
  else if (typ == "lesson") {
    let umisteniLekce = false;
    if (typeof data.slovicka[jazyk] == "undefined") {
      data.slovicka[jazyk] = {};
      umisteniLekce = true;
    }
    while (!umisteniLekce) {
      if (typeof data.slovicka[jazyk][lekce] != "undefined") {
        lekce = lekce + "_1";
      }
      else {
        umisteniLekce = true;
      }
    }
    data.slovicka[jazyk][lekce] = dataZdroj.slovicka[jazyk][lekcePridana];
  }
  data = JSON.stringify(data);
  kontejner6.setAttribute("value", data);
  btnupdate.click();
}
