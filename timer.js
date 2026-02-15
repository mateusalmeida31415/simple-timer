class Timer{
    constructor(durationInput, startButton, pauseButton, callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onCompleted = callbacks.onCompleted;
        }


        this.durationInput.addEventListener("change", this.onDurationChange);
        this.startButton.addEventListener("click", this.start);
        this.pauseButton.addEventListener("click", this.pause);
    }

    start = () => {
        if(!this.onStart){
            return;
        }

        if(this.durationChange){
            this.onStart({duration: this.timeLeft, durationChange:true});
            this.durationChange = false;
        }else{
            this.onStart({duration: this.timeLeft, durationChange:false});
        }
        this.tick();
        this.intervalID = setInterval(this.tick, 20);
        this.timerHasStart();
    }

    pause = () => {
        clearInterval(this.intervalID);
        this.timerHasStop();
    }

    onDurationChange = () => {
        this.timeLeft = this.timeLeft;
        this.durationChange = true;
    }

    tick = () => {
        if(this.timeLeft === 0){
            this.pause();
            if(this.onCompleted){
                this.onCompleted();
            }
            return;
        }

        if(this.onTick){
            this.onTick(this.timeLeft);
        }

        this.timeLeft = this.timeLeft - 0.02;
    }

    timerHasStart(){
        this.durationInput.disabled = true;
        this.startButton.disabled = true;
    }

    timerHasStop(){
        this.durationInput.disabled = false;
        this.startButton.disabled = false;
    }

    // Com os metodos get e set fica mais facil armazenar o timer 
    // fora da classe, atualizado o valor com base no input 
    get timeLeft(){
        return parseFloat(this.durationInput.value);
    }

    set timeLeft(time){
        this.durationInput.value = time.toFixed(2);
    }
}