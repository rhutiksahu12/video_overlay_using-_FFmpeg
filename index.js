const express = require('express')
const app = express()
const cors = require('cors')
const ffmpeg = require('ffmpeg');
const { exec } = require('child_process')


app.use(cors());
app.use(express.json())

const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/addName', (req, res) => {
    const name = req.body.name;
    const inputPath = "./video/input_video.mp4"
    const font = "./utils/Roboto-Black.ttf"
    const playIcon = "./utils/play.jpg"
    
    exec(`ffmpeg -i ${inputPath} -i play.jpg -filter_complex "[0:v] [1:v]overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2,  drawtext=fontfile=${font}:text=${name}:fontcolor=white:fontsize=172:box=1:boxcolor=maroon:boxborderw=100:x=(w-text_w)/2:y=(h-th)"  -codec:a copy output.mp4
    `
    , (err) => {
        if (err) {
            console.log(err)
        } else {

            res.send("Converted")
        }

    })



})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))