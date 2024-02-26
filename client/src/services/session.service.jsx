
export default class SessionService {
  constructor (uriBase, token) {
    this.uriBase =  uriBase;
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", token);
  }

  userSession = async() => {
    const response = await fetch(`${this.uriBase}api/sessions/user`, {
      method: "GET",
      headers: this.headers
    })
    return await response.json()
  }
}