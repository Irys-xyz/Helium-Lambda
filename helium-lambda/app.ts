import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Bundlr from '@bundlr-network/client';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        // BUNDLR_URL needs to be in the fully qualified form, e.g`https://node1.bundlr.network`.
        // SOLANA_KEY needs to be the full 88 character long private key string, e.g `9aV2tL9hHM6hyr3QHPfgm5SbYqt4XqNMLE9AtXqAsbcTE1t9ic7vRtf69Ne9A6x7dGcYTa5W8yUysweTEpLgC7mv`
        const bundlr = new Bundlr(process.env.BUNDLR_URL!, 'solana', process.env.SOLANA_KEY!);
        const res = await bundlr.upload(event.body);
        const transactionId = res.id; // ID of the upload, accessible via `https://arweave.net/${transactionId}`
        return {
            statusCode: 200,
            body: transactionId,
        };
    } catch (err: unknown) {
        console.error(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.toString() : 'some error happened',
            }),
        };
    }

    return response;
};
