import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Bundlr from '@bundlr-network/client';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const bundlr = new Bundlr(process.env.BUNDLR_URL!, 'solana', process.env.SOLANA_KEY!);
        const res = await bundlr.upload(event.body);
        return {
            statusCode: 200,
            body: res.id,
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
