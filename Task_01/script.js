function calculateFactorial() {
    const number = parseInt(document.getElementById("numberInput").value);
    const method = document.getElementById("method").value;
    const resultDiv = document.getElementById("result");
  
    if (isNaN(number) || number < 0 || !Number.isInteger(number)) {
      resultDiv.textContent = "Please enter a valid non-negative integer.";
      return;
    }
  
    let result;
    if (method === "iterative") {
      result = factorialIterative(number);
    } else {
      result = factorialRecursive(number);
    }
  
    resultDiv.textContent = `Factorial (${number}) = ${result} (${method})`;
  }
  
  function factorialIterative(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
  
  function factorialRecursive(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorialRecursive(n - 1);
  }
  