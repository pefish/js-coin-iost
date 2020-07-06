import '@pefish/js-node-assist'
import nacl from 'tweetnacl'
import { KeyPair } from 'iost/index'
import ErrorHelper from '@pefish/js-error';
import IOST from 'iost/index'
import bs58 from 'bs58'

export default class wallet {
  private wallet: IOST.IOST
  private remote: IOST.RPC

  constructor () {
    this.wallet = new IOST.IOST({
      gasRatio: 1,
      gasLimit: 200000,
      delay:0,
      expiration: 90,
    });
    this.remote = new IOST.RPC(new IOST.HTTPProvider('http://api.iost.io'));
    this.wallet.setRPC(this.remote);
  }

  getAllBySeedAndIndex(seed: string, index: number) {
    if (seed.length !== 20) {
      throw new ErrorHelper(`length of seed must be 20`)
    }
    const newSeed = seed + index.toString().padStart(12, `0`)
    const kp1 = nacl.sign.keyPair.fromSeed(newSeed.toBuffer_());
    const kp2 = new KeyPair(Buffer.from(kp1.secretKey.buffer));
    return {
      privateKey: kp2.B58SecKey(),
      publicKey: kp2.B58PubKey()
    }
  }

  async sendContractTx (fromAccount: string, pkey: string, contractAddress: string, method: string, params: any[]) {
    const account = new IOST.Account(fromAccount);
    const kp = new IOST.KeyPair(bs58.decode(pkey));
    account.addKeyPair(kp, "active");

    this.wallet.setAccount(account);
    let tx = this.wallet.callABI(
      contractAddress,
      method,
      params,
    );
    tx.addApprove(`iost`, 50)
    tx.addSign(kp)
    tx.addPublishSign(fromAccount, kp)
    return await this.remote.transaction.sendTx(tx)
  }
}