'use strict';

const btnprihlasit = document.getElementById("prihlasitSe");
const btnregistrovat = document.getElementById("registrovat");
const btnlogout = document.getElementById("logout");
const btnStartTest = document.getElementById("startTest");






export let jazykStranka
jazykStranka = "anglictina";

if (navigator.language.startsWith("cs")) {
  jazykStranka = "cestina";
}

function prekladDoCestiny() {
  let preklady = {
    "Welcome to Langlet, your vocabulary learning helper. Langlet helps you to organize, practise, test and also share the vocabulary with friends. Let's get started now, by Loggin-in or Signing-up.": "Vítejte na stránce Langlet, pomocníka při učení se slovní zásoby. Prostřednictvím Langlet si můžete procvičovat a testovat slovní zásobu a také ji sdílet s přáteli. Začněte přihlášením nebo registrací.",
    "Log-in": "Přihlášení",
    "Sign-up": "Registrace",
    "Password": "Heslo",
    "Confirm password": "Potvrdit heslo",
    "Username": "Uživatelské jméno",
    "Language:": "Jazyk",
    "Lesson:": "Lekce",
    "Exercise 1": "Cvičení 1",
    "Exercise 2": "Cvičení 2",
    "Exercise 3": "Cvičení 3",
    "Exercise 4": "Cvičení 4",
    "Test mode": "Nastavení testu",
    "Number of words in test:": "Počet slov v testu",
    "Start test": "Spustit test",
    "Delete old test results": "Smazat staré záznamy testů",
    "Test is ": "Test právě",
    "undergoing": "probíhá",
    "Currently testing ": "právě se testuje ",
    "Vocabulary overview": "Přehled tslovíček",
    "Delete on right-click": "Smazat stisknutím pravého tlačítka",
    "← Go back": "← Zpět",
    "Tests results": "Výsledky testů"

  }


  if (jazykStranka == "cestina") {
    let elements = document.querySelectorAll(':not(script):not(style)');
    elements.forEach(function (el) {
      let anglickyText = el.textContent.trim();
      let ceskyText = preklady[anglickyText];
      if (ceskyText) {
        el.textContent = ceskyText;
      }
    })
    btnprihlasit.value = "Přihlásit";
    btnregistrovat.value = "Registrovat";
    btnlogout.value = "Odhlásit se";
  }
}


prekladDoCestiny();