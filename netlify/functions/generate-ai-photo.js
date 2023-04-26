import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

export const handler = async (event) => {
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    };
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Successful preflight call." }),
      };
    } else if (event.httpMethod === "POST") {
      const { prompt } = JSON.parse(event.body);

      const response = await openai.createImage({
          prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'b64_json'
      });
  
      const image = response.data.data[0].b64_json;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ photo: image}),
      };
    }
  } catch (error) {
    console.error({ error });

    return {
      statusCode: 500,
      body: JSON.stringify({ error, message: "Something went wrong" }),
    };
  }
};
