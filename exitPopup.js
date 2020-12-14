class ExitPopup {
    constructor() {
        this.el = document.querySelector('#exit-popup')
        this.closeEl = document.querySelector('#close-exit-popup')
        this.closeEl.addEventListener('click', () => {
            this.closeModal()
        })
        // this.time_end = localStorage.getItem('ng_exit_popup_time_to')
        this.time_end = localStorage.getItem('ng_exit_popup_time_to') ?
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
        // console.log(this.time_end - current)
        return Math.floor((this.time_end - current) / 1000)
    }

    // readLocalStorage() {
    //     return localStorage.getItem('ng_exit_popup_timer')
    // }

    check() {
        const readLocalStorage = localStorage.getItem('ng_exit_popup_timer')
        if (readLocalStorage === 'none' || readLocalStorage == undefined) {
            if (readLocalStorage == undefined) {
                localStorage.setItem('ng_exit_popup_timer', 'none')
                // console.log(this.timeLeft())
            }
            const a = new Date().getTime() + (1000*20)
            // localStorage.setItem('ng_exit_popup_time_to', a)
            localStorage.setItem('time-left', this.timeLeft())
            // this.time_end = a
            this.openModal()
        } else {
            if (this.timeLeft > 0) {
                this.startTimer()
            }
            else {
                this.openModal()
            }
        }
    }

    openModal() {
        const readLocalStorage = localStorage.getItem('ng_exit_popup_timer')
        const el = this.el
        document.addEventListener('mouseleave', function(cursor) {
            if (readLocalStorage === 'none')  {
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
