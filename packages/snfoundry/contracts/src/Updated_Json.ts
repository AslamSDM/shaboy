import * as fs from 'fs';
import { promisify } from 'util';

interface Game {
  name: string;
  description: string;
  supply: number;
  image: string;
  animation_url: string;
  external_url: string;
  background_color: string;
  customImage: string;
  customAnimationUrl: string;
  hash: string;
  transaction_hash: string; // new element
  contract_address: string; // new element
}


interface GameData {
  gameData: Game[];
}


// read the original JSON file

async function Updater_json(selectedIndex: number, transaction_hash: string, contract_address: string) {
  const writeFileAsync = promisify(fs.writeFile);
  //const originalFilePath = 'nft_hash_data_complete.json'; // path to the original JSON file
  const originalFilePath = 'updatedgame_data.json'; // path to the original JSON file
  const newFilePath = 'updatedgame_data.json'; // path to the new JSON file

  try {
    const data = await promisify(fs.readFile)(originalFilePath, 'utf8');
    const gameData: GameData = JSON.parse(data);

    // add new elements to the selected game data
    if (selectedIndex >= 0 && selectedIndex < gameData.gameData.length) {
      const selectedGame = gameData.gameData[selectedIndex];
      selectedGame.transaction_hash = transaction_hash;
      selectedGame.contract_address = contract_address;
    } else {
      console.log(`Index ${selectedIndex} is out of range`);
    }

    // write the updated data to a new JSON file
    const updatedData = JSON.stringify(gameData, null, 2);
    await writeFileAsync(newFilePath, updatedData);

    console.log(`Updated game data written to ${newFilePath}!`);
  } catch (err) {
    console.error(err);
  }
}

export {Updater_json};

//Updater_json(7,'0x08080','0xtrans')