
const STORAGE_KEY = "fintrack_transactions_v1";

const form = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const filterInput = document.getElementById("filter");
const message = document.getElementById("message");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expensesElement = document.getElementById("expenses");
const transactionList = document.getElementById("transactionList");
const emptyState = document.getElementById("emptyState");
const categoryChart = document.getElementById("categoryChart");
const categoryLegend = document.getElementById("categoryLegend");

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2
});

function localDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

dateInput.value = localDate();

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(data)) return [];

    return data.filter(item =>
      item &&
      typeof item.id === "string" &&
      typeof item.description === "string" &&
      Number.isFinite(item.amount) &&
      item.amount > 0 &&
      ["income", "expense"].includes(item.type) &&
      typeof item.category === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(item.date)
    );
  } catch (error) {
    console.error("Unable to load saved transactions:", error);
    return [];
  }
}

let transactions = loadTransactions();

function saveTransactions() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    return true;
  } catch (error) {
    console.error("Unable to save transactions:", error);
    showMessage("Could not save data. Check browser storage.", true);
    return false;
  }
}

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeInput.value;
  const category = categoryInput.value;
  const date = dateInput.value;

  if (!description) {
    showMessage("Please enter a description.", true);
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    showMessage("Enter an amount greater than zero.", true);
    return;
  }

  if (!["income", "expense"].includes(type)) {
    showMessage("Please select a valid transaction type.", true);
    return;
  }

  if (!date || date > localDate()) {
    showMessage("Please enter a valid date that is not in the future.", true);
    return;
  }

  const transaction = {
    id: crypto.randomUUID(),
    description,
    amount: Math.round(amount * 100) / 100,
    type,
    category,
    date
  };

  transactions.unshift(transaction);

  if (!saveTransactions()) {
    transactions.shift();
    return;
  }

  form.reset();
  dateInput.value = localDate();
  typeInput.value = "expense";

  showMessage("Transaction added successfully!");
  renderDashboard();
});

function renderDashboard() {
  const totalIncome = transactions
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = transactions
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  balanceElement.textContent = money.format(totalIncome - totalExpenses);
  incomeElement.textContent = money.format(totalIncome);
  expensesElement.textContent = money.format(totalExpenses);

  renderTransactions();
  renderCategoryChart();
}

function renderTransactions() {
  transactionList.replaceChildren();

  const selectedType = filterInput.value;

  const visibleTransactions = transactions.filter(item =>
    selectedType === "all" || item.type === selectedType
  );

  emptyState.hidden = visibleTransactions.length > 0;

  visibleTransactions.forEach(item => {
    const row = document.createElement("tr");

    row.appendChild(createElement("td", "", item.description));
    row.appendChild(createElement("td", "", item.category));
    row.appendChild(createElement("td", "", item.date));

    const typeCell = createElement(
      "td",
      item.type === "income" ? "type-income" : "type-expense",
      item.type === "income" ? "Income" : "Expense"
    );

    row.appendChild(typeCell);

    row.appendChild(createElement(
      "td",
      item.type === "income" ? "type-income" : "type-expense",
      `${item.type === "income" ? "+" : "-"}${money.format(item.amount)}`
    ));

    const actionCell = document.createElement("td");
    const deleteButton = createElement("button", "delete-button", "Delete");
    deleteButton.type = "button";
    deleteButton.setAttribute(
      "aria-label",
      `Delete transaction ${item.description}`
    );

    deleteButton.addEventListener("click", () => {
      const previous = transactions;
      transactions = transactions.filter(tx => tx.id !== item.id);

      if (!saveTransactions()) {
        transactions = previous;
        return;
      }

      showMessage("Transaction deleted.");
      renderDashboard();
    });

    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    transactionList.appendChild(row);
  });
}

function renderCategoryChart() {
  categoryChart.replaceChildren();
  categoryLegend.textContent = "";

  const totals = {};

  transactions
    .filter(item => item.type === "expense")
    .forEach(item => {
      totals[item.category] = (totals[item.category] || 0) + item.amount;
    });

  const categories = Object.entries(totals)
    .sort((a, b) => b[1] - a[1]);

  const total = categories.reduce((sum, item) => sum + item[1], 0);

  if (categories.length === 0) {
    categoryChart.appendChild(
      createElement("p", "muted", "Add an expense to see your chart.")
    );
    return;
  }

  categories.forEach(([category, amount]) => {
    const percentage = total > 0 ? (amount / total) * 100 : 0;

    const item = document.createElement("div");
    const label = createElement("div", "bar-label");

    label.appendChild(createElement("span", "", category));
    label.appendChild(createElement(
      "span",
      "",
      `${money.format(amount)} (${percentage.toFixed(1)}%)`
    ));

    const track = createElement("div", "bar-track");
    const bar = createElement("div", "bar-fill");

    bar.style.width = `${percentage}%`;
    track.appendChild(bar);

    item.appendChild(label);
    item.appendChild(track);
    categoryChart.appendChild(item);
  });

  categoryLegend.textContent =
    `Total spending across ${categories.length} categor${
      categories.length === 1 ? "y" : "ies"
    }: ${money.format(total)}`;
}

filterInput.addEventListener("change", renderTransactions);

document.getElementById("clearAll").addEventListener("click", () => {
  if (transactions.length === 0) {
    showMessage("There are no records to clear.", true);
    return;
  }

  if (!confirm("Delete ALL transaction records? This cannot be undone.")) {
    return;
  }

  const previous = transactions;
  transactions = [];

  if (!saveTransactions()) {
    transactions = previous;
    return;
  }

  showMessage("All transactions cleared.");
  renderDashboard();
});

renderDashboard();
