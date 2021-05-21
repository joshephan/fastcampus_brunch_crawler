const axios = require("axios");
const fs = require("fs");

let article = {};
const crawler = (pageNumber) => {
  axios
    .get(
      `https://api.brunch.co.kr/v1/search/article?q=Hello%20World&page${pageNumber}=&pageSize=20&highlighter=y&escape=y&sortBy=accu`
    )
    .then((response) => {
      const data = response.data;
      article[pageNumber] = data.data.list.map((item) => {
        return {
          title: item.title,
          contentSummary: item.contentSummary,
          contentId: item.contentId,
        };
      });

      console.log("current page number: ", pageNumber);
      const nextNumber = pageNumber + 1;
      if (nextNumber < 10) {
        crawler(nextNumber);
        return;
      }
      fs.writeFile(
        "brunch_article.json",
        JSON.stringify(article),
        (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("success file write");
        }
      );
    });
};

crawler(1);
