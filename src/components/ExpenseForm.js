import React from "react";

const ExpenseForm = ({ form, onChange, onSubmit, editId }) => (
  <form onSubmit={onSubmit} className="expense-form">
    <input name="description" value={form.description} onChange={onChange} placeholder="Description" required />
    <input name="amount" type="number" value={form.amount} onChange={onChange} placeholder="Amount" required />
    <input name="category" value={form.category} onChange={onChange} placeholder="Category" required />
    <input name="date" type="date" value={form.date} onChange={onChange} required />
    <button type="submit">{editId ? "Update" : "Add"} Expense</button>
  </form>
);

export default ExpenseForm;
