import { createClient, SupabaseClient } from '@supabase/supabase-js';
import  * as fs from 'fs';
import * as JSON5 from 'json5';

// Supabase configuration
const url = 'https://hndlkmlagfqlknovacdw.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZGxrbWxhZ2ZxbGtub3ZhY2R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMDE3OTcsImV4cCI6MjAzMzc3Nzc5N30.ydBWlPQxBzceFcyF5RlAFN2irUaHB73T0JsfFocOBSU';
const supabase: SupabaseClient = createClient(url, key);

interface GameData {
  name: string;
  supply: number;
  [key: string]: any; // To handle any additional properties
}

interface JsonData {
  gameData: GameData[];
}

async function Parsor_func(i:number,transaction_hash: string, contract_address: string) {
  // Read the JSON file
  fs.readFile('updategame_data.json', 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    // Parse the JSON data
    const jsonData: JsonData = JSON5.parse(data);
    let j = 0;

    // Iterate over the game data and insert into Supabase
    for (let i = 0; i < jsonData.gameData.length; i++) { 
      const gameName = jsonData.gameData[i].name || 'name'; // Adjust the key to match the actual name key in your JSON
      const game = jsonData.gameData[i]

      
        try {
          const { error, status } = await supabase
            .from('Shaboy_Data_!')
            .insert({ name: gameName, metadata: game, id: j ,contract_adress: contract_address, transaction_hash: transaction_hash});

          if (status === 201) {
            console.log(`Inserted game: ${gameName}`);
          } else {
            console.log(`Failed to insert game: ${gameName}. Error: ${error}`);
          }
        } catch (error) {
          console.error(`Error inserting game: ${error}`);
        }

        // Add delay between each insertion
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
        j++;
      
    

    console.log('All data inserted.');
}});
}


export { Parsor_func };
//Parsor_func(5,'0x055050','0xcontract' )