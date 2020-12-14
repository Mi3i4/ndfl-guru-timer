class ExitPopup {
    constructor() {
        this.el = document.querySelector('#exit-popup')
        this.closeEl = document.querySelector('#close-exit-popup')
        this.readLocalStorage = localStorage.getItem('ng_exit_popup_timer')

        this.closeEl.addEventListener('click', () => {
            this.closeModal()
        })
        this.time_end = localStorage.getItem('ng_exit_popup_time_to')
            ?
            localStorage.getItem('ng_exit_popup_time_to') : function (){
                const a = new Date().getTime() + (1000*10);
                localStorage.setItem('ng_exit_popup_time_to', a);
                return a;
            }();
        this.check()
        // if (this.readLocalStorage()) {
        //     this.startTimer()
        // }
        // else {
        //     this.openModal()
        // }
    }

    timeLeft() {
        let current = new Date().getTime();
        return Math.floor((this.time_end - current) / 1000)
    }

    check() {
        if (this.readLocalStorage !== 'start') {
            localStorage.setItem('ng_exit_popup_timer', 'none')
            // const a = new Date().getTime() + (1000*20)
            // localStorage.setItem('ng_exit_popup_time_to', a)
            localStorage.setItem('time-left', this.timeLeft())
            // this.time_end = a
            this.openModal();
        } else {
            if (this.timeLeft > 0) {
                this.startTimer()
            }
            if(this.timeLeft == 0) {
                this.stopTimer()
            }
            else {
                this.openModal()
            }
        }
    }

    openModal() {
        const el = this.el
        document.addEventListener('mouseleave', function(cursor) {
            if (this.readLocalStorage === 'none')  {
                if (cursor.clientY < 10){
                    el.style.display = 'block'
                }
            }
        });
    }

    closeModal() {
        const el = this.el
        el.style.display = 'none'
        this.startTimer()
    }

    startTimer() {
        localStorage.setItem('ng_exit_popup_timer', 'start')
        return setInterval(this.check, 1000)
    }

    stopTimer() {
        clearInterval(this.startTimer())
        localStorage.clear()
    }

}

let exitPopup = new ExitPopup()
