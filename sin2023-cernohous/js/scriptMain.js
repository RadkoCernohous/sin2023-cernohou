'use strict';
//zmenit link na radku 1030

const schovanyKontejner = document.getElementById("schovanyKontejner");
const schovanyKontejner2 = document.getElementById("schovanyKontejner2");
const schovanyKontejner3 = document.getElementById("schovanyKontejner3");
const jmeno = document.querySelector(".jmeno");
const btnOdhlasit = document.getElementById("logout");
const btnAktualizovat = document.getElementById("updateDtbs");
const formOdhlasit = document.getElementById("formOdhlasit");
const updateDatabase = document.getElementById("updateDatabase");

const modalInfo = document.getElementById("modalInfo");
const modalInfoText = document.getElementById("modalInfoText");
const zavritInfoModal = document.getElementById("zavritInfoModal");
const zobrazitZnova = document.getElementById("zobrazitZnova");
const tutorialNext = document.getElementById("tutorialNext");
const tutorialPrevious = document.getElementById("tutorialPrevious");
const modalImage = document.getElementById("modalImage");
const tutorialCislo = document.getElementById("tutorialCislo");

const vybratJazyk = document.getElementById("vybratJazyk");
const vybratLekci = document.getElementById("vybratLekci");

const popisSoucasnyMod = document.querySelector(".soucasnyMod");

const formUkol1 = document.querySelector(".formPreklad1");
const slovoJazyk1 = document.querySelector(".slovoJazyk1");
const preklad1 = document.getElementById("preklad1");
const btnPreklad1 = document.getElementById("btnPreklad1");

const formUkol2 = document.querySelector(".formPreklad2");
const slovoJazyk2 = document.querySelector(".slovoJazyk2");
const preklad2 = document.getElementById("preklad2");
const btnPreklad2 = document.getElementById("btnPreklad2");

const formUkol3 = document.querySelector(".formSibenice");
const slovoSibenice = document.querySelector(".sibenice");
const sibenice = document.getElementById("sibenice");
const btnSibenice = document.getElementById("btnSibenice");

const formUkol4 = document.querySelector(".formVyberZe3");
const slovoVyberZe3 = document.querySelector(".vyberZe3");
const vyberZe3Kontejner = document.querySelector(".vyberZe3Kontejner");

const nastaveniTestu = document.getElementById("nastaveniTestu");
const nastaveniTestuProbiha = document.getElementById("nastaveniTestuProbiha");
const nastaveniTestuKontejner = document.getElementById("nastaveniTestuKontejner");
const nastaveniTestuProbihaKontejner = document.getElementById("nastaveniTestuProbihaKontejner");
const btnSpustitTest = document.getElementById("startTest");
const btnZrusitTest = document.getElementById("stopTest");
const vybratPocetOtazek = document.getElementById("vybratPocetOtazek");

const vysledkyTestuKontejner = document.querySelector(".vysledkyTestuKontejner")
const btnsmazatTest = document.getElementById("btnsmazatTest");
const inputSmazaniTestu = document.getElementById("inputSmazaniTestu");

const popis1 = document.getElementById("popis1");
const popis2 = document.getElementById("popis2");
const popis3 = document.getElementById("popis3");
const popis4 = document.getElementById("popis4");

const prehled = document.querySelector(".prehled");
const btnPrehledZpet = document.querySelector(".prehledZpet");
const prehledKontejner = document.querySelector(".prehledKontejner");
const prehledRadek = document.querySelector(".prehledRadek");
const prehledSlovaRadek = document.querySelector(".prehledSlovaRadek");
const prehledSlova = document.querySelector(".prehledSlova");
const checkboxOdstranit = document.getElementById("odstranit");
const prehledPopis = document.getElementById("prehledPopis");
const caseMode = document.getElementById("case");

const vysledkyTestuFilter = document.getElementById("vysledkyTestuFilter");

const formPridatJazyk = document.querySelector(".pridaniJazyka");
const btnPridatJazyk = document.getElementById("btnPridatJazyk");
const pridanyJazyk = document.getElementById("pridanyJazyk");

const formPridatLekci = document.querySelector(".pridaniLekce");
const kontejnerPridatLekciVyberJazyku = document.getElementById("pridaniLekcevybratJazyk");
const pridanaLekce = document.getElementById("pridanaLekce");
const btnPridatLekci = document.getElementById("btnPridatLekci");

const formPridatSlova = document.querySelector(".pridaniSlova");
const kontejnerPridatSlovaVyberJazyku = document.getElementById("pridaniSlovavybratJazyk");
const kontejnerPridatSlovaVyberLekce = document.getElementById("pridaniSlovavybratLekci");
const pridaneSlovoCizi = document.getElementById("pridaneSlovo");
const pridaneSlovoPreklad = document.getElementById("pridaneSlovoPreklad");
const btnPridatSlova = document.getElementById("btnPridatSlova");

const sdileniTypJazyk = document.getElementById("sdileniTypJazyk");
const sdileniTypLekce = document.getElementById("sdileniTypLekce");
const kontejnerSdileniVyberJazyku = document.getElementById("sdileniJazyk");
const kontejnerSdileniVyberLekce = document.getElementById("sdileniLekce");
const btnVytvoritLink = document.getElementById("btnVytvoritLink");
const sdileniLink = document.getElementById("sdileniLink");
const btnKopirovatLink = document.getElementById("kopirovatLink");

const odpocetLogout = document.getElementById("odpocetLogout");

const btnUkazatManual = document.getElementById("btnUkazatManual");

const modalVysledky = document.getElementById("modalVysledky");
const modalVysledkyText = document.getElementById("modalVysledkyText");
const zavritModal = document.getElementById("zavritModal");
const modalVysledkyNadpis = document.getElementById("modalVysledkyNadpis");

/*import { jazykStranka } from "./preklad";
console.log(jazykStranka);*/


class Test {
  constructor(testovanyJazyk, testovanaLekce, pocetOtazek, pocetSpravnychOdpovedi) {
    this.testovanyJazyk = testovanyJazyk;
    this.testovanaLekce = testovanaLekce;
    this.pocetOtazek = pocetOtazek;
    this.pocetSpravnychOdpovedi = pocetSpravnychOdpovedi;
    this.PocetSpatnychOdpovedi = this.pocetOtazek - pocetSpravnychOdpovedi;
    this.uspesnost = Math.round((this.pocetSpravnychOdpovedi / pocetOtazek) * 100);
    this.datum = new Intl.DateTimeFormat(navigator.language).format(new Date());
  }
}


class Aplikace {
  #prihlasenyUzivatel
  constructor() {
    let data = schovanyKontejner.value;
    data = data.replaceAll("\'", "\"");
    this.#prihlasenyUzivatel = JSON.parse(data);
    //console.log(this.#prihlasenyUzivatel);
    this.resetovatData();
    /*this.#prihlasenyUzivatel.slovickaVetsiSance = [];
    this.#prihlasenyUzivatel.arr1;
    this.#prihlasenyUzivatel.arr2;
    this.#prihlasenyUzivatel.arr3;
    this.#prihlasenyUzivatel.arr4;
    this.#prihlasenyUzivatel.ukol1PulBodu = true;
    this.#prihlasenyUzivatel.ukol2PulBodu = true;*/
    if (this.#prihlasenyUzivatel.zobrazovatInfo == true && window.innerWidth > 500) {
      this.zobrazitInfo(1);
    }
    jmeno.textContent = this.#prihlasenyUzivatel.jmeno;
    this.generovatNabidkuJazyku();
    this.generovatPopisPrehled();
    this.generovaniVysledkuTest();
    //console.log(this.#prihlasenyUzivatel)
    this.odpocet = this.zacitOdpocet();

    tutorialNext.addEventListener("click", function () {
      let cisloObrazku = parseInt(tutorialCislo.textContent[0]);
      if (cisloObrazku < 7) {
        modalImage.src = `tutorial${cisloObrazku + 1}.png`;
        tutorialCislo.textContent = `${cisloObrazku + 1}/7`;
      }
      else {
        zavritInfoModal.click();
        modalImage.src = `tutorial1.png`;
        tutorialCislo.textContent = `1/7`;
      }
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))

    tutorialPrevious.addEventListener("click", function () {
      let cisloObrazku = parseInt(tutorialCislo.textContent[0]);
      if (cisloObrazku > 1) {
        modalImage.src = `tutorial${cisloObrazku - 1}.png`;
        tutorialCislo.textContent = `${cisloObrazku - 1}/7`;
      }
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))

    vybratJazyk.addEventListener("change", function (e) {
      this.vyberJazyku(e);
      this.generovatNabidkuLekci();
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))
    vybratLekci.addEventListener("change", function (e) {
      this.#prihlasenyUzivatel.slovickaVetsiSance = [];
      this.vyberLekce(e);
      this.generovaniPrekladJazyk1Jazyk2(e);
      this.generovaniPrekladJazyk2Jazyk1(e);
      this.generovaniVyberPrekladu(e);
      this.generovaniSibenice(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
      this.generovatPopisCviceni();
    }.bind(this))

    caseMode.addEventListener("change", function (e) {
      if (caseMode.checked) {
        this.#prihlasenyUzivatel.caseSensitive = false;
      }
      else {
        this.#prihlasenyUzivatel.caseSensitive = true;
      }
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))

    btnPreklad1.addEventListener("click", function (e) {
      this.kontrolaJazyk1Jazyk2(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));
    btnPreklad2.addEventListener("click", function (e) {
      this.kontrolaJazyk2Jazyk1(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));
    btnSibenice.addEventListener("click", function (e) {
      this.kontrolaSibenice(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));
    vyberZe3Kontejner.addEventListener("click", function (e) {
      this.kontrolaVyberPrekladu(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));


    btnSpustitTest.addEventListener("click", function (e) {
      this.zacitTest(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));

    btnZrusitTest.addEventListener("click", function (e) {
      this.zrusitTest(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))


    this.generovatJazyky(null);
    prehledKontejner.addEventListener("click", function (e) {
      this.generovatPrehled(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
      this.generovatPopisPrehled();
    }.bind(this));
    btnPrehledZpet.addEventListener("click", function (e) {
      this.generovatPrehledKrokZpet(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
      this.generovatPopisPrehled();
    }.bind(this));
    prehledKontejner.addEventListener("contextmenu", function (e) {
      this.odstranitANacist(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));


    vysledkyTestuFilter.addEventListener("keyup", function (e) {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
      this.generovaniVysledkuTest();
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))

    btnsmazatTest.addEventListener("click", function (e) {
      this.smazatTest(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))

    btnPridatJazyk.addEventListener("click", function (e) {
      this.pridatJazyk(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));

    kontejnerPridatLekciVyberJazyku.addEventListener("change", function (e) {
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));
    btnPridatLekci.addEventListener("click", function (e) {
      this.pridatLekci(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));

    this.pridatLekciGenerovatJazyky();
    this.pridatDvojiciSlovGenerovatJazyky();

    kontejnerPridatSlovaVyberJazyku.addEventListener("change", function (e) {
      this.pridatDvojiciSlovGenerovatLekce();
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));
    kontejnerPridatSlovaVyberLekce.addEventListener("change", function (e) {
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));
    btnPridatSlova.addEventListener("click", function (e) {
      this.pridatDvojiciSlov(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this));



    pridaneSlovoCizi.addEventListener("keydown", function (e) {
      if (e.keyCode === 40) {
        pridaneSlovoPreklad.focus();
      }
    })
    pridaneSlovoPreklad.addEventListener("keydown", function (e) {
      if (e.keyCode == 38) {
        pridaneSlovoCizi.focus();
      }
    })

    this.sdiletGenerovatJazyky();
    kontejnerSdileniVyberJazyku.addEventListener("change", function () {
      this.sdiletGenerovatLekce();
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))
    kontejnerSdileniVyberLekce.addEventListener("change", function () {
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))
    btnVytvoritLink.addEventListener("click", function (e) {
      this.sdiletGenerovatLink(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))

    sdileniTypJazyk.addEventListener("change", function () {
      kontejnerSdileniVyberLekce.disabled = true;
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))
    sdileniTypLekce.addEventListener("change", function () {
      kontejnerSdileniVyberLekce.disabled = false;
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))

    btnKopirovatLink.addEventListener("click", function (e) {
      this.kopirovatLink(e);
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))

    btnUkazatManual.addEventListener("click", function (e) {
      e.preventDefault();
      this.zobrazitInfo(0);
      modalImage.src = `tutorial1.png`;
      tutorialCislo.textContent = `1/7`;
      clearInterval(this.odpocet);
      this.odpocet = this.zacitOdpocet();
    }.bind(this))

    let arrow = document.createElement('div');
    arrow.innerHTML = '<p> Go up &uarr;</p > ';
    arrow.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        font-weight: 500;`;

    document.body.appendChild(arrow);
    window.addEventListener('scroll', function () {
      if ((window.scrollY > (window.innerHeight / 2)) && window.innerWidth > 700) {
        arrow.style.display = 'block';
      }
      else {
        arrow.style.display = 'none';
      }
    });

    arrow.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    $("#aktualizovatDtbs").submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "updatedtbs.php",
        data: $(this).serialize(),
        success: function (response) {

        },
        error: function (jqXHR, textStatus, errorThrown) {
          //alert("Error: No internet connection");
        }
      });
    })



  }

  zavrit1(e) {
    if (e.target == modalInfo) {
      if (document.getElementById("neukazovatInfo")) {
        let checkbox = document.getElementById("neukazovatInfo");
        if (checkbox.checked == true) {
          this.#prihlasenyUzivatel.zobrazovatInfo = false;
          this.nacistData();
        }
      }
      modalInfo.style.display = "none";
      window.removeEventListener("click", this.zavrit1);
      zavritInfoModal.removeEventListener("click", this.zavrit2);
    }
  }

  zavrit2(e) {
    if (document.getElementById("neukazovatInfo")) {
      let checkbox = document.getElementById("neukazovatInfo");
      if (checkbox.checked == true) {
        this.#prihlasenyUzivatel.zobrazovatInfo = false;
        this.nacistData();
      }
    }
    modalInfo.style.display = "none";
    zavritInfoModal.removeEventListener("click", this.zavrit2.bind(this));
    window.removeEventListener("click", this.zavrit1.bind(this));
  }


  zobrazitInfo(nacteni) {
    zobrazitZnova.innerHTML = "";
    if (nacteni == 1) {
      let html = `    <input type="checkbox" id="neukazovatInfo" name="neukazovatInfo" value="neukazovatInfo">
      <label for="neukazovatInfo">Don´t show this manual again</label><br>`;
      zobrazitZnova.innerHTML = html;
    }
    modalInfo.style.display = "block";
    modalInfo.style.opacity = 0;
    modalInfo.style.animation = `fadeIn ease-in-out 0.5s`;
    modalInfo.style.opacity = 1;
    window.addEventListener("click", this.zavrit1.bind(this));
    zavritInfoModal.addEventListener("click", this.zavrit2.bind(this));
  }


  zacitTest(e) {
    e.preventDefault();
    window.removeEventListener("click", this.zavrit1);
    if (!this.#prihlasenyUzivatel.soucasnyJazyk || !this.#prihlasenyUzivatel.soucasnaLekce) {
      alert("To start test, select Language and Lesson first!")
      return
    }
    if (this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce].length < 4) {
      alert("To start the test, the Lesson needs to contain at least 3 words!");
      return
    }
    this.#prihlasenyUzivatel.probihaTest = true;
    this.#prihlasenyUzivatel.pocetOtazek = Number(vybratPocetOtazek.value);
    this.#prihlasenyUzivatel.pocetSpravnychOdpovedi = 0;
    this.#prihlasenyUzivatel.slovaVTestu = [];
    this.#prihlasenyUzivatel.pocetZodpovezenychOtazek = 0;
    vybratJazyk.disabled = true;
    vybratLekci.disabled = true;
    this.aktulizacePopisZodpovezenychotazek();
    this.generovaniPrekladJazyk1Jazyk2(e);
    this.generovaniPrekladJazyk2Jazyk1(e);
    this.generovaniSibenice(e);
    this.generovaniVyberPrekladu(e);
    nastaveniTestuProbihaKontejner.innerHTML = `<p>Test is <b>undergoing</b></p>
    <p>Currently testing <b>${this.#prihlasenyUzivatel.soucasnaLekce} (${this.#prihlasenyUzivatel.soucasnyJazyk})<b></p>`;
    nastaveniTestu.classList.add("schovane");
    nastaveniTestuProbiha.classList.remove("schovane");
  }

  ukoncitTest() {
    this.#prihlasenyUzivatel.zaznamyTestu.push(new Test(vybratJazyk.value, vybratLekci.value, this.#prihlasenyUzivatel.pocetOtazek, this.#prihlasenyUzivatel.pocetSpravnychOdpovedi));
    this.generovaniVysledkuTest();
    this.zrusitTest();
    this.nacistData();
    modalVysledkyText.innerHTML = `Words tested: ${this.#prihlasenyUzivatel.pocetOtazek}<br>
    Correct answers: ${this.#prihlasenyUzivatel.pocetSpravnychOdpovedi}<br>
    Wrong answers: ${this.#prihlasenyUzivatel.pocetOtazek - this.#prihlasenyUzivatel.pocetSpravnychOdpovedi}<br>
    Your score: <b>${Math.round((this.#prihlasenyUzivatel.pocetSpravnychOdpovedi / this.#prihlasenyUzivatel.pocetOtazek * 100))} %</b>`;
    modalVysledky.style.display = "block";
    modalVysledky.style.opacity = 0;
    modalVysledky.style.animation = `fadeIn ease-in-out 0.5s`;
    modalVysledky.style.opacity = 1;
    window.addEventListener("click", function zavrit(e) {
      if (e.target == modalVysledky) {
        modalVysledky.style.display = "none";
        this.window.removeEventListener("click", zavrit);
      }
    })

    zavritModal.addEventListener("click", function zavrit(e) {
      modalVysledky.style.display = "none";
      zavritModal.removeEventListener("click", zavrit);
    })
  }

  zrusitTest(e) {
    if (e) e.preventDefault();
    this.#prihlasenyUzivatel.probihaTest = false;
    popisSoucasnyMod.textContent = "Practise mode";
    vybratJazyk.disabled = false;
    vybratLekci.disabled = false;
    nastaveniTestu.classList.remove("schovane");
    nastaveniTestuProbiha.classList.add("schovane");
  }

  kontrolaUkonceniTestu() {
    if (this.#prihlasenyUzivatel.pocetZodpovezenychOtazek == this.#prihlasenyUzivatel.pocetOtazek) {
      this.ukoncitTest();
    }
    else {
      if (this.#prihlasenyUzivatel.probihaTest == true) {
        this.aktulizacePopisZodpovezenychotazek();
      }

      if (this.#prihlasenyUzivatel.slovaVTestu.length == this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce].length) {
        this.#prihlasenyUzivatel.slovaVTestu = [];
      }
    }
  }

  generovaniVysledkuTest() {
    let html = `<div class="vysledkyTestuRadek">
    <div class="datumTestu vysledkyTestuRadekElement"><a href=" #!">Date</a></div>
    <div class="jazykTestu vysledkyTestuRadekElement"><a href=" #!">Language</a></div>
    <div class="lekceTestu vysledkyTestuRadekElement"><a href=" #!">Lesson</a></div>
    <div class="hodnoceniTestu vysledkyTestuRadekElement"><a href=" #!">Score</a></div>
  </div>`;
    let filter = vysledkyTestuFilter.value;
    let pomArr = this.#prihlasenyUzivatel.zaznamyTestu.slice()
    pomArr.reverse().forEach(function (test) {
      if (test.testovanyJazyk.includes(filter) || test.testovanaLekce.includes(filter)) {
        html += `<div class="vysledkyTestuRadek">
        <div class="datumTestu vysledkyTestuRadekElement"><a href="#!">${test.datum}</a></div>
        <div class="jazykTestu vysledkyTestuRadekElement"><a href="#!">${test.testovanyJazyk}</a></div>
        <div class="lekceTestu vysledkyTestuRadekElement"><a href="#!">${test.testovanaLekce}</a></div>
        <div class="hodnoceniTestu vysledkyTestuRadekElement"><a href=" #!">${test.uspesnost} %</a></div>
      </div>`
      }
    })
    vysledkyTestuKontejner.innerHTML = html;
  }

  smazatTest(e) {
    e.preventDefault();
    if (this.#prihlasenyUzivatel.zaznamyTestu.length == 0) {
      return;
    }
    let procentoSmazanychOtazek = inputSmazaniTestu.value;
    let pocetSmazanychOtazek = Math.round(this.#prihlasenyUzivatel.zaznamyTestu.length * (procentoSmazanychOtazek / 100));
    if (pocetSmazanychOtazek == 0 && this.#prihlasenyUzivatel.zaznamyTestu.length > 0) {
      pocetSmazanychOtazek = 1;
    }
    let potvrzeni = confirm(`Do you really want to delete oldest ${pocetSmazanychOtazek} test results?`);
    if (potvrzeni == true) {
      this.#prihlasenyUzivatel.zaznamyTestu.splice(0, pocetSmazanychOtazek);
      this.generovaniVysledkuTest();
      this.nacistData();
    }
  }

  aktulizacePopisZodpovezenychotazek() {
    popisSoucasnyMod.innerHTML = `Test mode <br>${this.#prihlasenyUzivatel.pocetZodpovezenychOtazek}/${this.#prihlasenyUzivatel.pocetOtazek} words completed`
  }

  odhlasitUzivatele() {
    let data = JSON.stringify(this.#prihlasenyUzivatel);
    schovanyKontejner.setAttribute("value", data);
    btnOdhlasit.click();
  }

  resetovatData() {
    this.#prihlasenyUzivatel.soucasnyJazyk = "";
    this.#prihlasenyUzivatel.soucasnaLekce = "";
    this.#prihlasenyUzivatel.prekladaneSlovoHledane1 = "";
    this.#prihlasenyUzivatel.prekladaneSlovoHledane2 = [];
    this.#prihlasenyUzivatel.prekladaneSlovoOriginal1 = [];
    this.#prihlasenyUzivatel.prekladaneSlovoOriginal1 = "";
    this.#prihlasenyUzivatel.sibenicePismena = [];
    this.#prihlasenyUzivatel.sibenicePismenaSpatne = [];
    this.#prihlasenyUzivatel.sibenicePismenaUhodnuta = [];
    this.#prihlasenyUzivatel.slovaVTestu = [];
    this.#prihlasenyUzivatel.probihaTest = false;
    this.#prihlasenyUzivatel.slovoSibenice = "";
    this.#prihlasenyUzivatel.vyberPrekladuSpravne = "";
    this.#prihlasenyUzivatel.ukol1PulBodu = true;
    this.#prihlasenyUzivatel.ukol2PulBodu = true;
    this.#prihlasenyUzivatel.caseSensitive = true;

  }

  pridatJazyk(e) {
    e.preventDefault();
    let jazykPridany = pridanyJazyk.value.trim();
    if (!jazykPridany) {
      return
    }
    if (jazykPridany.includes("\"") || jazykPridany.includes("\'")) {
      pridanyJazyk.value = ``;
      alert("Can´t add a Language name which contains quotes!");
      return
    }
    if (Object.keys(this.#prihlasenyUzivatel.slovicka).includes(jazykPridany)) {
      pridanyJazyk.value = ``;
      alert("This Language already exists!");
      return
    }

    this.#prihlasenyUzivatel.slovicka[jazykPridany] = {};
    pridanyJazyk.value = ``;
    this.generovatPrehledSoucasnyKrok(e);
    this.generovatNabidkuJazyku();
    this.pridatLekciGenerovatJazyky();
    this.pridatDvojiciSlovGenerovatJazyky();
    this.sdiletGenerovatJazyky();
    this.nacistData();

  }

  pridatLekciGenerovatJazyky() {
    let soucasnyJazyk = kontejnerPridatLekciVyberJazyku.options[kontejnerPridatLekciVyberJazyku.selectedIndex].text;
    kontejnerPridatLekciVyberJazyku.innerHTML = kontejnerPridatLekciVyberJazyku.innerHTML = `<option value="jazyk" selected disabled hidden>Choose language</option>` ? `<option value="jazyk" selected disabled hidden>Choose language</option>` : ""
    Object.keys(this.#prihlasenyUzivatel.slovicka).reverse().forEach(function (jazyk) {
      if (jazyk === soucasnyJazyk) {
        let html = `<option value="${jazyk}"selected>${jazyk}</option>`;
        kontejnerPridatLekciVyberJazyku.innerHTML += html;
      }
      else {
        let html = `<option value="${jazyk}">${jazyk}</option>`;
        kontejnerPridatLekciVyberJazyku.innerHTML += html;
      }
    })
  }

  pridatLekci(e) {
    e.preventDefault();
    let lekcePridana = pridanaLekce.value.trim();
    let jazyk = kontejnerPridatLekciVyberJazyku.options[kontejnerPridatLekciVyberJazyku.selectedIndex].text;
    if (jazyk == "Choose language") {
      alert("Choose a Language where you want to add this Lesson")
      return
    }
    if (lekcePridana.includes("\"") || lekcePridana.includes("\'")) {
      pridanaLekce.value = ``;
      alert("Can´t add a Lesson name which contains quotes!");
      return
    }
    if (!lekcePridana) {
      return
    }
    if (Object.keys(this.#prihlasenyUzivatel.slovicka[jazyk]).includes(lekcePridana)) {
      pridanaLekce.value = ``;
      alert("This Lesson already exists in this Language!");
      return
    }

    this.#prihlasenyUzivatel.slovicka[jazyk][lekcePridana] = [];
    pridanaLekce.value = "";
    //console.log(this.#prihlasenyUzivatel)

    this.generovatPrehledSoucasnyKrok(e);
    this.generovatNabidkuLekci();
    this.pridatDvojiciSlovGenerovatLekce(e);
    this.sdiletGenerovatLekce();
    this.nacistData();
  }

  pridatDvojiciSlovGenerovatJazyky() {
    let soucasnyJazyk = kontejnerPridatSlovaVyberJazyku.options[kontejnerPridatSlovaVyberJazyku.selectedIndex].text;
    kontejnerPridatSlovaVyberJazyku.innerHTML = kontejnerPridatSlovaVyberJazyku.innerHTML = `<option value="jazyk" selected disabled hidden>Choose language</option>` ? `<option value="jazyk" selected disabled hidden>Choose language</option>` : ""
    Object.keys(this.#prihlasenyUzivatel.slovicka).reverse().forEach(function (jazyk) {
      if (jazyk === soucasnyJazyk) {
        let html = `<option value="${jazyk}"selected>${jazyk}</option>`;
        kontejnerPridatSlovaVyberJazyku.innerHTML += html;
      }
      else {
        let html = `<option value="${jazyk}">${jazyk}</option>`;
        kontejnerPridatSlovaVyberJazyku.innerHTML += html;
      }
    })
  }

  pridatDvojiciSlovGenerovatLekce() {
    let soucasnyJazyk = kontejnerPridatSlovaVyberJazyku.options[kontejnerPridatSlovaVyberJazyku.selectedIndex].value;
    if (soucasnyJazyk == "jazyk") {
      return
    }
    let soucasnaLekce = kontejnerPridatSlovaVyberLekce.options[kontejnerPridatSlovaVyberLekce.selectedIndex].text;
    kontejnerPridatSlovaVyberLekce.innerHTML = kontejnerPridatSlovaVyberLekce.innerHTML = `<option value="lekce" selected disabled hidden>Choose lesson</option>` ? `<option value="lekce" selected disabled hidden>Choose lesson</option>` : ""
    Object.keys(this.#prihlasenyUzivatel.slovicka[soucasnyJazyk]).reverse().forEach(function (lekce) {
      if (lekce === soucasnaLekce) {
        let html = `<option value="${lekce}"selected>${lekce}</option>`;
        kontejnerPridatSlovaVyberLekce.innerHTML += html;
      }
      else {
        let html = `<option value="${lekce}">${lekce}</option>`;
        kontejnerPridatSlovaVyberLekce.innerHTML += html;
      }
    })

  }

  pridatDvojiciSlov(e) {
    e.preventDefault();
    let jazyk = kontejnerPridatSlovaVyberJazyku.options[kontejnerPridatSlovaVyberJazyku.selectedIndex].text;
    let lekce = kontejnerPridatSlovaVyberLekce.options[kontejnerPridatSlovaVyberLekce.selectedIndex].text;
    if (jazyk == "Choose language" || lekce == "Choose lesson") {
      alert("Choose a Language and Lesson where you want to add these words!");
      return
    }
    let slovoPridane = pridaneSlovoCizi.value.trim();
    let slovoPridanePreklad = pridaneSlovoPreklad.value.trim();
    if (slovoPridane.includes("\"") || slovoPridane.includes("\'") || slovoPridanePreklad.includes("\"") || slovoPridanePreklad.includes("\'")) {
      pridaneSlovoCizi.value = ``;
      pridaneSlovoPreklad.value = ``;
      alert("Can´t add Words which contain quotes!");
      return
    }
    slovoPridanePreklad = slovoPridanePreklad.split(",").map(function (slovo) { return slovo.trim() });
    if ((slovoPridane == "") || (slovoPridanePreklad == "")) {
      pridaneSlovoCizi.value = "";
      pridaneSlovoPreklad.value = "";
      return
    }
    if (this.#prihlasenyUzivatel.slovicka[jazyk][lekce].some(function (array) { return array[0] == slovoPridane })) {
      alert("This word already exists in this lesson!");
      pridaneSlovoCizi.value = "";
      pridaneSlovoPreklad.value = "";
      return
    }
    this.#prihlasenyUzivatel.slovicka[jazyk][lekce].push([slovoPridane, slovoPridanePreklad]);
    pridaneSlovoCizi.value = "";
    pridaneSlovoPreklad.value = "";
    pridaneSlovoCizi.focus();
    this.generovatPrehledSoucasnyKrok(e);
    this.nacistData();
  }

  pridatJazyk2(jazykPridany) {
    this.#prihlasenyUzivatel.slovicka[jazykPridany] = {};
  }

  pridatLekci2(jazyk, lekcePridana) {
    this.#prihlasenyUzivatel.slovicka[jazyk][lekcePridana] = [];
  }

  pridatDvojiciSlov2(jazyk, lekce, slovoPridane, slovoPridanePreklad) {
    this.#prihlasenyUzivatel.slovicka[jazyk][lekce].push([slovoPridane, slovoPridanePreklad]);
  }

  odebratJazyk(e) {
    try {
      let odebranyJazyk = e.target.closest("a").textContent;
      delete this.#prihlasenyUzivatel.slovicka[odebranyJazyk];
      this.generovatPrehledSoucasnyKrok(e);
      if (odebranyJazyk == this.#prihlasenyUzivatel.soucasnyJazyk) {
        this.restartovatCviceni();
        this.#prihlasenyUzivatel.soucasnyJazyk = null;
        this.#prihlasenyUzivatel.soucasnaLekce = null;
        this.generovatNabidkuJazyku();
        vybratLekci.innerHTML = `<option value="lekce" selected disabled hidden>Choose lesson</option>`;

      }
      if (odebranyJazyk == kontejnerPridatSlovaVyberJazyku.options[kontejnerPridatSlovaVyberJazyku.selectedIndex].text) {
        kontejnerPridatSlovaVyberJazyku.innerHTML = `<option value="jazyk" selected disabled hidden>Choose language</option>`;
        kontejnerPridatSlovaVyberLekce.innerHTML = `<option value="lekce" selected disabled hidden>Choose lesson</option>`;
      }
      if (odebranyJazyk == kontejnerPridatLekciVyberJazyku.options[kontejnerPridatLekciVyberJazyku.selectedIndex].text) {
        kontejnerPridatLekciVyberJazyku.innerHTML = `<option value="jazyk" selected disabled hidden>Choose language</option>`;
      }
      if (odebranyJazyk == kontejnerSdileniVyberJazyku.options[kontejnerSdileniVyberJazyku.selectedIndex].text) {
        kontejnerSdileniVyberJazyku.innerHTML = `<option value="jazyk" selected disabled hidden>Choose language</option>`;
        kontejnerSdileniVyberLekce.innerHTML = `<option value="lekce" selected disabled hidden>Choose lesson</option>`;
      }
      this.generovatNabidkuJazyku();
      this.pridatLekciGenerovatJazyky();
      this.pridatDvojiciSlovGenerovatJazyky();
      this.sdiletGenerovatJazyky();
    }
    catch (error) {
      //console.log(error, "You clicked between the boxes!");
    }
  }

  odebratLekci(e) {
    try {
      let odebranaLekce = e.target.closest("a").textContent;
      delete this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.prohlizenyJazyk][odebranaLekce];
      this.generovatPrehledSoucasnyKrok(e);
      if (odebranaLekce == this.#prihlasenyUzivatel.soucasnaLekce) {
        this.restartovatCviceni();
        this.#prihlasenyUzivatel.soucasnaLekce = null;
      }
      if (odebranaLekce == kontejnerPridatSlovaVyberJazyku.options[kontejnerPridatSlovaVyberJazyku.selectedIndex].text) {
        kontejnerPridatSlovaVyberLekce.innerHTML = `<option value="lekce" selected disabled hidden>Choose lesson</option>`;
      }
      if (odebranaLekce == kontejnerSdileniVyberLekce.options[kontejnerSdileniVyberLekce.selectedIndex].text) {
        kontejnerSdileniVyberLekce.innerHTML = `<option value="lekce" selected disabled hidden>Choose lesson</option>`;
      }
      this.generovatNabidkuLekci();
      this.pridatDvojiciSlovGenerovatLekce();
      this.sdiletGenerovatLekce();
    }
    catch (error) {
      //console.log(error, "You clicked between the boxes!");
    }
  }

  odebratDvojiciSlov(e) {
    try {
      let odebranadvojice = this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.prohlizenyJazyk][this.#prihlasenyUzivatel.prohlizenaLekce].find(function (dvojice) {
        return dvojice[0].includes(e.target.closest("a").textContent)
      });
      _.pull(this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.prohlizenyJazyk][this.#prihlasenyUzivatel.prohlizenaLekce], odebranadvojice);
      _.pull(this.#prihlasenyUzivatel.slovickaVetsiSance, odebranadvojice);
      this.generovatPrehledSoucasnyKrok(e);
    }
    catch (error) {
      //console.log(error, "You clicked between the boxes!");
    }
  }

  generovatNabidkuJazyku() {
    if (this.#prihlasenyUzivatel.soucasnyJazyk == "") {
      vybratJazyk.innerHTML = `<option value="jazyk" selected disabled hidden>Choose language</option>`;
    }
    vybratJazyk.innerHTML = vybratJazyk.innerHTML = `<option value="jazyk" selected disabled hidden>Choose language</option>` ? `<option value="jazyk" selected disabled hidden>Choose language</option>` : ""
    let soucasnyJazyk = this.#prihlasenyUzivatel.soucasnyJazyk;
    Object.keys(this.#prihlasenyUzivatel.slovicka).reverse().forEach(function (jazyk) {
      if (jazyk === soucasnyJazyk) {
        let html = `<option value="${jazyk}"selected>${jazyk}</option>`;
        vybratJazyk.innerHTML += html;
      }
      else {
        let html = `<option value="${jazyk}">${jazyk}</option>`;
        vybratJazyk.innerHTML += html;
      }
    })
  }

  generovatNabidkuLekci() {
    if (this.#prihlasenyUzivatel.soucasnaLekce == "") {
      vybratLekci.innerHTML = `<option value="lekce" selected disabled hidden>Choose lesson</option>`;
    }
    vybratLekci.innerHTML = vybratLekci.innerHTML = `<option value="lekce" selected disabled hidden>Choose lesson</option>` ? `<option value="lekce" selected disabled hidden>Choose lesson</option>` : "";
    let soucasnaLekce = this.#prihlasenyUzivatel.soucasnaLekce;
    if (this.#prihlasenyUzivatel.soucasnyJazyk == "") {
      return
    }
    Object.keys(this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk]).reverse().forEach(function (lekce) {
      if (lekce == soucasnaLekce) {
        let html = `<option value="${lekce}"selected>${lekce}</option>`
        vybratLekci.innerHTML += html;
      }
      else {
        let html = `<option value="${lekce}">${lekce}</option>`
        vybratLekci.innerHTML += html;
      }
    })
  }

  vyberJazyku(e) {
    this.#prihlasenyUzivatel.soucasnyJazyk = e.target.value;
    this.#prihlasenyUzivatel.soucasnaLekce = null;
  }

  vyberLekce(e) {
    this.#prihlasenyUzivatel.soucasnaLekce = e.target.value;
  }

  generovatJazyky(e) {
    if (e) e.preventDefault();
    prehledKontejner.innerHTML = ``;
    this.#prihlasenyUzivatel.urovenProhlizeni = 0;
    Object.keys(this.#prihlasenyUzivatel.slovicka).reverse().forEach(function (jazyk) {
      let html = `<div class="prehledRadek"><a href="#">${jazyk}</a></div>`;
      prehledKontejner.innerHTML += html;
    })
  }

  generovatLekce(e) {
    if (e) e.preventDefault()
    prehledKontejner.innerHTML = ``;
    this.#prihlasenyUzivatel.urovenProhlizeni = 1;
    this.#prihlasenyUzivatel.prohlizenyJazyk = e?.target.closest("a") ? e.target.closest("a").textContent : this.#prihlasenyUzivatel.prohlizenyJazyk;
    prehledKontejner.innerHTML = ``;
    Object.keys(this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.prohlizenyJazyk]).reverse().forEach(function (lekce) {
      let html = `<div class="prehledRadek"><a href="#">${lekce}</a></div>`;
      prehledKontejner.innerHTML += html;
    })

  }
  generovatSlova(e) {
    if (e) e.preventDefault()
    prehledKontejner.innerHTML = ``;
    this.#prihlasenyUzivatel.urovenProhlizeni = 2;
    this.#prihlasenyUzivatel.prohlizenaLekce = e?.target.closest("a") ? e.target.closest("a").textContent : this.#prihlasenyUzivatel.prohlizenaLekce;
    this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.prohlizenyJazyk][this.#prihlasenyUzivatel.prohlizenaLekce].forEach(function (slovicka) {
      let html = `<div class="prehledSlovaRadek">`;
      html += `<div class="prehledSlova"><a href="#" onclick="return false;">${slovicka[0]}</a></div>`
      html += `<div class="prehledSlova"><a href="#" onclick="return false;">`
      slovicka[1].forEach(function (slovo, index) {
        if (index < slovicka[1].length - 1) {
          html += `${slovo}, `;
        }
        else {
          html += `${slovo}`;
        }
      })
      html += `</a></div></div>`
      prehledKontejner.innerHTML += html;
    })
  }

  generovatPrehled(e) {
    if (this.#prihlasenyUzivatel.urovenProhlizeni === 0) {
      this.generovatLekce(e);
    }
    else if (this.#prihlasenyUzivatel.urovenProhlizeni === 1) {
      this.generovatSlova(e);
    }
  }

  generovatPrehledKrokZpet(e) {
    e.preventDefault();
    if (this.#prihlasenyUzivatel.urovenProhlizeni === 1) {
      this.generovatJazyky(e);
      this.#prihlasenyUzivatel.urovenProhlizeni === 0;
    }
    else if (this.#prihlasenyUzivatel.urovenProhlizeni === 2) {
      this.generovatLekce(e);
      this.#prihlasenyUzivatel.urovenProhlizeni === 1;
    }
  }

  generovatPrehledSoucasnyKrok(e) {
    e.preventDefault();
    if (this.#prihlasenyUzivatel.urovenProhlizeni === 0) {
      this.generovatJazyky(e)
    }
    else if (this.#prihlasenyUzivatel.urovenProhlizeni === 1) {
      this.generovatLekce(null);
    }
    else if (this.#prihlasenyUzivatel.urovenProhlizeni === 2) {
      this.generovatSlova(null);
    }
  }

  odstranitANacist(e) {
    if (!checkboxOdstranit.checked) {
      alert("Enable deleting by ticking the checkbox");
      return;
    }
    if (this.#prihlasenyUzivatel.probihaTest == true) {
      alert("Can't delete Vocabulary during the test!");
      return
    }
    if (this.#prihlasenyUzivatel.urovenProhlizeni === 0) {
      this.odebratJazyk(e);
    }
    else if (this.#prihlasenyUzivatel.urovenProhlizeni === 1) {
      this.odebratLekci(e);
    }
    else if (this.#prihlasenyUzivatel.urovenProhlizeni === 2) {
      this.odebratDvojiciSlov(e);
    }
    this.nacistData();
  }

  nacistData() {
    let data = JSON.stringify(this.#prihlasenyUzivatel);
    schovanyKontejner.setAttribute("value", data);
    schovanyKontejner3.setAttribute("value", data);
    btnAktualizovat.click();
  }

  sdiletGenerovatJazyky() {
    let soucasnyJazyk = kontejnerSdileniVyberJazyku.options[kontejnerSdileniVyberJazyku.selectedIndex].text;
    kontejnerSdileniVyberJazyku.innerHTML = kontejnerSdileniVyberJazyku.innerHTML = `<option value="jazyk" selected disabled hidden>Choose language</option>` ? `<option value="jazyk" selected disabled hidden>Choose language</option>` : ""
    Object.keys(this.#prihlasenyUzivatel.slovicka).reverse().forEach(function (jazyk) {
      if (jazyk === soucasnyJazyk) {
        let html = `<option value="${jazyk}"selected>${jazyk}</option>`;
        kontejnerSdileniVyberJazyku.innerHTML += html;
      }
      else {
        let html = `<option value="${jazyk}">${jazyk}</option>`;
        kontejnerSdileniVyberJazyku.innerHTML += html;
      }
    })
  }

  sdiletGenerovatLekce() {
    let soucasnyJazyk = kontejnerSdileniVyberJazyku.options[kontejnerSdileniVyberJazyku.selectedIndex].value;
    if (soucasnyJazyk == "jazyk") {
      return
    }
    let soucasnaLekce = kontejnerSdileniVyberLekce.options[kontejnerSdileniVyberLekce.selectedIndex].text;
    kontejnerSdileniVyberLekce.innerHTML = kontejnerSdileniVyberLekce.innerHTML = `<option value="lekce" selected disabled hidden>Choose lesson</option>` ? `<option value="lekce" selected disabled hidden>Choose lesson</option>` : ""
    Object.keys(this.#prihlasenyUzivatel.slovicka[soucasnyJazyk]).reverse().forEach(function (lekce) {
      if (lekce === soucasnaLekce) {
        let html = `<option value="${lekce}"selected>${lekce}</option>`;
        kontejnerSdileniVyberLekce.innerHTML += html;
      }
      else {
        let html = `<option value="${lekce}">${lekce}</option>`;
        kontejnerSdileniVyberLekce.innerHTML += html;
      }
    })
  }

  sdiletGenerovatLink(e) {
    e.preventDefault();
    let jazyk = kontejnerSdileniVyberJazyku.value;
    if (jazyk == "jazyk") {
      return
    }
    let link = `http://127.0.0.1/cernohous/sin2023-cernohous/sin2023-cernohous/HTMLshare.php`;  //změnit URL adresu aby odkazovala na HTMLshare.php
    link += `?id=${schovanyKontejner2.value}&`;
    if (sdileniTypJazyk.checked == true) {
      link += `type=language&language=${jazyk}&lesson=&name=${this.#prihlasenyUzivatel.jmeno}`;
      btnKopirovatLink.hidden = false;
    }
    else {
      let lekce = kontejnerSdileniVyberLekce.value;
      if (lekce == "lekce") {
        return;
      }
      link += `type=lesson&language=${jazyk}&lesson=${lekce}&name=${this.#prihlasenyUzivatel.jmeno}`;
      btnKopirovatLink.hidden = false;
    }
    sdileniLink.textContent = link;
  }

  kopirovatLink(e) {
    e.preventDefault();
    navigator.clipboard.writeText(sdileniLink.textContent);
  }

  zacitOdpocet() {
    let sekunda = function () {

      let min = String(Math.trunc(cas / 60)).padStart(2, 0);
      let sec = String(cas % 60).padStart(2, 0);

      odpocetLogout.innerHTML = `You will be logged-out in: <b>${min}:${sec}</b>`;

      if (cas === 0) {
        clearInterval(odpocet);
        odhlasitUzivatele.bind(this)();
      }

      cas--;
    };

    let cas = 600;
    let odhlasitUzivatele = this.odhlasitUzivatele;
    sekunda.bind(this)();

    let odpocet = setInterval(sekunda.bind(this), 1000);

    return odpocet;
  }

  generovatPopisCviceni() {
    popis1.innerHTML = `Translate <b>to ${this.#prihlasenyUzivatel.soucasnyJazyk}</b>  `;
    popis2.innerHTML = `Translate <b>from ${this.#prihlasenyUzivatel.soucasnyJazyk}</b>  `;
    popis3.innerHTML = `Choose correct translation <b>to ${this.#prihlasenyUzivatel.soucasnyJazyk}</b>  `;
    popis4.innerHTML = `Complete <b>the word</b>`;
  }

  generovatPopisPrehled() {
    if (this.#prihlasenyUzivatel.urovenProhlizeni == 0) {
      prehledPopis.textContent = "Languages";
    }
    if (this.#prihlasenyUzivatel.urovenProhlizeni == 1) {
      prehledPopis.textContent = `Lessons in ${this.#prihlasenyUzivatel.prohlizenyJazyk}`;
    }
    if (this.#prihlasenyUzivatel.urovenProhlizeni == 2) {
      prehledPopis.textContent = `Words in ${this.#prihlasenyUzivatel.prohlizenaLekce} (${this.#prihlasenyUzivatel.prohlizenyJazyk})`;
    }
  }

  porovnaniRetezcu(slovoOriginal, slovoZadane) {
    let pole = [];

    for (let i = 0; i <= slovoZadane.length; i++) {
      pole[i] = [i];
    }

    for (let j = 0; j <= slovoOriginal.length; j++) {
      pole[0][j] = j;
    }


    for (let i = 1; i <= slovoZadane.length; i++) {
      for (let j = 1; j <= slovoOriginal.length; j++) {
        if (slovoZadane.charAt(i - 1) == slovoOriginal.charAt(j - 1)) {
          pole[i][j] = pole[i - 1][j - 1];
        }
        else {
          pole[i][j] = Math.min(pole[i - 1][j - 1] + 1, pole[i][j - 1] + 1, pole[i - 1][j] + 1);
        }
      }
    }

    return pole[slovoZadane.length][slovoOriginal.length];
  }

  restartovatCviceni() {
    slovoJazyk1.textContent = "Exercise 1";
    slovoJazyk2.textContent = "Exercise 2";
    slovoVyberZe3.textContent = "Exercise 3";
    slovoSibenice.textContent = "Exercise 4";
    preklad1.value = "";
    preklad2.value = "";
    vyberZe3Kontejner.innerHTML = `<div class="vyberZe3Radek vyberZe3RadekSpatne"><a href="#">Option 1</a></div><div  class="vyberZe3Radek" > <a href="#">Option 2</a></div >
        <div class="vyberZe3Radek"><a href="#">Option 3</a></div>`;
    sibenice.value = "";
    popis1.innerHTML = "";
    popis2.innerHTML = "";
    popis3.innerHTML = "";
    popis4.innerHTML = "";
  }


  generovaniPrekladJazyk1Jazyk2(e) {
    if (e) e.preventDefault();
    if (this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce].length < 1) {
      return;
    }
    this.#prihlasenyUzivatel.ukol1VyresenoSpravne = true
    this.#prihlasenyUzivatel.ukol1PulBodu = true;
    let pokracovat = false
    let prekladanaDvojice
    while (pokracovat == false) {
      if (this.#prihlasenyUzivatel.probihaTest == false) pokracovat = true;
      let nahodne = Math.random();
      if (nahodne < 0.4 && this.#prihlasenyUzivatel.probihaTest == false && this.#prihlasenyUzivatel.slovickaVetsiSance.length > 0) {
        prekladanaDvojice = _.sampleSize(this.#prihlasenyUzivatel.slovickaVetsiSance, 1)[0];
      }
      else {
        prekladanaDvojice = _.sampleSize(this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce], 1)[0];
      }
      this.#prihlasenyUzivatel.arr1 = prekladanaDvojice;
      if (!this.#prihlasenyUzivatel.slovaVTestu.includes(prekladanaDvojice[0])) {
        pokracovat = true;
      }
    }
    this.#prihlasenyUzivatel.slovaVTestu.push(prekladanaDvojice[0]);
    this.#prihlasenyUzivatel.prekladaneSlovoOriginal1 = prekladanaDvojice[1];
    this.#prihlasenyUzivatel.prekladaneSlovoHledane1 = prekladanaDvojice[0];
    let text = "";
    this.#prihlasenyUzivatel.prekladaneSlovoOriginal1.forEach(function (slovo, index) {
      if (index == (prekladanaDvojice[1].length - 1)) {
        text += slovo;
      }
      else {
        text += slovo;
        text += ", "
      }
    })
    slovoJazyk1.textContent = text;


  }

  generovaniPrekladJazyk2Jazyk1(e) {
    if (e) e.preventDefault();
    if (this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce].length < 1) {
      return;
    }
    this.#prihlasenyUzivatel.ukol2VyresenoSpravne = true;
    this.#prihlasenyUzivatel.ukol2PulBodu = true;
    let pokracovat = false
    let prekladanaDvojice
    while (pokracovat == false) {
      if (this.#prihlasenyUzivatel.probihaTest == false) pokracovat = true;
      let nahodne = Math.random();
      if (nahodne < 0.4 && this.#prihlasenyUzivatel.probihaTest == false && this.#prihlasenyUzivatel.slovickaVetsiSance.length > 0) {
        prekladanaDvojice = _.sampleSize(this.#prihlasenyUzivatel.slovickaVetsiSance, 1)[0];
      }
      else {
        prekladanaDvojice = _.sampleSize(this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce], 1)[0];
      }
      this.#prihlasenyUzivatel.arr2 = prekladanaDvojice;
      if (!this.#prihlasenyUzivatel.slovaVTestu.includes(prekladanaDvojice[0])) {
        pokracovat = true;
      }
    }
    this.#prihlasenyUzivatel.slovaVTestu.push(prekladanaDvojice[0]);
    this.#prihlasenyUzivatel.prekladaneSlovoOriginal2 = prekladanaDvojice[0];
    this.#prihlasenyUzivatel.prekladaneSlovoHledane2 = prekladanaDvojice[1];
    slovoJazyk2.textContent = this.#prihlasenyUzivatel.prekladaneSlovoOriginal2;
  }

  generovaniSibenice(e) {
    if (e) e.preventDefault();
    if (this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce].length < 1) {
      slovoSibenice.textContent = "Exercise 4";
      return;
    }
    if (!this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce].some(function (dvojice) { return dvojice[0].length > 1 })) {
      slovoSibenice.textContent = "Exercise 4";
      return
    }
    this.#prihlasenyUzivatel.ukol3VyresenoSpravne = true;
    this.#prihlasenyUzivatel.sibenicePismenaUhodnuta = [];
    this.#prihlasenyUzivatel.sibenicePismenaSpatne = [];
    sibenice.value = "";
    let prekladanaDvojice
    let pokracovat = false
    while (pokracovat == false) {
      if (this.#prihlasenyUzivatel.probihaTest == false) pokracovat = true;
      let nahodne = Math.random();
      if (nahodne < 0.4 && this.#prihlasenyUzivatel.probihaTest == false && this.#prihlasenyUzivatel.slovickaVetsiSance.length > 0) {
        prekladanaDvojice = _.sampleSize(this.#prihlasenyUzivatel.slovickaVetsiSance, 1)[0];
      }
      else {
        prekladanaDvojice = _.sampleSize(this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce], 1)[0];
      }
      this.#prihlasenyUzivatel.slovoSibenice = prekladanaDvojice[0]
      this.#prihlasenyUzivatel.arr3 = prekladanaDvojice;
      if (!this.#prihlasenyUzivatel.slovaVTestu.includes(this.#prihlasenyUzivatel.slovoSibenice)) {
        pokracovat = true;
      }
      if (this.#prihlasenyUzivatel.slovoSibenice.length < 2) {
        pokracovat = false;
      }
    }
    this.#prihlasenyUzivatel.slovaVTestu.push(this.#prihlasenyUzivatel.slovoSibenice);
    this.#prihlasenyUzivatel.sibenicePismena = [...new Set(this.#prihlasenyUzivatel.slovoSibenice.split(""))];
    if (this.#prihlasenyUzivatel.slovoSibenice.includes(" ")) {
      this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.push(" ");
    }
    let napoveda
    if ((this.#prihlasenyUzivatel.sibenicePismena.length - 2) <= 1) {
      napoveda = 2;
    }
    else if (this.#prihlasenyUzivatel.sibenicePismena.includes(" ")) {
      napoveda = this.#prihlasenyUzivatel.sibenicePismena.length - 2;
    }
    else {
      napoveda = this.#prihlasenyUzivatel.sibenicePismena.length - 1;
    }
    let pismenoNapoveda = " ";
    while (napoveda > 1) {
      pismenoNapoveda = _.sampleSize(this.#prihlasenyUzivatel.sibenicePismena, 1);
      if (!this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.includes(...pismenoNapoveda)) {
        this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.push(...pismenoNapoveda);
        napoveda--;
      }
    }
    let sibeniceZobrazeni = ""
    for (let i = 0; i < this.#prihlasenyUzivatel.slovoSibenice.length; i++) {
      if (this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.includes(this.#prihlasenyUzivatel.slovoSibenice[i])) {
        sibeniceZobrazeni += this.#prihlasenyUzivatel.slovoSibenice[i];
      }
      else {
        sibeniceZobrazeni += "_";
      }
    }
    slovoSibenice.textContent = sibeniceZobrazeni;

  }

  generovaniVyberPrekladu(e) {
    if (e) e.preventDefault();
    if (this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce].length < 3) {
      slovoVyberZe3.textContent = "Exercise 3";
      vyberZe3Kontejner.innerHTML = `<div class="vyberZe3Radek vyberZe3RadekSpatne"><a href="#">Option 1</a></div><div  class="vyberZe3Radek" > <a href="#">Option 2</a></div >
          <div class="vyberZe3Radek"><a href="#">Option 3</a></div>`;
      return;
    }
    let trojiceSlov
    let prekladanaDvojice
    this.#prihlasenyUzivatel.ukol4VyresenoSpravne = true;
    let pokracovat = false
    while (pokracovat == false) {
      if (this.#prihlasenyUzivatel.probihaTest == false) pokracovat = true;
      let nahodne = Math.random();
      if (nahodne < 0.4 && this.#prihlasenyUzivatel.probihaTest == false && this.#prihlasenyUzivatel.slovickaVetsiSance.length > 3) {
        trojiceSlov = _.sampleSize(this.#prihlasenyUzivatel.slovickaVetsiSance, 3);
      }
      else {
        trojiceSlov = _.sampleSize(this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce], 3);
      }
      prekladanaDvojice = trojiceSlov[0]
      this.#prihlasenyUzivatel.arr4 = prekladanaDvojice;
      this.#prihlasenyUzivatel.vyberPrekladuSpravne = trojiceSlov[0][0];
      if (!this.#prihlasenyUzivatel.slovaVTestu.includes(this.#prihlasenyUzivatel.vyberPrekladuSpravne)) {
        pokracovat = true;
      }
    }
    this.#prihlasenyUzivatel.slovaVTestu.push(this.#prihlasenyUzivatel.vyberPrekladuSpravne);
    let text = "";
    trojiceSlov[0][1].forEach(function (slovo, index) {
      if (index == (trojiceSlov[0][1].length - 1)) {
        text += slovo;
      }
      else {
        text += slovo;
        text += ", "
      }
    })
    slovoVyberZe3.textContent = text;
    trojiceSlov = _.shuffle(trojiceSlov);
    vyberZe3Kontejner.innerHTML = "";
    trojiceSlov.forEach(function (dvojice) {
      let html = `<div class="vyberZe3Radek"><a href="#">${dvojice[0]}</a></div>`;
      vyberZe3Kontejner.innerHTML += html;
    })
  }


  kontrolaJazyk1Jazyk2(e) {
    e.preventDefault();
    if (!this.#prihlasenyUzivatel.prekladaneSlovoHledane1 || !this.#prihlasenyUzivatel.soucasnaLekce) {
      return
    }
    let hledaneSlovo;
    let slovoUzivatel;
    if (this.#prihlasenyUzivatel.caseSensitive == true) {
      hledaneSlovo = this.#prihlasenyUzivatel.prekladaneSlovoHledane1;
      slovoUzivatel = preklad1.value
    }
    else {
      hledaneSlovo = this.#prihlasenyUzivatel.prekladaneSlovoHledane1.toLowerCase();
      slovoUzivatel = preklad1.value.toLowerCase();
    }
    if (slovoUzivatel !== hledaneSlovo) {
      //console.log("spatne");
      this.#prihlasenyUzivatel.ukol1VyresenoSpravne = false;
      if (this.porovnaniRetezcu(hledaneSlovo, slovoUzivatel) > 1) {
        if (this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce].includes(this.#prihlasenyUzivatel.arr1) && !(this.#prihlasenyUzivatel.slovickaVetsiSance.includes(this.#prihlasenyUzivatel.arr1))) {
          this.#prihlasenyUzivatel.slovickaVetsiSance.push(this.#prihlasenyUzivatel.arr1);
        }
        this.#prihlasenyUzivatel.ukol1PulBodu = false;
      }
      preklad1.value = this.#prihlasenyUzivatel.prekladaneSlovoHledane1;
    }
    else if (slovoUzivatel === hledaneSlovo) {
      if (this.#prihlasenyUzivatel.ukol1VyresenoSpravne === true) {
        //console.log("spravne");
        this.#prihlasenyUzivatel.pocetSpravnychOdpovedi += 1;
        if (this.#prihlasenyUzivatel.slovickaVetsiSance.includes(this.#prihlasenyUzivatel.arr1)) {
          _.pull(this.#prihlasenyUzivatel.slovickaVetsiSance, this.#prihlasenyUzivatel.arr1);
          //console.log(this.#prihlasenyUzivatel.slovickaVetsiSance);
        }
      }
      else if (this.#prihlasenyUzivatel.ukol1VyresenoSpravne === false) {
        //console.log("spatne, pokracujeme");
        if (this.#prihlasenyUzivatel.probihaTest == true && this.#prihlasenyUzivatel.ukol1PulBodu == true) {
          this.#prihlasenyUzivatel.pocetSpravnychOdpovedi += 0.5;
        }
        //console.log(this.#prihlasenyUzivatel.slovickaVetsiSance);
      }
      preklad1.value = "";
      this.#prihlasenyUzivatel.pocetZodpovezenychOtazek += 1;
      this.kontrolaUkonceniTestu();
      this.generovaniPrekladJazyk1Jazyk2(e);
    }
  }

  kontrolaJazyk2Jazyk1(e) {
    e.preventDefault();
    if (!this.#prihlasenyUzivatel.prekladaneSlovoHledane2 || !this.#prihlasenyUzivatel.soucasnaLekce) {
      return
    }
    let hledaneSlovo;
    let slovoUzivatel;
    if (this.#prihlasenyUzivatel.caseSensitive == true) {
      hledaneSlovo = this.#prihlasenyUzivatel.prekladaneSlovoHledane2;
      slovoUzivatel = preklad2.value
    }
    else {
      hledaneSlovo = [...this.#prihlasenyUzivatel.prekladaneSlovoHledane2].map(function (slovo) { return slovo.toLowerCase(); });
      slovoUzivatel = preklad2.value.toLowerCase();
    }


    if (!hledaneSlovo.includes(slovoUzivatel)) {
      //console.log("spatne");
      this.#prihlasenyUzivatel.ukol2VyresenoSpravne = false;
      let porovnani = this.porovnaniRetezcu;
      let skorospravne = hledaneSlovo.find(function (slovo) {
        return porovnani(slovo, slovoUzivatel) <= 1;
      })
      if (!skorospravne) {
        if (this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce].includes(this.#prihlasenyUzivatel.arr2) && !(this.#prihlasenyUzivatel.slovickaVetsiSance.includes(this.#prihlasenyUzivatel.arr2))) {
          this.#prihlasenyUzivatel.slovickaVetsiSance.push(this.#prihlasenyUzivatel.arr2);
        }
        this.#prihlasenyUzivatel.ukol2PulBodu = false;
      }
      preklad2.value = this.#prihlasenyUzivatel.prekladaneSlovoHledane2[0];
    }
    else if (hledaneSlovo.includes(slovoUzivatel)) {
      if (this.#prihlasenyUzivatel.ukol2VyresenoSpravne === true) {
        //console.log("spravne");
        this.#prihlasenyUzivatel.pocetSpravnychOdpovedi += 1;
        if (this.#prihlasenyUzivatel.slovickaVetsiSance.includes(this.#prihlasenyUzivatel.arr2)) {
          _.pull(this.#prihlasenyUzivatel.slovickaVetsiSance, this.#prihlasenyUzivatel.arr2);
          //console.log(this.#prihlasenyUzivatel.slovickaVetsiSance);
        }
      }
      else if (this.#prihlasenyUzivatel.ukol2VyresenoSpravne === false) {
        //console.log("spatne, pokracujeme");
        if (this.#prihlasenyUzivatel.probihaTest == true && this.#prihlasenyUzivatel.ukol2PulBodu == true) {
          this.#prihlasenyUzivatel.pocetSpravnychOdpovedi += 0.5;
        }
        //console.log(this.#prihlasenyUzivatel.slovickaVetsiSance);
      }
      preklad2.value = "";
      this.#prihlasenyUzivatel.pocetZodpovezenychOtazek += 1;
      this.kontrolaUkonceniTestu();
      this.generovaniPrekladJazyk2Jazyk1(e);
    }

  }

  kontrolaSibenice(e) {
    e.preventDefault();
    if (!this.#prihlasenyUzivatel.slovoSibenice || !this.#prihlasenyUzivatel.soucasnaLekce) {
      return
    }
    let sibenicepismena;
    let pismenoUzivatel;
    if (this.#prihlasenyUzivatel.caseSensitive == true) {
      console.log(this.#prihlasenyUzivatel);
      sibenicepismena = [...this.#prihlasenyUzivatel.sibenicePismena];
      pismenoUzivatel = sibenice.value
    }
    else {
      sibenicepismena = [...this.#prihlasenyUzivatel.sibenicePismena].map(function (slovo) { return slovo.toLowerCase(); });
      pismenoUzivatel = sibenice.value.toLowerCase();
    }
    if (!sibenicepismena.includes(pismenoUzivatel)) {
      //console.log("Spatne pismeno")
      this.#prihlasenyUzivatel.ukol3VyresenoSpravne = false;
      if (!this.#prihlasenyUzivatel.sibenicePismenaSpatne.includes(sibenice.value)) {
        this.#prihlasenyUzivatel.sibenicePismenaSpatne.push(sibenice.value)
      };
    }
    else if (sibenicepismena.includes(pismenoUzivatel)) {
      //console.log("Spravne pismeno")
      if (this.#prihlasenyUzivatel.caseSensitive == true) {
        if (!this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.includes(sibenice.value)) {
          this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.push(sibenice.value)
        }
      }
      else {
        if (!this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.includes(pismenoUzivatel) && this.#prihlasenyUzivatel.sibenicePismena.includes(pismenoUzivatel)) {
          this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.push(pismenoUzivatel)
        }
        if (!this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.includes(pismenoUzivatel.toUpperCase()) && this.#prihlasenyUzivatel.sibenicePismena.includes(pismenoUzivatel.toUpperCase())) {
          this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.push(pismenoUzivatel.toUpperCase)
        }
      }
    }
    if (this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.length === this.#prihlasenyUzivatel.sibenicePismena.length) {
      //console.log("Slovo uhodnuto");
      if (this.#prihlasenyUzivatel.ukol3VyresenoSpravne === true) {
        this.#prihlasenyUzivatel.pocetSpravnychOdpovedi += 1;
        if (this.#prihlasenyUzivatel.slovickaVetsiSance.includes(this.#prihlasenyUzivatel.arr3)) {
          _.pull(this.#prihlasenyUzivatel.slovickaVetsiSance, this.#prihlasenyUzivatel.arr3);
          //console.log(this.#prihlasenyUzivatel.slovickaVetsiSance);
        }
      }
      else {
        if (this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce].includes(this.#prihlasenyUzivatel.arr3) && !(this.#prihlasenyUzivatel.slovickaVetsiSance.includes(this.#prihlasenyUzivatel.arr3))) {
          this.#prihlasenyUzivatel.slovickaVetsiSance.push(this.#prihlasenyUzivatel.arr3);
        }
        //console.log(this.#prihlasenyUzivatel.slovickaVetsiSance);
      }
      this.#prihlasenyUzivatel.pocetZodpovezenychOtazek += 1;
      this.kontrolaUkonceniTestu();
      return this.generovaniSibenice(e)
    }
    sibenice.value = "";
    let sibeniceZobrazeni = "";
    for (let i = 0; i < this.#prihlasenyUzivatel.slovoSibenice.length; i++) {
      if (this.#prihlasenyUzivatel.sibenicePismenaUhodnuta.includes(this.#prihlasenyUzivatel.slovoSibenice[i])) {
        sibeniceZobrazeni += this.#prihlasenyUzivatel.slovoSibenice[i]
      }
      else {
        sibeniceZobrazeni += "_"
      }
    }
    slovoSibenice.textContent = sibeniceZobrazeni;

  }

  kontrolaVyberPrekladu(e) {
    e.preventDefault();
    if (!this.#prihlasenyUzivatel.vyberPrekladuSpravne || !this.#prihlasenyUzivatel.soucasnaLekce) {
      return
    }
    let vybraneSlovo;
    try {
      vybraneSlovo = e.target.closest("a").textContent;
      if (vybraneSlovo !== this.#prihlasenyUzivatel.vyberPrekladuSpravne) {
        this.#prihlasenyUzivatel.ukol4VyresenoSpravne = false;
        e.target.closest(".vyberZe3Radek").classList.add("vyberZe3RadekSpatne");
        //console.log("Spatne");
      }
      else if (vybraneSlovo === this.#prihlasenyUzivatel.vyberPrekladuSpravne) {
        //console.log("Spravne");
        if (this.#prihlasenyUzivatel.ukol4VyresenoSpravne === true) {
          if (this.#prihlasenyUzivatel.slovickaVetsiSance.includes(this.#prihlasenyUzivatel.arr4)) {
            _.pull(this.#prihlasenyUzivatel.slovickaVetsiSance, this.#prihlasenyUzivatel.arr4);
            //console.log(this.#prihlasenyUzivatel.slovickaVetsiSance);
          }
          this.#prihlasenyUzivatel.pocetSpravnychOdpovedi += 1;
        }
        else {
          if (this.#prihlasenyUzivatel.slovicka[this.#prihlasenyUzivatel.soucasnyJazyk][this.#prihlasenyUzivatel.soucasnaLekce].includes(this.#prihlasenyUzivatel.arr4) && !(this.#prihlasenyUzivatel.slovickaVetsiSance.includes(this.#prihlasenyUzivatel.arr4))) {
            this.#prihlasenyUzivatel.slovickaVetsiSance.push(this.#prihlasenyUzivatel.arr4);
          }
          //console.log(this.#prihlasenyUzivatel.slovickaVetsiSance);
        }
        this.#prihlasenyUzivatel.pocetZodpovezenychOtazek += 1;
        this.kontrolaUkonceniTestu();
        this.generovaniVyberPrekladu(e);
      }
    }
    catch (error) {
      //console.log(error, "You clicked between the boxes!");
    }

  }

}

let aplikace1 = new Aplikace;
