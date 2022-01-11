/*
Query a REST API to get a list of articles. Given an integer, limit, return the top limit article names ordered decreasing by comment count, then decreasing alphabetically for those that have the same comment counts.

To access the collection of comments, make an HTTP GET request to:

https://jsonmock.hackerrank.com/api/articles?page=<pageNumber>

where <pageNumber> is an integer where 1 <= pageNumber <= total_pages. total_pages is one of the fields in the JSON data.

The response is a JSON object with the following 5 fields:

page: The current page of the results
per_page: The maximum number of records returned per page.
total: The total number of records on all pages of the result.
total_pages: The total number of pages with results.
data: An array of objects containing records returned on the requested page

Each record in data has the following schema.

title: the title of the article, may be null
url: the URL of the article
author: the username of the author of the article
num_comments: the number of comments the article has, may be null (no comments)
story_id: identifier of the story related to the article, may be null
story_title: the title of the story related to the article, may be null
story_url: the URL of the story related to the article, may be null
parent_id: identifier of the parent of the article,  may be null
created_at: the date and time the record was created

First get the article name.

If the title field is not null, use title.
Otherwise, if the story_title field is not null, use story_title.
If both fields are null, ignore the article.

Sort the titles decreasing by comment count, then decreasing alphabetically by article name if there is a tie in comments count. Return a list of the top limit names.

Function Description

Complete the function topArticles in the editor below.
topArticles has the following parameter(s):

    int limit: the number of articles to return

Returns

    string[k]: the names of articles

*/
const axios = require(`axios`)

async function topArticles(limit) {
  let currentPage = 1
  //This variable initial value is to ensure the loop will run one time, it will be assigned the correct value on every run
  let lastPage = 2
  const articles = []

  while (currentPage <= lastPage) {
    const rawResponse = await axios.get(
      `https://jsonmock.hackerrank.com/api/articles?page=${currentPage}`,
    )
    const { data: currentPageArticles, total_pages: totalPages } =
      rawResponse.data
    currentPageArticles.forEach((article) => {
      const articleTitle = article.title || article.story_title || null
      if (articleTitle != null) {
        articles.push({ articleTitle, commentsCount: article.num_comments })
      }
    })
    lastPage = totalPages
    currentPage += 1
  }
  articles.sort(
    (articleA, articleB) =>
      articleB.commentsCount - articleA.commentsCount ||
      articleB.articleTitle.localeCompare(articleA.articleTitle),
  )
  const topCommentedArticleTitles = articles
    .slice(0, limit)
    .map((article) => article.articleTitle)
  return topCommentedArticleTitles
}

topArticles(5).then(console.log).catch(console.log)
