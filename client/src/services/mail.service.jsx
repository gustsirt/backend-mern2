
export default class MailService {
  constructor (uriBase, token) {
    this.token = token;
    this.uriBase =  uriBase;
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", this.token);
  }

  sendEmail = async (variables) => {
    const response = await fetch(`${this.uriBase}/api/mail/send`, {
      method: "POST",
      //mode: 'no-cors',
      headers: this.headers,
      body: JSON.stringify(variables)
    })
    return response
  }
}

