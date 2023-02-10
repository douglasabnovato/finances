const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.sensedata:transactions")) || [];
  },

  set(transactions) {
    localStorage.setItem(
      "dev.sensedata:transactions",
      JSON.stringify(transactions)
    );
  },
};

const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload(); //atualizar aplicação
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
  },

  expenses() {
    let expense = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    //remover das entradas o valor das saídas
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;
    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const CssClass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
            <td class="title">${transaction.title}</td>
            <td class="${CssClass}">${amount}</td>
            <td class="date">${transaction.date}</td> 
            <td class="category">${transaction.category}</td> 
            <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação."></td>
        `;
    return html;
  },

  updateBalance() {
    document.getElementById("income-display").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById("expense-display").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById("total-display").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;
    return value;
  },

  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";
    value = String(value).replace(/\D/g, "");
    value = Number(value) / 100;
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return signal + value;
  },

  formatCategory(category) {
    let categoria = category.toUpperCase();

    return categoria;
  },
};

const Form = {
  title: document.querySelector("input#title"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),
  category: document.querySelector("#category"),

  getValues() {
    return {
      title: Form.title.value,
      amount: Form.amount.value,
      date: Form.date.value,
      category: Form.category.options[category.selectedIndex].value, 
    };
  },

  validateFields() {
    //validar informações foram preenchidas
    const { title, amount, date, category } = Form.getValues();
    if (
      title.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === "" ||
      category.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos.");
    }
  },

  formatData() {
    //formatar dados para salvar
    let { title, amount, date, category } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);
    category = Utils.formatCategory(category);

    return {
      title,
      amount,
      date,
      category,
    };
  },

  saveTransaction(transaction) {
    //salvar dados do formulário
    Transaction.add(transaction);
  },

  clearFields() {
    //limpar dados para o próximo preenchimento
    Form.title.value = "";
    Form.amount.value = "";
    Form.date.value = "";
    Form.category.value = "";
  },

  submit(event) {
    event.preventDefault();
    try {
      Form.validateFields();
      const transaction = Form.formatData();
      Form.saveTransaction(transaction);
      Form.clearFields();
      Modal.close(); //fechar modal
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction);
    DOM.updateBalance();
    Storage.set(Transaction.all);
  },

  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();
