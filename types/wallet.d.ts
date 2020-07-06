import '@pefish/js-node-assist';
interface Option {
    gasRatio: number;
    gasLimit: number;
    delay: number;
    expiration: number;
    url: string;
}
export default class wallet {
    private wallet;
    private remote;
    constructor(opts?: Option);
    getAllBySeedAndIndex(seed: string, index: number): {
        privateKey: any;
        publicKey: any;
    };
    sendContractTx(fromAccount: string, pkey: string, contractAddress: string, method: string, params: any[]): Promise<any>;
}
export {};
