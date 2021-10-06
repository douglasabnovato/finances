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
        //somar as entradas
    },
    expenses(){
        //somar as saídas
    },
    total(){
        //remover das entradas o valor das saídas
    },
}

const transactions = [
    {
        id: 1,
        description: 'Cemig',
        amount: -50000,
        date: '01/10/2021',
    },
    {
        id: 2,
        description: 'Website Top',
        amount: 100000,
        date: '10/10/2021',
    },
    {
        id: 3,
        description: 'Internet Vero',
        amount: 12000,
        date: '03/10/2021',
    },
]

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction) 
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CssClass = transaction.amount > 0 ? 'income' : 'expense' 
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CssClass}">${transaction.amount}</td>
            <td class="date">${transaction.date}</td> 
            <td><img src="./assets/minus.svg" alt="Remover transação."></td>
        ` 
        return html
    }
}
 
transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)
})
