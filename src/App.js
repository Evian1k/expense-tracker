import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { ExpenseChart } from "./components/ExpenseChart";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [editId, setEditId] = useState(null);
  const [budget, setBudget] = useState(0);

  const totalSpent = expenses.reduce((acc, exp) => acc + parseFloat(exp.amount || 0), 0);
  const remainingBudget = budget - totalSpent;
  const isBudgetExceeded = remainingBudget < 0;
  const isBudgetNear = remainingBudget <= budget * 0.1 && remainingBudget > 0;

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.category || !form.date) return;

    if (editId !== null) {
      const updated = expenses.map((exp) =>
        exp.id === editId ? { ...exp, ...form } : exp
      );
      setExpenses(updated);
      setEditId(null);
    } else {
      const newExpense = { ...form, id: Date.now() };
      setExpenses([...expenses, newExpense]);
    }

    setForm({ description: "", amount: "", category: "", date: "" });
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const handleEdit = (id) => {
    const toEdit = expenses.find((exp) => exp.id === id);
    setForm(toEdit);
    setEditId(id);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const filtered = expenses
    .filter((exp) =>
      exp.description.toLowerCase().includes(search.toLowerCase()) ||
      exp.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      return a[sortBy].localeCompare(b[sortBy]);
    });

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <div className="logo-section">
        <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="Expense Tracker Logo" className="app-logo" />
      </div>

      <div className="budget-section">
        <label htmlFor="budget">Set Budget:</label>
        <input
          id="budget"
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          placeholder="Enter your monthly budget"
        />
        <p>Total Spent: ${totalSpent}</p>
        <p style={{ color: isBudgetExceeded ? "red" : isBudgetNear ? "orange" : "green" }}>
          {isBudgetExceeded
            ? "You have exceeded your budget!"
            : isBudgetNear
            ? "You're near your budget limit!"
            : `Remaining Budget: $${remainingBudget}`}
        </p>
      </div>

      <ExpenseForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editId={editId}
      />

      <div className="controls">
        <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="description">Description</option>
          <option value="category">Category</option>
        </select>
      </div>

      <ExpenseList expenses={filtered} onEdit={handleEdit} onDelete={handleDelete} />

      <ExpenseChart data={expenses} />
    </div>
  );
}

export default App;
