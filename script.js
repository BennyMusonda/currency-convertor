// Free API: no key needed. Rates are based on 1 US Dollar.
const API_URL = "https://open.er-api.com/v6/latest/USD";

// Currencies shown as cards in the "Live rates" section
const popularCurrencies = ["ZMW", "CDF", "EUR", "GBP", "ZAR", "KES"];
const flags = { ZMW: "🇿🇲", CDF: "🇨🇩", EUR: "🇪🇺", GBP: "🇬🇧", ZAR: "🇿🇦", KES: "🇰🇪" };

// Turns "ZMW" into "Zambian Kwacha" (built into the browser)
const currencyNames = new Intl.DisplayNames(["en"], { type: "currency" });

// Page elements
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const swapBtn = document.getElementById("swapBtn");
const resultBox = document.getElementById("result");
const rateInfo = document.getElementById("rateInfo");
const rateGrid = document.getElementById("rateGrid");
const updatedText = document.getElementById("updated");

let rates = {}; // will hold all rates, e.g. { USD: 1, ZMW: 27.5, ... }

// 1. Get the rates from the API
async function loadRates() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("The API did not return rates.");
    }

    rates = data.rates;
    fillDropdowns();
    showRateCards();
    updatedText.textContent = "Last updated: " + new Date(data.time_last_update_utc).toLocaleString();
    convert();
  } catch (error) {
    console.error(error);
    resultBox.textContent = "Could not load rates. Check your connection and refresh the page.";
  }
}

// 2. Fill both dropdowns with every currency from the API
function fillDropdowns() {
  for (const code in rates) {
    const label = code + " - " + currencyNames.of(code);
    fromSelect.add(new Option(label, code));
    toSelect.add(new Option(label, code));
  }
  fromSelect.value = "USD";
  toSelect.value = "ZMW";
}

// 3. Show the popular rate cards
function showRateCards() {
  rateGrid.innerHTML = "";

  popularCurrencies.forEach(function (code) {
    const card = document.createElement("div");
    card.className = "rate-card";
    card.innerHTML =
      '<span class="flag">' + flags[code] + "</span>" +
      "<strong>" + code + "</strong>" +
      '<span class="value">' + formatNumber(rates[code]) + "</span>";

    // Clicking a card converts USD to that currency
    card.addEventListener("click", function () {
      fromSelect.value = "USD";
      toSelect.value = code;
      convert();
      document.getElementById("converter").scrollIntoView();
    });

    rateGrid.appendChild(card);
  });
}

// 4. Do the conversion: from -> USD -> to
function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!rates[from] || !rates[to]) return; // rates not loaded yet

  if (isNaN(amount) || amount < 0) {
    resultBox.textContent = "Enter an amount of 0 or more.";
    rateInfo.textContent = "";
    return;
  }

  const amountInUSD = amount / rates[from];
  const converted = amountInUSD * rates[to];

  resultBox.textContent = formatNumber(amount) + " " + from + " = " + formatNumber(converted) + " " + to;
  rateInfo.textContent = "1 " + from + " = " + formatNumber(rates[to] / rates[from]) + " " + to;
}

// Adds commas, and shows more decimals for very small numbers
function formatNumber(number) {
  const decimals = number < 1 ? 6 : 2;
  return number.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

// 5. Swap the two currencies
swapBtn.addEventListener("click", function () {
  const oldFrom = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = oldFrom;
  convert();
});

// Convert whenever the user changes something
amountInput.addEventListener("input", convert);
fromSelect.addEventListener("change", convert);
toSelect.addEventListener("change", convert);

// Footer year + start the app
document.getElementById("year").textContent = new Date().getFullYear();
loadRates();
