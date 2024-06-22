import Replicate from "replicate";
import { promptgen } from "./prompt";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY as string,
});

console.log(process.env.REPLICATE_API_KEY)
export async function runModel(ownedgames: any[], emotion: string) {

  const prompt = promptgen(ownedgames, emotion)

  console.log(prompt)
  const output: any = await replicate.run(
    "mistralai/mistral-7b-instruct-v0.2",
    {
      input: {
        prompt: prompt,
        max_new_tokens: 150,
      },
    }
  );
  const jsonString = output.join('');
  console.log(jsonString)
  const start = jsonString.indexOf('{');
  const end = jsonString.lastIndexOf('}');

  try {
    if (start !== -1 && end !== -1) {
      const jsonContent = jsonString.substring(start, end + 1);

      const jsonObject = JSON.parse(jsonContent);
      console.log(jsonObject)
      return jsonObject;
    }

    const jsonObject = JSON.parse(jsonString);
    return jsonObject
  } catch (e) {
    console.log(e)
  }
}

