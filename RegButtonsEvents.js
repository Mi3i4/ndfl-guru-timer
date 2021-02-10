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
            console.log(this.setUtmForService())
            window.open(url + this.setUtmForService(), '_blank');
            window.focus();
        }))
    }
    setUtmForService() {
        const utm = this.getCookie('NG-UTM')
        const goo_cId = ga.getAll()[0].get('clientId')
        const url_data = {
            utm,
            goo_cId,
        }
        let res_url = '?'
        Object.keys(url_data).forEach((i, index) => {
            if (index === Object.keys(url_data).length -1) {
                res_url += `${i} = ${url_data[i]}`
            }else {
                res_url += `${i} = ${url_data[i]}&`
            }
        })
        return res_url
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
