class Flow_to_b24 {
    constructor(forms, host) {
        this.forms = forms
        this.host = host
        this.getUTM()
        this.init()
    }

    init() {
        this.forms.forEach((i) => {
            i.addEventListener('submit', (e) => {
                e.preventDefault()
                this.sendToB24(e)
            })
        })
    }

    //Установка cookie
   setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        }
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }
    //Получение cookie
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    //Получение UTM из URL
    getUTMFromUrl() {
        const url = window.location
        // const url = 'http://ndfl.guru/?utm_source=yandex&utm_medium=cpc&utm_campaign=%D0%BF%D0%BE%D0%B8%D1%81%D0%BA&utm_content=1234&utm_term=%D0%B4%D0%B5%D0%BA%D0%BB%D0%B0%D1%80%D0%B0%D1%86%D0%B8%D1%8F+3+%D0%BD%D0%B4%D1%84%D0%BB'
        let utm_native = Array.from(new URL(url).searchParams)
            .filter(n => n[0].startsWith('utm_'))
        if(utm_native.length === 0) return undefined
        const utm = utm_native.reduce((acc, n) => ({...acc, [n[0].slice(4)]: n[1]}), {})
        this.setCookie('NG-UTM', JSON.stringify(utm))
        return JSON.stringify(utm)
    }
    //Получение UTM из Cookie
    getUtmFromCookie() {
        if(this.getCookie('NG-UTM')){
            return JSON.parse(this.getCookie('NG-UTM'))
        }
        return null
    }
    //Получение UTM
    getUTM() {
        const getUTMFromUrl = this.getUTMFromUrl()
        if(getUTMFromUrl == undefined) {
            return this.getUtmFromCookie()
        }
        return getUTMFromUrl
    }
    //Получение данных формы
    getFormData(e) {
        let data = new FormData(e.target)
        if (e.target.id === 'vip-form' || e.target.id === 'curRec-form' || e.target.id === 'unit-form') {
            return {
                id: e.target.id,
                form_name: e.target.dataset.name,
                user_connect_type: data.get('comm-type'),
                user_name: data.get('user-name'),
                user_contact: data.get('contact')
            }
        } else if (e.target.id === 'wf-form-call-order'){
            return {
                id: e.target.id,
                form_name: e.target.dataset.name,
                user_name: data.get('user-name'),
                user_phone: data.get('user-phone')
            }
        } else {
            return {
                id: e.target.id,
                form_name: e.target.dataset.name,
                brokers: data.get('brokers'),
                user_email: data.get('exitPopup-email')
            }
        }
    }
    getGoogleClientId() {
        return ga.getAll()[0].get('clientId')
        // const clientId = document.cookie
    }
    sendToB24(e) {
        const data_to_send = {
            utm: this.getUTM(),
            clientId: this.getGoogleClientId(),
            formData: this.getFormData(e),
        }
        const body = JSON.stringify(data_to_send)
        fetch(this.host, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        }).then(
            (i) => {
                console.log(i);
            })
    }
}

window.addEventListener('load', () => {
    const host = 'https://portal.finoscope.tech/rest/6/hnxkl6czz0lk0570/finoscope.ndflGuruFormSubmit'
    const obj = new Flow_to_b24(document.querySelectorAll(`form`), host)
})
