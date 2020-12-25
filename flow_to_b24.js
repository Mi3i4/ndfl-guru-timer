class Flow_to_b24 {
    constructor() {

    }

    e_log() {
        document.addEventListener('submit', (e) => {
            const elem = e.target
            console.log(elem)
            const x = elem.closest(window.document)
            console.log(x)
            console.log(e);
        })
    }
}

const obj = new Flow_to_b24()
console.log(obj.e_log());
