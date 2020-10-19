const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => 
{
    res.send("Server is runing")
})

app.get('/read', (req, res) => 
{
    let rawdata = fs.readFileSync('./data.json')
    let data = JSON.parse(rawdata)

    res.send(data)
})

app.post('/write', async (req, res, next) =>
{
    const requestContent = JSON.stringify(req.body)
    await WriteTextToFileAsync(requestContent)
})

async function WriteTextToFileAsync(contentToWrite)
{
    fs.writeFile('./data.json', contentToWrite, err =>
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            console.log('Done writing to file')
        }
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))