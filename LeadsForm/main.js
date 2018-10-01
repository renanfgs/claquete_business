
    
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

//listen
document.getElementById("contactForm").addEventListener("submit",submitForm);

//Enviar o formulário
    function submitForm(e){
        e.preventDefault();

        //Pegar os valores
        var name=getIputVal("name");
        var email=getIputVal("email");
        
        //Data YYYY-MM-DD hh:mm:ss
        var d = new Date();
        d = new Date(d.getTime() - 3000000);
        var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
        console.log(date_format_str);
        
        //pegar o valor de IP aqui ??????????????????
        //var ip=getIputVal("ip");
        
        
        //recebe o endereço de email e faz split apos o @
        var dominio = email;
        dominio = dominio.split("@");
        console.log(dominio[1]);
        
        //testa dominios conhecidos para B2B ou B2C
        if (dominio[1] == "gmail.com" || dominio[1] == "hotmail.com" || dominio[1] == "outlook.com" || dominio[1] == "live.com" || dominio[1] == "uol.com.br" || dominio[1] == "ig.com.br" || dominio[1] == "globomail.com" || dominio[1] == "icloud.com" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br" || dominio[1] == "yahoo.com.br"){
            var tipo="B2B";
            console.log(tipo);
        }
        else {
            var tipo="B2C";
              console.log(tipo); 
        }

        //Salvar a mensagem no banco
        gravaLeads(name,email,date_format_str,tipo);

        //Alerta de dado enviado
        document.querySelector(".alert").style.display="block";

        //Oculat o alerta após 3 segundos
        setTimeout(function(){
            document.querySelector(".alert").style.display = "none";},3000);

        //Resetar o formulário
        document.getElementById("contactForm").reset();
    }

//Função para pegar os valores
    function getIputVal(id){
        return document.getElementById(id).value;
    }

//Funcao grava dados no Firebase
function gravaLeads(name,email,date_format_str, tipo){
    var newLeadRef = LeadsRef.push();
    newLeadRef.set({
        name:name,
        email:email,
        date:date_format_str,
        tipo:tipo,
        //ip:ip,   ??????????????????
    })
}
