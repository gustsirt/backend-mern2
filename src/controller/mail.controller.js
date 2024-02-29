import generateHtml from "../utils/generateHtml.js";
import { sendMail } from "../utils/sendMail.js";

class MailController {
  constructor() {}

  send = async (req, res) => {
    const {detail, products} = req.body;
    //console.log("detail: ",detail);
    //console.log("products: ",products);

    try {
      //console.log(req.user);
      const user = req.user

      const to       = user.email
      const subjet   = 'Detalle de tu Compra'
      const bodyhtml = generateHtml(detail, products)
      //console.log(bodyhtml);
      sendMail(to, subjet, bodyhtml)

      res.sendSuccess('mail enviado')
    } catch (error) {
      res.sendCatchError(error)
    }
  }
}

export default MailController;