const axios = require('axios').default;

const service = {
  async obtenerBancos() {
    try {

      const bancos = await axios.post('https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi', {
        language: "es",
        command: "GET_BANKS_LIST",
        merchant: {
           apiLogin: "pRRXKOl8ikMmt9u",
           apiKey: "4Vj8eK4rloUd272L48hsrarnUA"
        },
        test: false,
        bankListInformation: {
           paymentMethod: "PSE",
           paymentCountry: "CO"
        }
     });


      return bancos.data.banks;

    } catch (error) {
        return `Error ${error}`;
    }
  },
}

module.exports.plataformaPagosService = service;