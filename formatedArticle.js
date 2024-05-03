import PuppeteerHTMLPDF from "puppeteer-html-pdf";
import data from "./articleData.json" assert { type: "json" };

// const getData = async () => {
//   const url = `http://localhost:8888/articleData`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// };

// const render = async () => {
//   const data = await getData();
//   return data;
// };
// const data = await render();
// console.log(data);

const root = document.getElementsByClassName("root")[0];
const sheet = document.createElement("div");
sheet.className = "sheet";
const date = document.createElement("div");
date.className = "date";
const newsPaper = document.createElement("div");
newsPaper.className = "newspaper";
const articleTitle = document.createElement("h3");
articleTitle.className = "articleTitle";
const articleAuthor = document.createElement("div");
articleAuthor.className = "articleAuthor";
const shortEntry = document.createElement("h5");
shortEntry.className = "shortEntry";

root.appendChild(date);
root.appendChild(sheet);

sheet.appendChild(newsPaper);
sheet.appendChild(articleTitle);
sheet.appendChild(articleAuthor);
sheet.appendChild(shortEntry);

newsPaper.innerHTML = "POLITYKA";

date.innerHTML = data.date;
articleTitle.innerHTML = data.header;

articleAuthor.innerHTML = data.author.toUpperCase();

shortEntry.innerHTML = data.shortEntry;

for (let i = 0; i < data.paragraphs.length; i++) {
  console.log(data.paragraphs[i]);
  // if (Object.keys(data.paragraphs[i]) == "paraTitle") {
  //   let paraTitle = document.createElement("h5");
  //   paraTitle.innerHTML = Object.values(data.paragraphs[i]);
  //   sheet.appendChild(paraTitle);
  if (Object.keys(data.paragraphs[i]) == "para") {
    let para = document.createElement("div");
    para.className = `para${i}`;
    para.innerHTML = `\u2029\u2029\u2029\u2029\u2029${Object.values(
      data.paragraphs[i]
    )}`;
    let paraArray = para.textContent.split(" ");
    console.log(paraArray);
    for (let i = 0; i < paraArray.length; i++) {
      if (paraArray[i].length == 1) {
        paraArray[i] = `${paraArray[i]}\u00A0${paraArray[i + 1]}`;
        paraArray.splice(i + 1, 1);
      }
    }
    para.textContent = paraArray.join(" ");
    sheet.appendChild(para);
  }
}

const htmlPDF = new PuppeteerHTMLPDF();

const html = await htmlPDF.readFile(_dirname + "/index.html", "utf8");

try {
  const pdfBuffer = await htmlPDF.create(html);
  const filePath = `${__dirname}/sample.pdf`;
  await htmlPDF.writeFile(pdfBuffer, filePath);
} catch (error) {
  console.log("PuppeteerHTMLPDF error", error);
}
