class RegButtonsEvents {
    constructor(button, url) {
        this.url = url
        this.button = button
        this.Init(url)
    }
    Init(url) {
        let el = Array.from(this.button).filter(i => i.id.endsWith('-button'))
        el.forEach(i => i.addEventListener('click', (e) => {
            e.preventDefault()
            this.sendToAmplitude(e);
            this.utm = this.getCookie('NG-UTM')
            window.open(url + `/?`+ this.utm, '_blank');
            window.focus();
        }))
    }
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    sendToAmplitude(e) {
        switch (e.target.id) {
            case 'main-button':
                amplitude.getInstance().logEvent('click-main-button')
                break
            case 'offer-ndfl-button':
                amplitude.getInstance().logEvent('click-offer-ndfl-button')
                break
            case 'offer-tariff-button':
                amplitude.getInstance().logEvent('click-offer-tariff-button')
                break
            case 'menu-button':
                amplitude.getInstance().logEvent('click-menu-button')
                break
        }
    }
}
window.addEventListener('load', () => {
    const url = 'https://app.ndfl.guru/registration'
    const obj = new RegButtonsEvents(document.querySelectorAll('a'), url)
})

