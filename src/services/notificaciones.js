const admin = require("firebase-admin");

const service = {
  configurar() {
    try {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: "https://pushapiv1.firebaseio.com",
      });
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async enviarNotificacion() {
    try {
      this.configurar();

      var topic = "todos";

      var message = {
        data: {
          score: "850",
          time: "2:45",
        },
        topic: topic,
      };

      const response = await admin.messaging().send(message);
      console.log("repuesta del mensaje: " + response);
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.FeriaService = service;
