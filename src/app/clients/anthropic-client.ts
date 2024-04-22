import Anthropic from '@anthropic-ai/sdk';

let domain = '';
if (typeof window !== 'undefined') {
    domain = window?.location?.origin;
 }
const anthropic = new Anthropic({
    apiKey: 'ANTHROPIC-API-KEY',
    baseURL: domain + '/anthropic/',
});

export class AnthropicClient {
    
    async getResponse(inputText: string) {
        return anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 2048,
            messages: [{ role: "user", content: inputText }],
        }); 
    } 

}

