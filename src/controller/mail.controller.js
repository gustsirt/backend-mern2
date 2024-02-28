import { sendMail } from "../utils/sendMail.js";


class MailController {
  constructor() {}

  send = async (req, res) => {
    let { html} = req.body;
    html = JSON.parse(html);
    console.log('LLEGA AQUI?');
    try {
      //console.log(req.user);
      const user = req.user

      const to       = user.email
      const subjet   = 'Probando'
      const bodyhtml = `<h2>Bienvenido a prueba de email ${user.name} ${user.lname}</h2>`
      
      console.log('bodyhtml: ',bodyhtml);
      console.log('html: ',html);

      //sendMail(to, subjet, bodyhtml)

      res.sendSuccess('mail enviado')
    } catch (error) {
      res.sendCatchError(error)
    }
  }
}

export default MailController;