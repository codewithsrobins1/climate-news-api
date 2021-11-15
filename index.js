import express from 'express';
import newsPaperFiltering from './functions/newsPaper.js';
import newspapersLoop from './functions/newsPapers.js';

const PORT = process.env.PORT || 8000;
const app = express();

app.get('/', (req, res) => {
    res.json('Welcome to my Climate Change API!')
})

//  GET REQUEST -> Grab Html from website
app.get('/news', (req, res) => {
    let newsData = newspapersLoop();
    res.json(newsData);
})

//  GET REQUEST -> One Article
app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId;
    let data = newsPaperFiltering(newspaperId);
    res.json(data);

})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));