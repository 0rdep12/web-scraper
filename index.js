const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const express = require('express')

const app = express()

const url = 'https://nftnow.com/category/features/'

axios(url)
    .then(response => {
       const html = response.data
       const c_load = cheerio.load(html)
       const articles = []

       c_load('.section-home-latest__article-title', html).each(function(){
        const title = c_load(this).text()
        const url = c_load(this).find('a').attr('href')
        articles.push({
            title,
            url
        })
       })
       console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

