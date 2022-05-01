export default class News {
    constructor(news) {
        this.title = news.title
        this.url = news.url
        this.urlToImage = news.urlToImage
        this.description = news.description
    }

    //썸네일 제작
    createNewsItemThumbnail() {
        const thumbnail = document.createElement("div")
        const a = document.createElement("a")
        const img = document.createElement("img")

        thumbnail.className = "thumbnail"
        a.setAttribute("href", this.url)
        a.setAttribute("target", "_blank")
        a.setAttribute("rel", "noopener noreferrer")

        img.setAttribute("src", this.urlToImage)
        img.setAttribute("alt", "thumbnail")

        a.appendChild(img)
        thumbnail.appendChild(a)

        return thumbnail
    }

    createNewsItemContent() {
        const constents = document.createElement("div")
        const h = document.createElement("h2")
        const p = document.createElement("p")
        const a = document.createElement("a")

        constents.className = "contents"

        a.setAttribute("href", this.url)
        a.setAttribute("target", "_blank")
        a.setAttribute("rel", "noopener noreferrer")
        a.innerText = this.title

        p.innerText = this.description

        h.appendChild(a)
        constents.appendChild(h)
        constents.appendChild(p)

        return constents
    }

    createNewsItem() {
        const newsItem = document.createElement("section")
        newsItem.className = "news-item"

        newsItem.appendChild(this.createNewsItemThumbnail())
        newsItem.appendChild(this.createNewsItemContent())

        return newsItem     //section 하나 만들어서 반환
    }
}