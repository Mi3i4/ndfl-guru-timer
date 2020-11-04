class ExitPopup {
    constructor(el) {
        this.el = document.querySelector('#close-exit-popup');
        if (this.readLocalStorage()) {
            this.startTimer();
        }
        else {
            this.openModal();
        }
    }
    timeLeft() {
        let current = new Date().getTime();
        return Math.floor((this.time_end - current) / 1000);
    }
    readLocalStorage() {
        //return boolean
    }

    saveLocalStorage() {

    }

    openModal() {

    }

    closeModal() {

    }

    startTimer() {

    }
}
