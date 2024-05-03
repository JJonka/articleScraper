import axios from "axios";
import { load } from "cheerio";
import fs from "fs";

async function scrapeSite() {
  const url = `https://www.polityka.pl/tygodnikpolityka/kraj/2254393,1,sikorski-wyznacza-cele-gdy-sytuacja-na-swiecie-jest-grozna-reakcja-dudy-nie-miesci-sie-w-glowie.read?src=mt`;
  const { data } = await axios.get(url);
  const $ = load(data);

  let results = {};
  $("div.cg_article_title").each((i, elem) => {
    const header = $(elem).find("h1").text();
    const date = $(elem).find("div.cg_date").text();
    results = { ...results, header: header, date: date };
  });

  const author = $("div.cg_article_author_name").text();
  results = { ...results, author: author };

  const shortEntry = $("div.cg_article_lead").text();
  results = { ...results, shortEntry: shortEntry };

  let paragraphs = [];

  $("div.cg_article_meat").each((i, elem) => {
    $(elem)
      .find("h2, p")
      .each((i, elem) => {
        if (elem.name == "p") {
          if (!$(elem).text().includes("Czytaj też")) {
            paragraphs.push({ para: $(elem).text() });
          }
        }
      });
  });

  results = { ...results, paragraphs: paragraphs };

  fs.writeFile("./articleData.json", JSON.stringify(results), () =>
    console.log("File saved")
  );

  return results;
}

scrapeSite()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));
