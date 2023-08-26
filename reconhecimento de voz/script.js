const textarea = document.querySelector("#textarea");
const btnGravar = document.querySelector("#btnGravar");
const btnParar = document.querySelector("#btnParar");
const btnBaixar = document.querySelector("#btnBaixar");
const btnLimpar = document.querySelector("#btnLimpar");

class speechApi{
    constructor(){
        const SpeechToText = window.SpeechRecogniton || window.webkitSpeechRecognition;

        this.speechApi = new SpeechToText();
        this.output = textarea.output;
        this.speechApi.continuous = true;
        this.speechApi.lang = 'pt-BR', "en-US";

        this.speechApi.onresult = e =>{
            var resultIndex = e.resultIndex;
            var transcript = e.results[resultIndex][0].transcript;

            textarea.value += transcript;
        }
    }

    start() {
        this.speechApi.start();
    }

    stop(){
        this.speechApi.stop();
    }
}

var speech = new speechApi();

btnGravar.addEventListener('click', () => {
    btnGravar.disabled = true;
    btnParar.disabled = false;
    speech.start();
})

btnParar.addEventListener("click", () => {
  btnParar.disabled = true;
  btnGravar.disabled = false;
  speech.stop();
});

btnBaixar.addEventListener('click', ()=> {
    var text = textarea.value;
    var fileName = 'speech.txt';

    download(text, fileName);
})

function download(text, fileName){
    var element = document.createElement('a');

    element.setAttribute('href', 'data:text/plaincharset=utf-8, ' + encodeURIComponent(text));

    element.setAttribute('download', fileName);
    element.style.display ='none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

}

btnLimpar.addEventListener('click', () => {
    textarea.value = '';
    btnGravar.disabled = false;
    btnParar.disabled = true;
    speech.stop();
})