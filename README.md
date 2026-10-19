# 💰 Expense Tracker Dashboard

A modern, responsive **Expense Tracker Dashboard** built using HTML, CSS, and JavaScript to help users manage their personal finances. The application allows users to record income and expenses, monitor their balance, categorize spending, and view transaction records through a clean dashboard interface.

## 📌 Project Overview

Managing daily expenses is important for maintaining financial stability. This project provides a simple and user-friendly web application for tracking income and expenses in one place.

The dashboard automatically calculates total income, total expenses, and the remaining balance whenever a transaction is added or deleted. It also provides category-wise spending analysis to help users understand their spending habits.

## ✨ Features

- **Dashboard Overview** – Displays total balance, income, and expenses.
- **Add Transactions** – Record income and expenses with descriptions, amounts, categories, and dates.
- **Transaction Management** – View and delete individual transaction records.
- **Category-Wise Analysis** – Visualizes expenses by category using dynamic spending bars.
- **Transaction Filtering** – Filter records by income, expenses, or all transactions.
- **Automatic Calculations** – Updates financial summaries automatically.
- **Persistent Storage** – Saves transaction records using browser Local Storage.
- **Input Validation** – Prevents invalid or non-positive transaction amounts.
- **Responsive Design** – Supports desktop, tablet, and mobile screen sizes.
- **Indian Currency Support** – Displays monetary values in Indian Rupees (INR).

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the dashboard |
| CSS3 | Styling and responsive layout |
| JavaScript | Application logic and calculations |
| Browser Local Storage | Persistent transaction storage |
| Visual Studio Code | Development environment |
| Live Server | Local development and testing |

## 📂 Project Structure

```text
Expense-Tracker-Dashboard/
│
├── index.html       # Dashboard structure
├── style.css        # Styling and responsive design
├── script.js        # Application logic and data management
└── README.md        # Project documentation
```

## ⚙️ Installation and Setup

### Prerequisites

- Visual Studio Code
- A modern web browser, such as Google Chrome or Microsoft Edge
- Live Server extension for VS Code

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/Expense-Tracker-Dashboard.git
```

Replace `YOUR-USERNAME` with your GitHub username and use your actual repository URL.

### Step 2: Open the Project

Open VS Code, select **File → Open Folder**, and choose the `Expense-Tracker-Dashboard` folder.

### Step 3: Install Live Server

1. Open the Extensions panel using `Ctrl + Shift + X`.
2. Search for **Live Server**.
3. Install the extension.

### Step 4: Run the Application

1. Open `index.html`.
2. Right-click inside the file.
3. Select **Open with Live Server**.
4. The dashboard will open in your default browser.

No Node.js installation or database server is required for this version.

## 🚀 How to Use

1. Open the dashboard in your browser.
2. Enter a transaction description.
3. Enter the amount in Indian Rupees.
4. Select the transaction type: Income or Expense.
5. Choose an appropriate category.
6. Select the transaction date.
7. Click **Add Transaction**.
8. Review the updated balance and transaction records.
9. Use the filter to view income or expenses separately.
10. Delete individual records or clear all records when required.

## 🧮 Calculation Logic

The dashboard calculates the financial summary using the following formulas:

**Total Income**

The sum of all recorded income transactions.

**Total Expenses**

The sum of all recorded expense transactions.

**Available Balance**

```text
Balance = Total Income - Total Expenses
```

**Category Spending Percentage**

```text
Percentage = (Category Expense / Total Expenses) × 100
```

These calculations update automatically whenever transactions are added or deleted.

## 🧪 Testing and Verification

The application can be tested using the following scenarios:

| Test Case | Expected Result |
|---|---|
| Add an income transaction | Income and balance increase |
| Add an expense transaction | Expenses increase and balance decreases |
| Add transactions in different categories | Spending chart updates |
| Filter by income | Only income records are displayed |
| Filter by expenses | Only expense records are displayed |
| Delete a transaction | The record and financial totals update |
| Refresh the browser | Previously saved records remain available |
| Clear all records | All transactions are removed after confirmation |
| Enter an invalid amount | Validation prevents submission |

## 💾 Data Storage

This version uses **Browser Local Storage** to persist transaction data.

- Transaction records remain available after refreshing the page.
- Data is stored locally in the browser for the current website origin.
- The application does not use a cloud database or synchronize records between devices.
- Clearing browser site data may permanently remove saved transactions.

**Note:** This implementation does not use SQL, a backend server, user authentication, or cloud synchronization.

## 🔒 Security and Privacy

- Transaction data is stored locally in the browser.
- No financial account connection is required.
- No bank credentials are requested.
- This is an educational project and is not intended to replace a secure financial management platform.

## 🔮 Future Enhancements

- Integrate Node.js and Express for backend functionality.
- Add SQLite or MySQL database integration.
- Implement user registration and login.
- Add monthly budgets and spending limits.
- Introduce date-range and monthly transaction filters.
- Add interactive charts using Chart.js.
- Export transaction records to CSV or PDF.
- Implement recurring transactions.
- Add dark mode.
- Enable secure cloud storage and cross-device synchronization.

## 🎯 Learning Outcomes

Through this project, the following skills can be developed:

- Designing responsive web interfaces using HTML and CSS.
- Handling form inputs and validating user data.
- Manipulating the DOM using JavaScript.
- Using arrays, objects, filtering, and array methods.
- Performing real-time calculations.
- Persisting application data with Local Storage.
- Implementing CRUD-style operations in a browser-based application.
- Testing and debugging web applications in VS Code.

## 👨‍💻 Author

**Your Name**

- GitHub: [YOUR-GITHUB-USERNAME](https://github.com/YOUR-USERNAME)

## 📄 License

This project is available under the MIT License. You may use, modify, and distribute it according to the terms of that license. To apply this license formally, add a `LICENSE` file containing the MIT License text.

---

⭐ If you find this project useful, consider giving the repository a star on GitHub.

**Project Name:** Expense Tracker Dashboard  
**Project Type:** Frontend Web Application  
**Status:** Completed – Initial Version  
**Primary Technologies:** HTML, CSS, JavaScript
