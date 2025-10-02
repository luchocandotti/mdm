let menuState = 0
const btnmenu = document.getElementById('btn-movil')
const imenu = document.querySelector('#btn-movil i')
const menu = document.getElementById('movil')
const body = document.getElementById('intro')
const tapa = document.querySelector('.tapa')
const btnProductos = document.querySelectorAll('.btn-productos')
const btnContacto = document.querySelectorAll('.btn-contacto')
const formulario = document.querySelector('form')

btnmenu.addEventListener('click', () => {
    menuar()
})

function menuar() {
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
}

// btnProductos.addEventListener('click', () => {
//     const elementoDestino = document.getElementById('productos')
//     if (elementoDestino) {
//         elementoDestino.scrollIntoView({ 
//             behavior: 'smooth', 
//             block: 'start' 
//         })
//     }
// })

btnProductos.forEach(btn => {
    btn.addEventListener('click', () => {
        //document.getElementById('width').innerText = window.innerWidth
        if (window.location.pathname != '/index.html') {
            window.location.href = '../index.html'
        }
        const elementoDestino = document.getElementById('productos')
        if (elementoDestino) {
            if (window.innerWidth <= 768) {
                menuar()
            }
            // if (window.location.pathname !== '/index.html') {
            //     console.log('no estoy en index')
            //     window.location.href = '../index.html'
            // }
            elementoDestino.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
        console.log(window.location.pathname)
    })
})

btnContacto.forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.location.pathname != '/index.html') {
            window.location.href = '../index.html'
        }
        const elementoDestino = document.getElementById('contacto')
        if (elementoDestino) {
            if (window.innerWidth <= 768) {
                menuar()
            }
            elementoDestino.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    })
})

function wasap(e) {
    e.preventDefault()
    
    const nombre = document.getElementById('nombre').value
    const consulta = document.getElementById('consulta').value
    
    const mensaje = `Hola, soy ${nombre}. Mi consulta es: ${consulta}`
    
    const url = `https://wa.me/+5493764616587?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
}

formulario.addEventListener('submit', wasap)