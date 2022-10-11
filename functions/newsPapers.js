import { newspapers } from '../newspapers.js';
import axios from 'axios';
import cheerio from 'cheerio';

const articles = [];

//Loop Through All Newspapers
const newspapersLoop = () => {
    newspapers.forEach((newsPaper) => {
        axios.get(newsPaper.address)
        .then((response) => {
            
            const html = response.data;
            console.log('I AM HTML', html);

            //Use Cheerio to Grab Markup
            const $ = cheerio.load(html);

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text();
                const url = $(this).attr('href');

                articles.push({
                    title,
                    url: newsPaper.base + url,
                    source: newsPaper.name

                })
            })
        }).catch((err) => console.log(err))
    })

    return articles;
}

export default newspapersLoop;