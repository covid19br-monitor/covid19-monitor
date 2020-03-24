const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp(functions.config().firebase);

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
  .schedule("every 10 minutes")
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
