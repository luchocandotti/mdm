let producto = 0
const id = document.querySelector('.id')
const btnAddAll = document.querySelectorAll('.btn-add')
const add = document.getElementById('add')
const addIcon = document.querySelector('#add .bi')
const addTxt = document.getElementById('add-txt')

const btnDesk = document.getElementById('btn-desk')
const btnMovil = document.getElementById('btn-m')

add.addEventListener('click', () => {
    add.classList.toggle('btn-success')
    add.classList.toggle('btn-danger')

    addIcon.classList.toggle('bi-check-lg')
    addIcon.classList.toggle('bi-x-lg')

    if (producto === 0) {
        addTxt.textContent = 'Quitar de consultas'
        btnAddAll.forEach(btn => {
            btn.classList.toggle('d-none')
            btn.classList.toggle('d-inline')
                setTimeout(() => {
                    btn.classList.toggle('btnScale')
                }, 300)
        })
    } else {
        addTxt.textContent = 'Agregar a consultas'
        btnAddAll.forEach(btn => {
            btn.classList.toggle('btnScale')
                setTimeout(() => {
                    btn.classList.toggle('d-none')
                    btn.classList.toggle('d-inline')
                }, 300)
        })
    }
    
    // operador ternario => condición ? valor_si_true : valor_si_false
    producto = producto === 0 ? 1 : 0
    console.log(producto === 1 ? 'agregado' : 'quitado')
})

function wasap(e) {
    e.preventDefault() // Si son enlaces
        const mensaje = `Hola, quiero consultar presupuesto de '${id.textContent}'`
        const url = `https://wa.me/+5493765252764?text=${encodeURIComponent(mensaje)}`
        window.open(url, '_blank')
}

btnDesk.addEventListener('click', wasap)
btnMovil.addEventListener('click', wasap)