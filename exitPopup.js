class ExitPopup {
    constructor(el, close_id, timer) {
        this.el = document.querySelector(el);
        this.closeEl = this.el.querySelector(close_id);
        this.timer = timer;
        this.time_end = localStorage.getItem('ng_exit_popup_time_to');
        document.addEventListener('mouseout', (cursor) => {
            this.time_end = localStorage.getItem('ng_exit_popup_time_to');
            if (this.timeLeft(this.time_end) <= 0) {
                if (cursor.clientY < 10) {
                    this.openModal();
                }
            }
        })
        if (this.time_end == undefined) {
            this.startTimer();
        }
    }
    /**
     *
     * @param el {string} id попака
     * @param close_id {string} id кнопки закрытия
     * @param timer {number} Время жизни таймера в секундах
     */
    static Init(el, close_id, timer) {
        new ExitPopup(el, close_id, timer);
    }

    timeLeft(time_end) {
        let current = new Date().getTime();
        return (time_end - current);
    }

    openModal() {
        this.el.style.display = 'block';
        this.closeEl.addEventListener('click', () => {
            this.closeModal();
        })
    }

    closeModal() {
        this.el.style.display = 'none';
        this.startTimer();
    }

    startTimer() {
        const a = new Date().getTime() + (1000*this.timer);
        localStorage.setItem('ng_exit_popup_time_to', a);
    }
}

//ExitPopup.Init('#exit-popup', '#close-exit-popup', 60*60*24);
window.s = new ExitPopup('#exit-popup', '#close-exit-popup', 60*60*24);
