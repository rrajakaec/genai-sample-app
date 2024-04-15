import React, { useState } from "react"
import Anthropic from '@anthropic-ai/sdk';
import './genai.css'; // import CSS file for styling

const domain = window?.location?.origin || '';
const anthropic = new Anthropic({
  apiKey: '', // defaults to process.env["ANTHROPIC_API_KEY"]
  baseURL: domain + '/anthropic/',
});

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
    anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 512,
      messages: [{ role: "user", content: inputText }],
    }).then((msg) => {
      console.log(msg);
      if (msg.content.length > 0) {
        setResponseText(msg.content[0].text);
      } else {
        setResponseText("There is no response");
      }
    }).catch((error) => {
      console.log(error);
      setResponseText(error + "");
    });
    //console.log(msg);
    
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
        <div className="response">{responseText}</div>
      </div>
    </div>
  )
}