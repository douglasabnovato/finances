const Modal = {
    open(){
        document
            .querySelector('.modal-overlay')
            .classList.add('active')
    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList.remove('active')
    }
}

const Transaction = {
    incomes(){

    },
    expenses(){

    },
    total(){

    },
}

const transactions = [
    {
        id: 1,
        description: 'Cemig',
        amout: -50000,
        date: 01/10/2021,
    },
    {
        id: 2,
        description: 'Website Top',
        amout: 100000,
        date: 10/10/2021,
    },
    {
        id: 3,
        description: 'Internet Vero',
        amout: 12000,
        date: 03/10/2021,
    },
]



const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction() 
        DOM.transactionsContainer.appendChild(tr)
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
DOM.addTransaction(transactions[1])
DOM.addTransaction(transactions[2])