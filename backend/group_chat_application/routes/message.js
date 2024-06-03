const express = require('express');
const fs = require('fs')

const app = express();

const router = express.Router()


router.post('/', (req, res) => {
    const { username, message } = req.body;

    if (message !== undefined) {
        const newMessage = `${username}: ${message}\n`;
        fs.appendFile('user.txt', newMessage, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error writing message');
            }
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

router.get('/', (req, res) => {
    fs.readFile('user.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            data = 'No message to display';
        }

        res.send(`
            <div>${data.replace(/\n/g, '<br>')}</div>
            <form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
                <input id="message" name="message" type="text" placeholder="Enter message" required>
                <input type="hidden" name="username" id="username"><br>
                <button type="submit">Send</button>
            </form>
        `);
    });
});


module.exports = router