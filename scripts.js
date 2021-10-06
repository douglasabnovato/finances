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
        return (Transaction.incomes() + Transaction.expenses()).toFixed(2);
    },
}

const transactions = [
    {
        id: 1,
        description: 'Cemig',
        amount: -500.20,
        date: '01/10/2021',
    },
    {
        id: 2,
        description: 'Website Top',
        amount: 100.75,
        date: '10/10/2021',
    },
    {
        id: 3,
        description: 'Internet Vero',
        amount: 120.41,
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
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expense-display')
            .innerHTML = Utils.formatCurrency(Transaction.expenses()) 
        document
            .getElementById('total-display')
            .innerHTML = Utils.formatCurrency(Transaction.total()) 
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

       return signal + value
    }
}
 
transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)
})

DOM.updateBalance()
