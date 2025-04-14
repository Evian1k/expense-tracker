import React from "react";

const ExpenseItem = ({ expense, onEdit, onDelete }) => (
  <tr>
    <td>{expense.description}</td>
    <td>{expense.amount}</td>
    <td>{expense.category}</td>
    <td>{expense.date}</td>
    <td>
      <button onClick={() => onEdit(expense.id)}>Edit</button>
      <button onClick={() => onDelete(expense.id)}>Delete</button>
    </td>
  </tr>
);

export default ExpenseItem;
