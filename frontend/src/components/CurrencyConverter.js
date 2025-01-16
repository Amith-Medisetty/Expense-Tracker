import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);

  // Replace with your actual API key from ExchangeRate-API
  const API_KEY = 'bb98041ed56957279be2eb0b';
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;  // Base currency is USD

  // Fetch exchange rates when component loads
  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        const rates = response.data.conversion_rates;
        setCurrencies(Object.keys(rates)); // Get the list of available currencies
        setConversionRate(rates[toCurrency]); // Set the initial conversion rate
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
        setError('Failed to fetch exchange rates. Please try again later.');
      });
  }, []);

  // Handle conversion when amount or currencies change
  const handleConvert = () => {
    if (amount && conversionRate) {
      const converted = (amount * conversionRate).toFixed(2);
      setConvertedAmount(converted);
    }
  };

  // Handle currency selection change
  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setToCurrency(selectedCurrency);
    axios.get(`${API_URL}`)
      .then((response) => {
        setConversionRate(response.data.conversion_rates[selectedCurrency]);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
        setError('Failed to fetch exchange rates. Please try again later.');
      });
  };

  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="form-group">
        <label htmlFor="from-currency">From Currency</label>
        <select
          id="from-currency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD - United States Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CHF">CHF - Swiss Franc</option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="CNY">CNY - Chinese Yuan</option>
          <option value="MXN">MXN - Mexican Peso</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="to-currency">To Currency</label>
        <select
          id="to-currency"
          value={toCurrency}
          onChange={handleCurrencyChange}
        >
          <option value="USD">USD - United States Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CHF">CHF - Swiss Franc</option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="CNY">CNY - Chinese Yuan</option>
          <option value="MXN">MXN - Mexican Peso</option>
        </select>
      </div>

      <button onClick={handleConvert}>Convert</button>

      {convertedAmount && (
        <div className="result">
          <h2>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </h2>
          <h3>Exchange Rate: 1 {fromCurrency} = {conversionRate} {toCurrency}</h3>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
