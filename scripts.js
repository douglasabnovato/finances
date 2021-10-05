const Modal = {
    open(){
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amout: -50000,
        date: 01/10/2021,
    },
    {
        id: 2,
        description: 'Website',
        amout: 100000,
        date: 10/10/2021,
    },
    {
        id: 3,
        description: 'Internet',
        amout: 12000,
        date: 03/10/2021,
    },
]

const Transaction = {
    incomes(){

    },
    expenses(){

    },
    total(){

    },
}

const DOM = {
    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction()
        console.log(tr.innerHTML)
    },
    innerHTMLTransaction(){
        const html = ` 
            <td class="description">${transaction.description}</td>
            <td class="expense">${transaction.amount}</td>
            <td class="date">${transaction.date}</td> 
            <td><img src="./assets/minus.svg" alt="Remover transação."></td> 
        `
        return html
    }
}

DOM.addTransaction(transactions[0])