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
        let income = 0;
        transactions.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;
            }
        })
        return income;
    },
    expenses(){
        let expense = 0;
        transactions.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total(){
        //remover das entradas o valor das saídas
        return Transaction.incomes() + Transaction.expenses();
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
        const amount = Utils.formatCurrency(transaction.amount)
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CssClass}">${amount}</td>
            <td class="date">${transaction.date}</td> 
            <td><img src="./assets/minus.svg" alt="Remover transação."></td>
        ` 
        return html
    },
    updateBalance(){
        document
            .getElementById('income-display')
            .innerHTML = Transaction.incomes()
        document
            .getElementById('expense-display')
            .innerHTML = Transaction.expense()
        document
            .getElementById('total-display')
            .innerHTML = Transaction.total()
    }
}

const Utils = {
    formatCurrency(value){
        value = value * 100
        return Math.round(value)
    }
}
 
transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)
})

DOM.updateBalance()
