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
            // console.log(this.setUtmForService())
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
                amplitude.getInstance().logEvent('click_create_declaration')
                gtag('event', 'click_create_declaration', { 'event_category': 'browse' });
                break
            case 'offer-ndfl-button':
                amplitude.getInstance().logEvent('click_create_declaration_offer_ndfl')
                gtag('event', 'click_create_declaration_offer_ndfl', { 'event_category': 'browse' })
                break
            case 'offer-tariff-button':
                amplitude.getInstance().logEvent('click_offer_tariff_button')
                gtag('event', 'click_offer_tariff_button', { 'event_category': 'browse' })
                break
            case '3ndfl_details':
                amplitude.getInstance().logEvent('click_3ndfl_details_button')
                gtag('event', 'click_3ndfl_details_button', { 'event_category': 'browse' })
                break
            case 'personal_details':
                amplitude.getInstance().logEvent('click_personal_details_button')
                gtag('event', 'click_personal_details_button', { 'event_category': 'browse' })
                break
            case 'unit_linked_details':
                amplitude.getInstance().logEvent('click_unit_linked_details_button')
                gtag('event', 'click_unit_linked_details_button', { 'event_category': 'browse' })
                break
            case 'currency_details':
                amplitude.getInstance().logEvent('click_currency_details_details_button')
                gtag('event', 'click_currency_details_button', { 'event_category': 'browse' })
                break
            case 'kik_details':
                amplitude.getInstance().logEvent('click_kik_details_button')
                gtag('event', 'click_kik_details_button', { 'event_category': 'browse' })
                break
            case 'example_main':
                amplitude.getInstance().logEvent('click_example_main_button')
                gtag('event', 'click_example_main_button', { 'event_category': 'browse' })
                break
            case 'example_3ndfl':
                amplitude.getInstance().logEvent('click_example_3ndfl_button')
                gtag('event', 'click_example_3ndfl_button', { 'event_category': 'browse' })
                break
            case 'help_button':
                amplitude.getInstance().logEvent('click_help_button_button')
                gtag('event', 'click_help_button', { 'event_category': 'browse' })
                break
            case 'menu-button':
                amplitude.getInstance().logEvent('click-menu-button')
                gtag('event', 'click-menu-button', { 'event_category': 'browse' })
                break
        }
    }
}
window.addEventListener('load', () => {
    const url = 'https://app.ndfl.guru/registration'
    const obj = new RegButtonsEvents(document.querySelectorAll('a'), url)
})
