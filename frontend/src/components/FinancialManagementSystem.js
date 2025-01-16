import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import './fms.css';

const FinancialManagementSystem = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calculate balance whenever input values change
  useEffect(() => {
    setTotalBalance(Number(totalIncome) + Number(totalSavings) - Number(totalExpense));
  }, [totalIncome, totalSavings, totalExpense]);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:4000/financialRecords");
        setFinancialData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (recordId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/financialRecords/${recordId}`);
      alert(response.data.message);

      // Filter out the deleted record
      setFinancialData((prevData) => prevData.filter((record) => record._id !== recordId));
    } catch (error) {
      alert("Failed to delete the record.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finance = {
        totalIncome: Number(totalIncome),
        totalSaving: Number(totalSavings),
        totalExpense: Number(totalExpense),
        totalBalance: Number(totalBalance),
      };

      const response = await axios.post("http://localhost:4000/financialRecords", finance);

      // Add new record to the state
      setFinancialData((prevData) => [...prevData, response.data]);

      // Reset form values
      setTotalIncome(0);
      setTotalSavings(0);
      setTotalExpense(0);
    } catch (error) {
      alert("Failed to add financial record.");
      console.error(error);
    }
  };

  return (
    <div className="financial-management-container">
      <div className="greetings">
        <header>
          <h1>Financial Management System</h1>
          <Link to="/chatbot" className="boting">Try Chatbot</Link> {/* Link to Chatbot page */}
        </header>
      </div>

      <div className="forming-up">
        <form className="financial-summary" onSubmit={handleSubmit}>
          <div className="card">
            <h3>Total Income</h3>
            <input
              type="number"
              value={totalIncome}
              onChange={(e) => setTotalIncome(e.target.value)}
              placeholder="Enter income"
            />
          </div>

          <div className="card">
            <h3>Total Savings</h3>
            <input
              type="number"
              value={totalSavings}
              onChange={(e) => setTotalSavings(e.target.value)}
              placeholder="Enter savings"
            />
          </div>

          <div className="card">
            <h3>Total Expense</h3>
            <input
              type="number"
              value={totalExpense}
              onChange={(e) => setTotalExpense(e.target.value)}
              placeholder="Enter expenses"
            />
          </div>

          <div className="card">
            <h3>Total Balance</h3>
            <textarea className="notepad" value={totalBalance} readOnly />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="backend-data">
        <h3>Your Records</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : financialData.length > 0 ? (
          <div className="records">
            {financialData.map((record, index) => (
              <div key={index} className="record-document">
                <h4>Record {index + 1}</h4>
                <p><strong>Income:</strong> {record.totalIncome}</p>
                <p><strong>Savings:</strong> {record.totalSaving}</p>
                <p><strong>Expenses:</strong> {record.totalExpense}</p>
                <p><strong>Balance:</strong> {record.totalBalance}</p>
                <p className="timestamp"><strong>Timestamp:</strong> {record.timestamp || "N/A"}</p>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(record._id)} // Assumes each record has a unique 'id' field
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default FinancialManagementSystem;
