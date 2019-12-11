const Chain = artifacts.require("./Chain.sol");

contract('Chain', (accounts) => {
  before(async () => {
    this.chain = await Chain.deployed();
  })

  it('deploys successfully', async () => {
    const address = await this.chain.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('creates a meme', async () => {
    const memeTotalRight = await this.chain.memeTotal()
    assert.equal(memeTotalRight, 1)
    const result = await this.chain.createMeme("It is Wednesday, my dudes", 1, "nickwang")
    const memeTotalRight2 = await this.chain.memeTotal()
    assert.equal(memeTotalRight2, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.text, "It is Wednesday, my dudes")
    assert.equal(event.username, "nickwang")
  })

})
