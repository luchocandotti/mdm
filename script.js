// NAV --------------------------------------------------------------------------------------- //

async function cargarNav() {
    const placeholder = document.getElementById('nav-placeholder')
    if (!placeholder) return

    const res = await fetch('/nav.html')
    const html = await res.text()
    placeholder.innerHTML = html

    init()
}

function init() {
    let menuState = 0
    const btnmenu = document.getElementById('btn-movil')
    const imenu = document.querySelector('#btn-movil i')
    const menu = document.getElementById('movil')
    const body = document.getElementById('intro')
    const tapa = document.querySelector('.tapa')
    const btnProductos = document.querySelectorAll('.btn-productos')
    const btnContacto = document.querySelectorAll('.btn-contacto')
    const leer = document.getElementById('leer')
    const about = document.getElementById('about')
    const formulario = document.querySelector('form')
    const servicios = document.querySelectorAll('.servicios')

    btnmenu.addEventListener('click', () => menuar())

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

    btnProductos.forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
                window.location.href = '/index.html#productos'
                return
            }
            const elementoDestino = document.getElementById('productos')
            if (elementoDestino) {
                if (window.innerWidth <= 768) {
                    menuar()
                    const elementPosition = elementoDestino.getBoundingClientRect().top
                    const offsetVh = window.innerHeight * 0.53
                    const offsetPosition = elementPosition + window.pageYOffset - offsetVh
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                } else {
                    elementoDestino.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }
        })
    })

    btnContacto.forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
                window.location.href = '/index.html#contacto'
                return
            }
            if (window.innerWidth <= 768) menuar()
            const elementoDestino = document.getElementById('contacto')
            if (elementoDestino) {
                elementoDestino.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setTimeout(() => { document.getElementById('nombre').focus() }, 500)
            }
        })
    })

    if (formulario) formulario.addEventListener('submit', wasap)

    if (leer) leer.addEventListener('click', () => abrirAbout())

    if (servicios) {
        servicios.forEach(servicio => {
            servicio.addEventListener('click', () => abrirAbout())
        })
    }

    function abrirAbout() {
        about.classList.toggle('nomuestra')
        if (leer.innerText.includes('LEER MÁS')) {
            leer.innerHTML = 'LEER MENOS<i class="bi bi-arrow-up ms-2"></i>'
            leer.classList.remove('btn-tertiary')
            leer.classList.add('btn-secondary')
            setTimeout(() => { window.location.hash = '#nosotros' }, 100)
        } else {
            leer.innerHTML = 'LEER MÁS<i class="bi bi-arrow-down ms-2"></i>'
            leer.classList.add('btn-tertiary')
            leer.classList.remove('btn-secondary')
            setTimeout(() => { history.pushState('', document.title, window.location.pathname) }, 100)
        }
    }
}


// UTILIDADES --------------------------------------------------------------------------------- //

function wasap(e) {
    e.preventDefault()
    const nombre = document.getElementById('nombre').value
    const consulta = document.getElementById('consulta').value
    const mensaje = `Hola, soy ${nombre}. Mi consulta es: ${consulta}`
    const url = `https://wa.me/+5493764616587?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
}

function hacerFocus() {
    if (window.location.hash === '#contacto') {
        const inputNombre = document.getElementById('nombre')
        if (inputNombre) setTimeout(() => { inputNombre.focus() }, 100)
    }
}


// CAROUSEL ----------------------------------------------------------------------------------- //

function initCarousel() {
    const carouselElement = document.querySelector('#carouselOferta')
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            touch: true,
            wrap: true
        })
        setTimeout(() => { carousel.pause(); carousel.cycle() }, 100)
    }
}


// CARGA DINÁMICA DE PRODUCTOS ---------------------------------------------------------------- //

function cargarGrilla() {
    const grilla = document.getElementById('grilla-productos')
    if (!grilla) return

    fetch('/productos.json')
        .then(res => res.json())
        .then(data => {
            let output = ''
            data.forEach(producto => {
                output += `
                    <div class="col-6 col-lg-3">
                        <div class="productos bg-white shadow-sm p-3 text-center rounded-1 position-relative overflow-hidden">
                            <a href="${producto.href}">
                                <img src="/productos/img/small/${producto.id}.webp" class="card-img-top mb-2" alt="${producto.tipo} ${producto.marca} ${producto.nombre}" loading="lazy">
                                <div class="texto position-relative z-2">
                                    <p class="m-0"><span class="fw-bold">${producto.tipo} </span>${producto.marca} ${producto.nombre} ${producto.presentacion}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                `
            })
            const temp = document.createElement('div')
            temp.innerHTML = output
            grilla.replaceChildren(...temp.childNodes)
        })
        .catch(err => console.error('Error al cargar productos.json:', err))
}


// PÁGINA DE PRODUCTO ------------------------------------------------------------------------- //

function initProducto() {
    const add = document.getElementById('add')
    const back = document.getElementById('back')
    const h1 = document.querySelector('h1')

    if (!add || !back) return

    function wasapProducto(e) {
        e.preventDefault()
        const mensaje = `Hola, quiero consultar presupuesto de '${h1.textContent}'`
        const url = `https://wa.me/+5493764616587?text=${encodeURIComponent(mensaje)}`
        window.open(url, '_blank')
    }

    add.addEventListener('click', wasapProducto)
    back.addEventListener('click', () => { window.location.href = '/index.html#productos' })
}


// ARRANQUE ----------------------------------------------------------------------------------- //

window.addEventListener('DOMContentLoaded', () => {
    cargarNav()
    hacerFocus()
    cargarGrilla()
    initCarousel()
    initProducto()

    // Scroll a #productos si se llegó desde otra página

    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        const hash = window._initialHash
        if (hash === '#productos' || hash === '#contacto') {
            const elementoDestino = document.getElementById(hash.slice(1))
            if (elementoDestino) {
                setTimeout(() => {
                    elementoDestino.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    if (hash === '#contacto') document.getElementById('nombre').focus({ preventScroll: true })
                }, 300)
            }
        }
    }
})