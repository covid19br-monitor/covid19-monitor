const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp(functions.config().firebase);

function getDay(date) {
  let day = date.getDate().toString();
  return day.length === 1 ? "0" + day : day;
}

function getMonth(date) {
  let month = (date.getMonth() + 1).toString();
  return month.length === 1 ? "0" + month : month;
}

function formatDateApi(date) {
  const finalDay = getDay(date);
  const finalMonth = getMonth(date);
  const finalYear = date.getFullYear();

  return `${finalMonth}-${finalDay}-${finalYear}`;
}

exports.getDaily = functions.pubsub.schedule("every 2 hours").onRun(context => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayDate = formatDateApi(yesterday);
  const todayDate = formatDateApi(new Date());

  axios
    .get(`https://covid19.mathdro.id/api/daily/${yesterdayDate}`)
    .then(function(result) {
      const brasilData = result.data.filter(
        country => country.countryRegion === "Brazil"
      )[0];

      admin
        .database()
        .ref(`daily/${yesterdayDate}`)
        .set(parseInt(brasilData.confirmed, 10));
    });

  axios
    .get(`https://covid19.mathdro.id/api/countries/brazil`)
    .then(function(result) {
      admin
        .database()
        .ref(`daily/${todayDate}`)
        .set(result.data.confirmed.value);
    });

  return true;
});

exports.getData = functions.pubsub.schedule("every 1 hours").onRun(context => {
  axios
    .get(
      "https://especiais.g1.globo.com/bemestar/coronavirus/mapa-coronavirus/data/brazil-cases.json",
      {
        crossdomain: true
      }
    )
    .then(function(result) {
      admin
        .database()
        .ref("data")
        .set(result.data);
    });

  return true;
});

exports.getDataBrasilIo = functions.pubsub
  .schedule("every 1 hours")
  .onRun(async () => {
    const response = await admin
      .database()
      .ref(`brasilio/next`)
      .once("value");
    const next = response.val()
      ? response.val()
      : "https://brasil.io/api/dataset/covid19/caso/data?format=json&page=1";
    const page = next.split("page=")[1];

    axios.get(next).then(function(result) {
      admin
        .database()
        .ref(`brasilio/${page}`)
        .set(result.data);

      admin
        .database()
        .ref(`brasilio/next`)
        .set(result.data.next);
    });

    return true;
  });
