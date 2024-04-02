import { expect } from 'chai';
import { createHash, isValidPassword, createHashAsync, isValidPasswordAsync } from '../../src/utils/passwords.js';



describe('Test de bcrypt', () => {
  before(function () {
    this.user = {
      name: 'test',
      password: "123456"
    }
  })
  //contexto  (antes de cada test)
  beforeEach(function () {
    this.timeout(3000)
  })

  it("El servicio createHash debe hashear la password (sincronico) - passw != hash", function () {
    const hashedPassword = createHash(this.user.password)

    expect(hashedPassword).to.not.equal(this.user.password)
  })
  it("Probando el password Validation (sincronico) - valid passw = hash", function () {
    const hashedPassword = createHash(this.user.password)
    const result = isValidPassword (this.user.password, {password: hashedPassword})
    expect(result).to.be.true
  })
  it("El servicio createHash debe hashear la password (Asincronico) - passw != hash", async function () {
    const hashedPassword = createHashAsync(this.user.password)

    expect(hashedPassword).to.not.equal(this.user.password)
  })
  it("Probando el password Validation (Asincronico) - valid passw = hash", async function () {
    const hashedPassword = await createHashAsync(this.user.password)
    const result = await isValidPasswordAsync(this.user.password, {password: hashedPassword})
    expect(result).to.be.true
  })
}) 