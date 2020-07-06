import Wallet from "./wallet";
import * as assert from "assert";

describe('wallet', () => {
  let walletHelper: Wallet;

  before(()=>{
    walletHelper = new Wallet();
  });

  it('getAllBySeedAndIndex', async function () {
    const result = walletHelper.getAllBySeedAndIndex(`57328dheudue34eheufd`, 0)
    // global.logger.error(result)
    assert.deepStrictEqual(result[`privateKey`], `24i8ZropS2t23yQ7fcbk7uZctyBenFH32zM9N6FXa9cVqm2mCAyFXrCu5utkFyQMJqEtQuM9SNc2tG4pEHnWQeCF`)
    assert.deepStrictEqual(result[`publicKey`], `DFm2WkarEZLa5i9nQy4tByvginzmyhXAdhACZhmiFMMq`)
  });

  it('createAccount', async function () {
    // const result = await walletHelper.sendTx("laijiyong", "pkey", "auth.iost", "signUp", ["pefish","Ev7FZrj8YpXZ2RvoTVTbefMDLDUuN58z1pUuxzoa4289","Ev7FZrj8YpXZ2RvoTVTbefMDLDUuN58z1pUuxzoa4289"])
    // console.log(result)
  });
});

