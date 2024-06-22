const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { gameData } = require('./realgame.json');

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NTE0YWQ0Ny1jMDcwLTQxZTQtYmNiNS05NWE4OTg1NWFjYzgiLCJlbWFpbCI6InNhbmR5YWd1ckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2MwNTNkYzRiZGUzOGQ5YzliODYiLCJzY29wZWRLZXlTZWNyZXQiOiIwNGNjYWFiMzI1ZjU3OGFiMjdjNzEwOGU0NmJkMmVjMWZhMjkyZTMxZDM3YzYxNDFkZThmZDFhZWJmOTRiN2VkIiwiaWF0IjoxNzE2Nzg4OTM1fQ.9QK-whdzxnNSm2VP6lA0ezDsXZTlmORYAE_ymbwKUL4"

const updateGameData = async (name, hash,fieldName) => {
  try {
    for (const item of gameData) {
      if (item.name === name) {
        item[fieldName] = `ipfs://${hash}`;
        break;
      }
    }
    // console.log(gameData);
  } catch (e) {
    console.log(e);
  }
};

const save = async (filename,data) => {
  fs.writeFileSync(`${filename}.json`, JSON.stringify( data , null, 2));
  console.log("done");
};

const pinFileToIPFS = async (filePath, filename,fieldname) => {
  const formData = new FormData();
  const file = fs.createReadStream(filePath);
  formData.append('file', file);

  const pinataMetadata = JSON.stringify({ name: filename });
  formData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({ cidVersion: 0 });
  formData.append('pinataOptions', pinataOptions);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${JWT}`
      }
    });
    console.log(res.data);
    await updateGameData(filename.split(".")[0], res.data.IpfsHash,fieldname);
  } catch (error) {
    console.log(error);
  }
};

const getAllFiles = async (dir) => {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = entries.filter(file => !file.isDirectory()).map(file => path.join(dir, file.name));
  const directories = entries.filter(file => file.isDirectory()).map(file => path.join(dir, file.name));

  for (const directory of directories) {
    const nestedFiles = await getAllFiles(directory);
    files.push(...nestedFiles);
  }

  return files;
};

const processFile = async (filePath) => {
  console.log(`Processing file: ${filePath}`);
  const filename = path.basename(filePath);
  await pinFileToIPFS(filePath, filename,'image');
};

const main_for_images = async () => {
  try {
    const directoryPath = './nft_data'; // Replace with your directory path
    const files = await getAllFiles(directoryPath);

    for (const file of files) {
      await processFile(file);
    }
    console.log(gameData)
    await save("realgame3",gameData);
  } catch (e) {
    console.log(e);
  }
};

// const pinata_for_metadata = async () => {
//   const formData = new FormData();
//   const metadata = JSON.stringify(data)
//   formData.append('pinataMetadata', metadata)
//   const config = JSON.stringify({ cidVersion: 0 })
//   formData.append('pinataOptions', config)
//   try {
//     const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//       maxBodyLength: "Infinity",
//       headers: {
//         'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
//         'Authorization': `Bearer ${JWT}`
//       }
//     });
//     console.log(res.data);
//     await updateGameData(data.name, res.data.IpfsHash,'nftHash');
//   } catch (error) {
//     console.log(error);
//   }


// }

const createJson =async(data) =>{
  fs.writeFileSync('temp.json', JSON.stringify(data , null, 2));
}

const main_for_metadata = async () => {
  try {
    // const { gameData } = require("./realgame.json")
    for (const e of gameData) {
      await createJson(e);
      await pinFileToIPFS('./temp.json', e.name,'hash');
    }
    await save("nft_hash_data_complete.json",gameData);
  } catch (e) { console.log(e) }
}
// main_for_images(); // un comment to upload images
main_for_metadata() //uncomment to upload uri
