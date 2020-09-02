const axios = require("axios");
const { get } = require("mongoose");
const CRYPTO_LIST = [
  "BTC",
  "ETH",
  "USDT",
  "XRP",
  "LINK",
  "DOT",
  "BCH",
  "LTC",
  "BNB",
  "ADA",
];

exports.getCryptos = async (req, res) => {
  const cryptos = await getCrytoLives();

  res.json({ cryptos });
};

getCrytoLives = async () => {
  const url = `http://api.coinlayer.com/live?access_key=${process.env.ACCESS_KEY}`;

  const response = await axios.get(url);

  const filteredCryptos = Object.keys(response.data.rates)
    .filter((key) => CRYPTO_LIST.includes(key))
    .reduce((obj, key) => {
      obj[key] = response.data.rates[key];
      return obj;
    }, {});

  return filteredCryptos;
};
