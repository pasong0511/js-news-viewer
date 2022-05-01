const API_URL = "https://newsapi.org/v2/top-headlines"
// const API_KEY = "7ef90b0f99ed4dcdb045a0823b3f9c5c"
const API_KEY = "8eb2be5bf17948e3b0248e98ec335bc8"

async function fetchNewsList(newsState) {
    const API_END_POINT = `${API_URL}?country=kr&category=${newsState.category === 'all' ? '' : newsState.category}&page=${newsState.page}&pageSize=${newsState.limit}&apiKey=${API_KEY}`
    try {
        const response = await axios.get(API_END_POINT);
        if (response.data.status !== "ok") {
            throw new Error("서버의 상태가 이상합니다")
        }
        return response.data.articles
    } catch (error) {
        console.error(error);
    }
}

export default async function lodingFetchNewsList(newsState) {
    try {
        const newsData = await fetchNewsList(newsState)
        return newsData
    } catch (e) {
        throw new Error(`무엇인가 잘못 되었습니다. ${e.message}`)
    }
}