import '@pefish/js-node-assist';
export default class wallet {
    private wallet;
    private remote;
    constructor();
    getAllBySeedAndIndex(seed: string, index: number): {
        privateKey: any;
        publicKey: any;
    };
    sendContractTx(fromAccount: string, pkey: string, contractAddress: string, method: string, params: any[]): Promise<any>;
}
