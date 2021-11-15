import axios from 'axios';
import cheerio from 'cheerio';
import { newspapers } from '../newspapers.js';

const newsPaperFiltering = (newspaperId) => {
    
    const newspaperAddress = newspapers.filter((newspaper) => newspaper.name === newspaperId)[0].address;
    const newspaperBase = newspapers.filter((newspaper) => newspaper.name === newspaperId)[0].base;

    const specificArticles = [];

    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            
            $('a:contains("climate")', html).each(function() {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
        }).catch(err => console.log(err));

    if (specificArticles.length === 0){
        return 'Sorry, no articles available at this time.'
    }
    else{
        return specificArticles
    }
}

export default newsPaperFiltering