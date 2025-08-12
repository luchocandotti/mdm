let menuState = 0
const btnmenu = document.getElementById('btn-movil')
const imenu = document.querySelector('#btn-movil i')
const menu = document.getElementById('movil')
const body = document.getElementById('intro')
const tapa = document.querySelector('.tapa')

btnmenu.addEventListener('click', () => {
    if (menuState === 0) {
        document.documentElement.style.overflow = 'hidden'
        menu.style.transform = 'translateY(0vh)'
        imenu.classList.add('bi-x-lg')
        imenu.classList.remove('bi-list')
        tapa.classList.add('d-none')
        tapa.classList.remove('d-block')
        body.style.marginTop = '50vh'
        menuState = 1
    } else {
        document.documentElement.style.overflow = ''
        menu.style.transform = 'translateY(-50vh)'
        imenu.classList.add('bi-list')
        imenu.classList.remove('bi-x-lg')
        body.style.marginTop = '0'
        menuState = 0
        setTimeout(() => {
            tapa.classList.add('d-block')
            tapa.classList.remove('d-none')
        }, 600)
    }
})