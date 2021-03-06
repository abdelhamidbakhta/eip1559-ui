import {transactionToRequestPayload} from "../util/transaction";

const axios = require('axios').default;

export default class TransactionService {
    constructor(config) {
        this.config = config;
    }

    async submitTransaction(transaction, privateKey) {
        try {
            const requestPayload = transactionToRequestPayload(transaction);
            console.log(JSON.stringify(requestPayload));
            const txEndpoint = transaction.isEIP1559 ? this.config.apiGateway.submitEIP1559TransactionEndpoint : this.config.apiGateway.submitFrontierTransactionEndpoint;
            const response = await axios.post(`${this.config.apiGateway.rootEndpoint}/${txEndpoint}/${privateKey}`, requestPayload);
            return response.data.transactionHash;
        } catch (error) {
            console.log("error", error);
        }
    }
}