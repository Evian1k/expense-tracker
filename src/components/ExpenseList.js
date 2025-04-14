import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, onEdit, onDelete }) => (
  <table className="expense-table">
    <thead>
      <tr>
        <th>Description</th>
        <th>Amount ($)</th>
        <th>Category</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {expenses.length > 0 ? (
        expenses.map((exp) => (
          <ExpenseItem key={exp.id} expense={exp} onEdit={onEdit} onDelete={onDelete} />
        ))
      ) : (
        <tr><td colSpan="5" style={{ textAlign: "center" }}>No expenses found</td></tr>
      )}
    </tbody>
  </table>
);

export default ExpenseList;
