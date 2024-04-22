import React, { useState } from "react";
import { AnthropicClient } from "../app/clients/anthropic-client";
import { AmazonKendraClient } from "../app/clients/amazon-kendra-client";
import { Prompt } from "../app/prompts/prompt"

import './genai.css'; // import CSS file for styling

export default function GenAi() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // You can process inputText here if needed
    // For now, just echoing it back as response
    
    console.log('Trying to connect to Antropic');
    /** [R] Retrieval - Kendra Amazon Intelligent Search */
    const kendraClient = new AmazonKendraClient();
    const searchResponse = await kendraClient.getResponse(inputText);

    console.log('searchResponse', searchResponse);
    const context = kendraClient.buildContext(searchResponse);
    /** Context Retrieval Done */
    /** [A] Build Augmented Prompt using user question, context and system prompt*/
    const prompt = new Prompt();
    const augmentedPrompt = prompt.getAugmentedPrompt(inputText, context);
    console.log('augmentedPrompt', augmentedPrompt);
    /** [G] Generate Response from LLM model */
    let llmClient = new AnthropicClient();
    const llmResponse = await llmClient.getResponse(augmentedPrompt);
    console.log('llmResponse', llmResponse);
    
    setResponseText(llmResponse.content[0].text);
    
  };

  return (
    <div className="genai">
      <div className="left">
        <form onSubmit={handleFormSubmit}>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter your input..."
            rows={10}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="right">
        <div className="response">
          <div dangerouslySetInnerHTML={{ __html: responseText }} />          
        </div>
      </div>
    </div>
  )
}