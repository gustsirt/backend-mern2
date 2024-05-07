import generateHtml from "../../libraries/mail/generateHtml.js";
import { sendMail } from "../../libraries/mail/sendMail.js";

class MailController {
  constructor() {}

  send = async (req, res) => {
    const {detail, products} = req.body;

    try {
      const user = req.user

      const to       = user.email
      const subjet   = 'Detalle de tu Compra'
      const bodyhtml = generateHtml(detail, products)

      sendMail(to, subjet, bodyhtml)

      res.sendSuccess('mail enviado')
    } catch (error) {
      res.sendCatchError(error)
    }
  }
}

export default MailController;