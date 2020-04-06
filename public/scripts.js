function onOff() {
    document.querySelector('#modal')
    .classList.toggle('hide')

    document.body
    .classList
    .toggle('hideScroll')
    
    document.querySelector('#modal')
    .classList
    .toggle('addScroll')
}

function validateCreateIdea(event) {
    const isEmpty = Array.from(event.target).filter((value) => { 
        if(value.name) return true
    }).find(input => !input.value.trim() && typeof input.value === 'string')

    if(isEmpty) {
        event.preventDefault()
        alert('Por favor, preencha todos os campos!')
    }
}

function confirmDelete(event) {
    const confirmation = confirm('Deseja mesmo deletar ?')

    if(!confirmation) {
        event.preventDefault()
    }
}