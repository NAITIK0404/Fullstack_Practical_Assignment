import fetch from 'node-fetch';
import * as cheerio from 'cheerio'; // Use named import

async function fetchGooglePage() {
    try {
        const response = await fetch('https://www.google.com');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        const $ = cheerio.load(data);
        
        // Example: Get the title of the page
        const title = $('title').text();
        console.log(`Title: ${title}`);

        // Example: Get the first link
        const firstLink = $('a').first().attr('href');
        console.log(`First link: ${firstLink}`);
    } catch (error) {
        console.error(`Error fetching Google page: ${error.message}`);
    }
}

fetchGooglePage();
