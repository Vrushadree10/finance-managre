import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Form, Button, ListGroup } from "react-bootstrap";

const FinanceManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState(1000);

  const addExpense = () => {
    if (amount && category) {
      setExpenses([...expenses, { amount: parseFloat(amount), category }]);
      setAmount("");
      setCategory("");
    }
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <Container className="mt-4" style={{ maxWidth: "500px" }}>
      <Card className="p-3 mb-3">
        <h2>Set Budget</h2>
        <Form.Control
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
        />
      </Card>
      <Card className="p-3 mb-3">
        <h2>Add Expense</h2>
        <Form.Control
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-2"
        />
        <Form.Control
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-2"
        />
        <Button onClick={addExpense} variant="primary" className="w-100">Add Expense</Button>
      </Card>
      <Card className="p-3 mb-3">
        <h2>Expense List</h2>
        <ListGroup>
          {expenses.map((exp, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between">
              <span>{exp.category}: ${exp.amount}</span>
              <Button variant="danger" size="sm" onClick={() => deleteExpense(index)}>Delete</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card className="p-3">
        <h2>Budget Overview</h2>
        <p>Total Spent: ${totalSpent}</p>
        <p>Remaining: ${budget - totalSpent}</p>
      </Card>
    </Container>
  );
};

export default FinanceManager;
