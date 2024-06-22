




const sysprompt = `You are a game suggesting assistant. I will give you descriptions on a few games I own, and what emotion am I feeling now. You will have to suggest a game that fits my mood.The suggested game should be strictly one of the games I own.
The output should be strictly in the format of a JSON object with the following

{
game: "game_name"
}
`


export function promptgen(ownedgames: any[], emotion: string) {

  let prompt = sysprompt
  if (!ownedgames) return null
  if (!emotion) return null
  if (ownedgames.length === 0) return null

  prompt += `I own ${ownedgames.length} games.`
  prompt += `Here are the games I own:`
  for (const game of ownedgames) {
    prompt += `\nGame: ${game.name}, Description: ${game.description}\n`
  }
  prompt += `\nI am feeling ${emotion} right now. Suggest a game that fits my mood. Game should be strictly from the list i provided.`

  return prompt
}
