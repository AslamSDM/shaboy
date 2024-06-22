const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = 9898;
app.use(cors())
// Load games and calculate ranges
const games = require('./games.json');
let ranges = [];
let currentStart = 0;

const upload = multer({ dest: 'uploads/' });


games.forEach(game => {
    ranges.push({
        start: currentStart,
        end: currentStart + game.supply - 1,
        dir: game.name
    });
    currentStart += game.supply;
});

const findGameDir = (number) => {
    for (let range of ranges) {
        if (number >= range.start && number <= range.end) {
            return range.dir;
        }
    }
    return null;
};


const getGbaFileFromDir = (dir) => {
    try {
        const files = fs.readdirSync(dir).filter(file => path.extname(file) === '.gba');
        if (files.length !== 1) {
            throw new Error('There should be exactly one .gba file in the directory');
        }
        return files[0];
    } catch (e) { console.log(e) }
};

app.get('/game/:number', (req, res) => {
    console.log("get Request Recieved \n")
    const number = parseInt(req.params.number);
    if (isNaN(number)) {
        return res.status(400).send('Invalid number');
    }

    const gameDir = findGameDir(number);
    if (gameDir) {
        const dirPath = path.join(__dirname, '../roms', gameDir);
        console.log(dirPath)
        try {
            const gameFile = getGbaFileFromDir(dirPath);
            console.log(gameFile)
            const filePath = path.join(dirPath, gameFile);
            console.log(filePath)
            res.sendFile(filePath, (err) => {
                if (err) {
                    res.status(500).send('Error sending file');
                }
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    } else {
        res.status(404).send('Game not found');
    }
});

const createEmptygba = async (path_for_gba) => {
    try {
        fs.createWriteStream(path_for_gba)
        return true
    } catch (e) { console.log(e); return false }
}

const createDirectory = async (dirPath) => 
     {
        fs.mkdir(dirPath, { recursive: true },(err)=>{if(err) return false;
            return true})
    }
const rename = async (dirPath, newFilepath) => {
    {
    fs.renameSync(dirPath, newFilepath, (err) => {
        if (err) return false;
        return true
    })
}
}
const writeFile = async (newGameData, jsonpath) => {
    const data = JSON.stringify(newGameData, null, 2)
    fs.writeFile(jsonpath, data, (err) => {
        if (err) {
            console.log(err);
            return false
        }
        return true
    })
}

app.post('/upload', upload.single('gameFile'), async (req, res) => {
    console.log("post request recieved")
    const { originalname, filename } = req.file;
    const { gameName, supply } = req.body;

    if (!gameName || !supply) {
        return res.status(400).send('Game name and supply are required');
    }

    const supplyNumber = parseInt(supply, 10);
    if (isNaN(supplyNumber)) {
        return res.status(400).send('Supply must be a number');
    }
    let kok = true
    const newDir = path.join(__dirname, '../roms', gameName);
    kok = await createDirectory(newDir)
    // kok = await createEmptygba(path.join(newDir, originalname)).then(console.log("Created empty gba"))
    
        
    console.log(kok)




    const newFilePath = path.join(newDir, originalname);
    const dir_name = path.join(__dirname, "games.json")
    const dirPath = path.join(__dirname, '../uploads', filename)
    console.log({ dirPath })

    kok = await rename(dirPath, newFilePath).then(()=>{
        console.log("renamed")
        return true
    }).catch((err)=>{
        return false
    })

    console.log(kok)
    games.push({ name: gameName, supply: supplyNumber });

    kok = await writeFile(games, dir_name).then(()=>{
        return true
    }).catch((e)=>{
        return false
    })
    
    console.log({kok})
    if (kok)
        return res.send('Game uploaded and data updated successfully');
    else
        return res.status(400).send("Error uploading and updating docs")
});

app.listen(port, () => {
    console.log('Server is running on port 3001');
});
