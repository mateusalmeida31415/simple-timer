//Timer
const durationInput = document.querySelector("#duration");
//Botoes 
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
//Circulo
const circle = document.querySelector("#circle");
//Circulo constantes
const R = circle.getAttribute("r");
const PERIMETER = 2*Math.PI*R
circle.setAttribute("stroke-dasharray", PERIMETER);

let offset = null; 
let totalDurantion = null;

new Timer(durationInput, startButton, pauseButton, {
    onStart(infoDuration)  {
        const {duration, durationChange} = infoDuration;
        if(durationChange || !totalDurantion){
            totalDurantion = duration;
        }
    },
    onTick(timeRemaning) {
        offset = (PERIMETER*timeRemaning)/totalDurantion - PERIMETER;
        circle.setAttribute("stroke-dashoffset", offset);
    },
    onCompleted() {
        circle.setAttribute("stroke-dashoffset", PERIMETER);
    },
});


