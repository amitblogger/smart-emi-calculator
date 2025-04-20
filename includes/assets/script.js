document.addEventListener('DOMContentLoaded', function () {
  const loanAmount = document.getElementById('loan-amount');
  const interestRate = document.getElementById('interest-rate');
  const loanTenure = document.getElementById('loan-tenure');
  const calculateBtn = document.getElementById('calculate-btn');
  const currencySelect = document.getElementById('currency-select');

  const loanVal = document.getElementById('loan-amount-val');
  const interestVal = document.getElementById('interest-rate-val');
  const tenureVal = document.getElementById('loan-tenure-val');
  const currencySymbol = document.getElementById('currency-symbol');

  const monthlyEMI = document.getElementById('monthly-emi');
  const totalInterest = document.getElementById('total-interest');
  const totalPayment = document.getElementById('total-payment');

  const chartCanvas = document.getElementById('emi-chart');
  const themeToggle = document.getElementById('theme-toggle');
  const downloadBtn = document.getElementById('download-pdf');

  let emiChart;

  // Update slider values
  loanAmount.oninput = () => loanVal.textContent = loanAmount.value;
  interestRate.oninput = () => interestVal.textContent = interestRate.value;
  loanTenure.oninput = () => tenureVal.textContent = loanTenure.value;

  currencySelect.onchange = () => {
    currencySymbol.textContent = currencySelect.value;
  };

  calculateBtn.onclick = () => {
    const P = parseFloat(loanAmount.value);
    const annualRate = parseFloat(interestRate.value);
    const N = parseInt(loanTenure.value);

    const R = annualRate / 12 / 100;
    const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const total = EMI * N;
    const interest = total - P;

    const symbol = currencySelect.value;

    monthlyEMI.textContent = `${symbol} ${EMI.toFixed(2)}`;
    totalInterest.textContent = `${symbol} ${interest.toFixed(2)}`;
    totalPayment.textContent = `${symbol} ${total.toFixed(2)}`;

    drawPieChart(P, interest);
  };

  function drawPieChart(principal, interest) {
    if (emiChart) emiChart.destroy();
    emiChart = new Chart(chartCanvas, {
      type: 'pie',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [{
          data: [principal, interest],
          backgroundColor: ['#007bff', '#ffc107']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // Dark mode toggle
  themeToggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
  };

  // PDF Export
  downloadBtn.onclick = () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const symbol = currencySelect.value;

    pdf.setFontSize(16);
    pdf.text("Loan EMI Report", 70, 20);
    pdf.setFontSize(12);
    pdf.text(`Loan Amount: ${symbol} ${loanAmount.value}`, 20, 40);
    pdf.text(`Interest Rate: ${interestRate.value}%`, 20, 50);
    pdf.text(`Tenure: ${loanTenure.value} months`, 20, 60);
    pdf.text(`Monthly EMI: ${monthlyEMI.textContent}`, 20, 80);
    pdf.text(`Total Interest: ${totalInterest.textContent}`, 20, 90);
    pdf.text(`Total Payment: ${totalPayment.textContent}`, 20, 100);

    pdf.save("emi-report.pdf");
  };
});
