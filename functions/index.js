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
      console.log(result.data);

      admin
        .database()
        .ref("data")
        .set(result.data);
    });

  return true;
});
