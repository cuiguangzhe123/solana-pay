import { Cluster, clusterApiUrl, Connection } from '@solana/web3.js';
import { Keypair, PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import {
    encodeURL,
    findTransactionSignature,
    FindTransactionSignatureError,
    validateTransactionSignature,
} from '../../src';


export const MERCHANT_WALLET = new PublicKey('8CWXyHtucmeZiVexTQCjUXmGc6AywQRa6a6jR86Epcgh');

/**
 * Establish a connection to the cluster
 */

export async function establishConnection(cluster: Cluster = 'devnet'): Promise<Connection> {
    const endpoint = clusterApiUrl(cluster);
    const connection = new Connection(endpoint, 'confirmed');
    const version = await connection.getVersion();
    console.log('Connection to cluster established:', endpoint, version);
    return connection;
}

export async function simulateCheckout(): Promise<{
    label: string;
    message: string;
    memo: string;
    amount: BigNumber;
    reference: PublicKey;
}> {
    return {
        label: 'Yummy Future',
        message: 'Your Order',
        memo: 'YF#4098',
        amount: new BigNumber(0.001),
        reference: new Keypair().publicKey,
    };
}


async function main() {

    console.log("Let's simulate a Solana Pay flow ... \n");
    let paymentStatus: string;

    console.log('1. ✅ Establish connection to the cluster');
    const connection = await establishConnection();

    console.log('\n2. 🛍 Simulate a customer checkout \n');
    const { label, message, memo, amount, reference } = await simulateCheckout();

    console.log('3. 💰 Create a payment request link \n');
    const url = encodeURL({ recipient: MERCHANT_WALLET, amount, reference, label, message, memo });

    console.log('4. ' + url + '\n');

}



main().then(
    () => process.exit(),
    (err) => {
        console.error(err);
        process.exit(-1);
    }
);