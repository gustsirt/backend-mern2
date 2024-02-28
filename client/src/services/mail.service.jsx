
export default class MailService {
  constructor (uriBase, token) {
    this.uriBase =  uriBase;
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", token);
  }

  sendEmail = async (html) => {
    const response = await fetch(`${this.uriBase}api/mail/send`, {
      method: "POST",
      mode: 'no-cors',
      headers: this.headers,
      body: JSON.stringify(html)
    })
    return response
  }
}

