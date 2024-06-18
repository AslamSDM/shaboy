// Import required modules
const { createHeliaHTTP } = require('@helia/http');
const fs = require('fs');
const path = require('path');

// Initialize the Helia client
async function initializeHelia() {
  const helia = await createHeliaHTTP({
    host: 'https://ipfs.infura.io', // Replace with the actual host if needed
    port: 5001,
    protocol: 'https'
  });
  return helia;
}

// CID of the uploaded folder
const folderCid = 'QmVDSwaLFbzgvL5CvmnrxwPVWX5hQizn9xCrANFE8om2MK';

// Function to retrieve filenames and CIDs from Helia
async function getFilesFromHelia(helia, cid) {
  const fileList = [];

  for await (const file of helia.ls(cid)) {
    if (file.type === 'file') {
      fileList.push({ name: file.name, cid: file.cid.toString() });
    }
  }

  return fileList;
}

// Function to write the filenames and CIDs to a text file
async function writeFilesToText(fileList) {
  const output = fileList.map(file => `${file.name}: ${file.cid}`).join('\n');
  fs.writeFileSync('ipfs_files.txt', output, 'utf8');
  console.log('Filenames and CIDs have been written to ipfs_files.txt');
}

// Main function to execute the script
async function main() {
  try {
    const helia = await initializeHelia();
    const files = await getFilesFromHelia(helia, folderCid);
    await writeFilesToText(files);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the main function
main();
