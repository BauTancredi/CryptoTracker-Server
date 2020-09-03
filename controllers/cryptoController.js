const axios = require("axios");

const CRYPTO_LIST = [
  "BTC",
  "ETH",
  "USDT",
  "XRP",
  "LINK",
  "BCH",
  "LTC",
  "BNB",
  "ADA",
];

exports.getCryptos = async (req, res) => {
  const cryptoArray = [];

  const cryptosLive = await getCryptoLive();
  const cryptosList = await getCryptoList();
  const cryptosLastPrice = await getCryptoLastDate();

  for (let index = 0; index < CRYPTO_LIST.length; index++) {
    const element = CRYPTO_LIST[index];

    const priceDifference = await getPriceDifference(
      cryptosLive[`${element}`],
      cryptosLastPrice[`${element}`]
    );

    const cryptoObject = {
      fullName: cryptosList[`${element}`].name,
      symbol: cryptosList[`${element}`].symbol,
      actualPrice: Math.floor(cryptosLive[`${element}`] * 100) / 100,
      lastPrice: Math.floor(cryptosLastPrice[`${element}`] * 100) / 100,
      imageUrl: cryptosList[`${element}`].icon_url,
      difference: priceDifference,
      differenceSign: Math.sign(priceDifference),
    };

    cryptoArray.push(cryptoObject);
  }

  res.json({ cryptoArray });
};

const getCryptoLive = async () => {
  const url = `http://api.coinlayer.com/live?access_key=${process.env.ACCESS_KEY}`;

  try {
    const response = await axios.get(url);

    const filteredCryptos = await filterCryptos(response.data.rates);

    return filteredCryptos;
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const getCryptoList = async () => {
  const url = `http://api.coinlayer.com/list?access_key=${process.env.ACCESS_KEY}`;

  try {
    const response = await axios.get(url);

    const filteredCryptos = await filterCryptos(response.data.crypto);

    return filteredCryptos;
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const getCryptoLastDate = async () => {
  const yesterdayDateString = await getYesterdayDate();

  const url = `http://api.coinlayer.com/${yesterdayDateString}?access_key=${process.env.ACCESS_KEY}`;

  try {
    const response = await axios.get(url);

    const filteredCryptos = await filterCryptos(response.data.rates);

    return filteredCryptos;
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const getYesterdayDate = async () => {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  today.toDateString();
  yesterday.toDateString();

  return yesterday.toISOString().slice(0, 10);
};

const filterCryptos = async (cryptosList) => {
  const filteredCryptos = Object.keys(cryptosList)

    .filter((key) => CRYPTO_LIST.includes(key))
    .reduce((obj, key) => {
      obj[key] = cryptosList[key];
      return obj;
    }, {});

  return filteredCryptos;
};

const getPriceDifference = async (actualPrice, lastPrice) => {
  const diff = actualPrice - lastPrice;

  const difference = (diff / lastPrice) * 100;

  return Math.floor(difference * 100) / 100;
};

exports.getFavoriteCryptos = async (req, res) => {
  console.log(req);
  const user = await User.findById(req.user.id);

  const cryptoArray = [];

  const cryptosLive = await getCryptoLiveFavorites(user);
  const cryptosList = await getCryptoListFavorites(user);
  const cryptosLastPrice = await getCryptoLastDateFavorites(user);

  for (let index = 0; index < user.favorites.length; index++) {
    const element = user.favorites[index];

    const priceDifference = await getPriceDifference(
      cryptosLive[`${element}`],
      cryptosLastPrice[`${element}`]
    );

    const cryptoObject = {
      fullName: cryptosList[`${element}`].name,
      symbol: cryptosList[`${element}`].symbol,
      actualPrice: Math.floor(cryptosLive[`${element}`] * 100) / 100,
      lastPrice: Math.floor(cryptosLastPrice[`${element}`] * 100) / 100,
      imageUrl: cryptosList[`${element}`].icon_url,
      difference: priceDifference,
      differenceSign: Math.sign(priceDifference),
    };

    cryptoArray.push(cryptoObject);
  }

  res.json({ cryptoArray });
};

const getCryptoLiveFavorites = async (user) => {
  const url = `http://api.coinlayer.com/live?access_key=${process.env.ACCESS_KEY}`;

  try {
    const response = await axios.get(url);

    const filteredCryptos = await filterCryptosFavorites(
      response.data.rates,
      user
    );

    return filteredCryptos;
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const getCryptoListFavorites = async (user) => {
  const url = `http://api.coinlayer.com/list?access_key=${process.env.ACCESS_KEY}`;

  try {
    const response = await axios.get(url);

    const filteredCryptos = await filterCryptosFavorites(
      response.data.crypto,
      user
    );

    return filteredCryptos;
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const getCryptoLastDateFavorites = async (user) => {
  const yesterdayDateString = await getYesterdayDate();

  const url = `http://api.coinlayer.com/${yesterdayDateString}?access_key=${process.env.ACCESS_KEY}`;

  try {
    const response = await axios.get(url);

    const filteredCryptos = await filterCryptosFavorites(
      response.data.rates,
      user
    );

    return filteredCryptos;
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const filterCryptosFavorites = async (cryptosList, user) => {
  const filteredCryptos = Object.keys(cryptosList)

    .filter((key) => user.favorites.includes(key))
    .reduce((obj, key) => {
      obj[key] = cryptosList[key];
      return obj;
    }, {});

  return filteredCryptos;
};
