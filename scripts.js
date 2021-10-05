let Modal = {
    open(){
        //abrir o modal
        //adicionar a class active ao modal 
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close(){
        //fechar o modal
        //remover a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}