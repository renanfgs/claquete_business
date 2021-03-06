//snippet Firebase Realtime Database
var config = {
  apiKey: "AIzaSyDXEKD6kYZi3rCVnOevylXnHDbM8gDqemw",
  authDomain: "claquete-3176f.firebaseapp.com",
  databaseURL: "https://claquete-3176f.firebaseio.com",
  projectId: "claquete-3176f",
  storageBucket: "claquete-3176f.appspot.com",
  messagingSenderId: "138161165527"
};
firebase.initializeApp(config);

//reference messages collection
var LeadsRef = firebase.database().ref("leads");

//função para pegar o IP
(function () {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", 'https://api.ipify.org?format=json');
  xmlhttp.send();
  xmlhttp.onload = () => {
    const {
      ip
    } = JSON.parse(xmlhttp.response);
    document.getElementById('ip').value = ip;
  }
})();

//listen
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("contactForm").addEventListener("submit", submitForm);
}, false);

//funcao pega no formato YYYY-MM-DD hh:mm:ss
function LoadDate(d) {
  d = new Date(d.getTime());
  var date_format_str = d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length == 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length == 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " +

    (d.getHours().toString().length == 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" +

    ((parseInt(d.getMinutes())).toString().length == 2 ? (parseInt(d.getMinutes())).toString() : "0" + (parseInt(d.getMinutes())).toString()) + ":" +

    ((parseInt(d.getSeconds())).toString().length == 2 ? (parseInt(d.getSeconds())).toString() : "0" + (parseInt(d.getSeconds())).toString());
  return date_format_str;
}

//Enviar o formulário
function submitForm(e) {
  e.preventDefault();

  //Pegar os valores
  var name = getIputVal("name");
  var email = getIputVal("email");

  //Data YYYY-MM-DD hh:mm:ss
  var date_format_str = LoadDate(new Date());

  //pegar o valor de IP aqui ??????????????????
  var ip = getIputVal("ip");

  //recebe o endereço de email e faz split apos o @
  var dominio = email;
  var possible_emails = ["gmail.com", "gmail.com.br", "outlook.com", "outlook.com.br", "live.com", "live.com.br",
       "uol.com", "uol.com.br", "icloud.com", "icloud.com.br", "yahoo.com", "yahoo.com.br",
       "ig.com", "ig.com.br", "globo.com", "globomail.com.br", "globomail.com", "bol.com.br",
       "aol.com.br", "hotmail.com", "hotmail.com.br"]
  //split email e dominio
  dominio = dominio.split("@");

  //testa dominios conhecidos para B2B ou B2C
  if (possible_emails.includes(dominio[1])) {
    var tipo = "B2C";
  } else {
    var tipo = "B2B";
  }

  //Salvar a mensagem no banco
  gravaLeads(name, email, date_format_str, tipo, ip);

  var allEbooks = document.getElementById("ebooks");
  var ebook = allEbooks.options[allEbooks.selectedIndex].value;
  document.getElementById("contactForm").reset();
  window.location = "/agradecimento?ebook=" + ebook;
}

//Função para pegar os valores
function getIputVal(id) {
  return document.getElementById(id).value;
}

//Funcao grava dados no Firebase
function gravaLeads(name, email, date, tipo, ip) {
  const newLeadRef = LeadsRef.push();

  newLeadRef.set({
    email,
    name,
    ip,
    tipo,
    date,
  })
}