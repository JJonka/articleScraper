const getData = async () => {
  const url = `http://localhost:8888/articleData`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const render = async () => {
  const data = await getData();
  return data;
};
const data = await render();
console.log(data);

const root = document.getElementsByClassName("root")[0];
const sheet = document.createElement("div");
sheet.className = "sheet";
const date = document.createElement("div");
date.className = "date";
const newsPaper = document.createElement("div");
newsPaper.className = "newspaper";
const articleTitle = document.createElement("h3");
const articleAuthor = document.createElement("div");
articleAuthor.className = "articleAuthor";
const shortEntry = document.createElement("h5");

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
  if (Object.keys(data.paragraphs[i]) == "paraTitle") {
    let paraTitle = document.createElement("h5");
    paraTitle.innerHTML = Object.values(data.paragraphs[i]);
    sheet.appendChild(paraTitle);
  } else if (Object.keys(data.paragraphs[i]) == "para") {
    let para = document.createElement("div");
    para.className = `para${i}`;
    para.innerHTML = Object.values(data.paragraphs[i]);
    sheet.appendChild(para);
  }
}
