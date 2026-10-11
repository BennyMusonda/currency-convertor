# 💱 Francify Rates

A colourful, beginner-friendly currency converter built with plain **HTML, CSS and JavaScript**. It shows live exchange rates and converts between 150+ currencies, with a focus on the Zambian Kwacha (ZMW), Congolese Franc (CDF), US Dollar (USD) and Euro (EUR).

> Prototype by Francify Technologies, made for research and learning.

<!-- Add a screenshot: ![Francify Rates screenshot](screenshot.png) -->

## ✨ Features

- Live exchange rates, no API key needed
- Convert between 150+ currencies
- Swap button to flip "From" and "To"
- Quick-view cards for ZMW, CDF, EUR, GBP, ZAR and KES (click one to convert)
- Instant results as you type
- Vibrant animated gradient design
- Works on phones, tablets and desktops

## 🛠️ Built with

- HTML5
- CSS3 (flexbox, grid, gradients)
- Vanilla JavaScript (no frameworks, no build step)
- [ExchangeRate-API Open Access](https://www.exchangerate-api.com/docs/free) for rates
- [Google Fonts](https://fonts.google.com/) (Poppins)

## 🚀 Run it locally

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR-USERNAME/francify-rates.git
   ```
2. Open the folder and double-click `index.html`.

That's it. You need an internet connection to load the rates.

## 📁 Project structure

```
francify-rates/
├── index.html   # Page structure
├── style.css    # Colours and layout
├── script.js    # API call and conversion logic
└── README.md
```

## 🔧 How it works

1. `script.js` fetches rates from `https://open.er-api.com/v6/latest/USD`.
2. All rates are relative to 1 USD.
3. To convert A → B, the amount is divided by A's rate (to get USD), then multiplied by B's rate.

## 🎨 Customise it

- **Change the quick-view cards:** edit `popularCurrencies` and `flags` at the top of `script.js`.
- **Change the colours:** edit the gradient in the `body` rule in `style.css`.
- **Change the default currencies:** edit the `fromSelect.value` and `toSelect.value` lines in `fillDropdowns()` in `script.js`.

## 📄 Notes

The free API updates about once a day and requires attribution. See their [terms](https://www.exchangerate-api.com/terms). Rates are for information only, not financial advice.

## 👤 Author

**Benny**, founder of Francify Technologies.

## 📜 License

Released under the [MIT License](https://opensource.org/licenses/MIT).
