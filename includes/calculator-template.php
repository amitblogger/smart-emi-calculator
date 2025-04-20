<div class="emi-calculator-container">
  <div class="emi-header">
    <h2><span class="emoji">📊</span> Smart EMI Calculator</h2>
    <button id="theme-toggle">🌓</button>
  </div>

  <div class="emi-inputs">
    <label>Loan Amount (<span id="currency-symbol">₹</span>): 
      <input type="range" id="loan-amount" min="10000" max="10000000" step="1000" value="500000">
      <span id="loan-amount-val">500000</span>
    </label>

    <label>Interest Rate (% per annum): 
      <input type="range" id="interest-rate" min="1" max="20" step="0.1" value="8.5">
      <span id="interest-rate-val">8.5</span>
    </label>

    <label>Loan Tenure (in months): 
      <input type="range" id="loan-tenure" min="6" max="360" step="6" value="120">
      <span id="loan-tenure-val">120</span>
    </label>

    <label>Select Currency: 
      <select id="currency-select">
        <option value="₹">INR (₹)</option>
        <option value="$">USD ($)</option>
        <option value="£">GBP (£)</option>
        <option value="€">EUR (€)</option>
      </select>
    </label>

    <button id="calculate-btn">Calculate EMI</button>
  </div>

  <div class="emi-results">
    <h3>📋 EMI Details</h3>
    <p><strong>Monthly EMI:</strong> <span id="monthly-emi">-</span></p>
    <p><strong>Total Interest Payable:</strong> <span id="total-interest">-</span></p>
    <p><strong>Total Payment (Principal + Interest):</strong> <span id="total-payment">-</span></p>

    <canvas id="emi-chart" width="300" height="300"></canvas>

    <button id="download-pdf">📄 Export to PDF</button>
  </div>
</div>
