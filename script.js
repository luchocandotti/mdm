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

btnProductos.forEach(btn => {
    btn.addEventListener('click', () => {
        //document.getElementById('width').innerText = window.innerWidth
        if (window.location.pathname != '/index.html') {
            window.location.href = '../index.html#productos'
            return
        }
        const elementoDestino = document.getElementById('productos')
        if (elementoDestino) {
            if (window.innerWidth <= 768) {
                menuar();
                
                // Scroll con offset en móvil
                const elementPosition = elementoDestino.getBoundingClientRect().top;
                const offsetVh = window.innerHeight * 0.53
                const offsetPosition = elementPosition + window.pageYOffset - offsetVh
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            } else {
                // Scroll normal en desktop
                elementoDestino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        }
    })
})

// btnProductos.forEach(btn => {
//     btn.addEventListener('click', () => {
//         //document.getElementById('width').innerText = window.innerWidth
//         if (window.location.pathname != '/index.html') {
//             window.location.href = '../index.html#productos'
//             return
//         }

//         if (window.innerWidth <= 768) {
//             menuar();
//         } 
            
//         window.location.href = '#productos'
//     })
// })

btnContacto.forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.location.pathname != '/index.html') {
            window.location.href = '../index.html#contacto'
            return
        }
        
        if (window.innerWidth <= 768) {
            menuar()
        }
           
        window.location.href = '#contacto'
        hacerFocus()
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

function hacerFocus() {
    if (window.location.hash === '#contacto') {
    const inputNombre = document.getElementById('nombre')
    if (inputNombre) {
      // Pequeño delay para asegurar que el scroll termine
      setTimeout(() => {
        inputNombre.focus()
      }, 100)
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  hacerFocus()
})

formulario.addEventListener('submit', wasap)




// btnProductos.addEventListener('click', () => {
//     const elementoDestino = document.getElementById('productos')
//     if (elementoDestino) {
//         elementoDestino.scrollIntoView({ 
//             behavior: 'smooth', 
//             block: 'start' 
//         })
//     }
// })