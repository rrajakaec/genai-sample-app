import { KendraClient, RetrieveCommand } from '@aws-sdk/client-kendra';

const kendraClient = new KendraClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AWS-ACCESS-KEY',
        secretAccessKey: 'AWS-SECRET-KEY',

    }
});

const kendraIndexId = 'KENDRA-INDEX-KEY'; //Kendra Index Id

export class AmazonKendraClient {

    async getResponse(queryText: string) {
        const input = {
            IndexId: kendraIndexId, // required
            QueryText: queryText, // required
        };
        const command = new RetrieveCommand(input);
        return kendraClient.send(command)
    }

    buildContext(searchResponse: any) : string {
        let context = '';
        console.log('searchResponse in get Context', searchResponse);
        //const searchResponseObj = JSON.parse(searchResponse);
        const resultItems = searchResponse.ResultItems;
        console.log('resultItems', resultItems);
        resultItems.forEach((resultItem: any) => {
            context += '\n----------------------\n';
            context += 'Type: Document\n';
            context += 'URI: ' + resultItem.DocumentURI + '\n';
            context += 'Title: ' + resultItem.DocumentTitle + '\n';
            context += resultItem.Content;
            context += '\n----------------------\n';            
        });
        return context;
    }

}