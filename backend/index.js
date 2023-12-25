const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.post('/registration_form', (req, res) => {
    try {
        const formData = req.body;

        const dataFile = fs.readFileSync('./clients.json', 'utf8');

        let data = [];

        if (dataFile.trim() !== '') {
            data = JSON.parse(dataFile);
        }

        data.push(formData);

        fs.writeFileSync('./clients.json', JSON.stringify(data, null, 2), { flag: 'w' });

        res.status(200).send('Data added to JSON file');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

app.get('/sign_in_form', (req, res) => {
    try {

        const {name, password} = req.query;

        const dataFile = fs.readFileSync('./clients.json', 'utf8');
        let data = [];

        if(dataFile.trim() !== '') {
            data = JSON.parse(dataFile);
        }

        const authClient = data.find(client => client.name === name && client.password === password);
        console.log(authClient);
        if (authClient) {
            res.status(200).json(authClient);
        } else {
            res.status(401).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
