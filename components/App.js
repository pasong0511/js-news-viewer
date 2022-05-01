import createCategorySelector from './Nav.js';
import News from './NewsList.js';
import lodingFetchNewsList from "./api.js";

//$app은 root 엘리먼트
export default function App($root) {
    const newsState = {
        category: "all",
        page: 0,
        limit: 5,
    }

    const updateNewsList = async (parentEl, newsState, force = false) => {
        const newsDatas = await lodingFetchNewsList(newsState)   //상태 넘겨받아서 API요청해서 5개 받아왔어

        //force가 false이면 밑에 붙여주기, true면 새로 그려주기
        if (force) {
            parentEl.innerText = ""
        }

        if (newsDatas) {
            //5개 있는 뉴스데이터들을 하나씩 뽑아서 뉴스 엘리먼트로 만들어준다.
            newsDatas.forEach(newsData => {
                const newNode = new News(newsData).createNewsItem()
                parentEl.appendChild(newNode)
            })
        }
    }

    const createNewsList = async (newsState) => {
        //API 데이터 가져와서 article.news - list 붙인다.
        const newsList = document.createElement("article")
        newsList.className = "news-list"

        //return await updateNewsList(newsListEl, newsState, true)
        await updateNewsList(newsList, newsState, true)
        return newsList
    }


    const createScrollObserver = () => {
        const scrollObserver = document.createElement("div")
        const img = document.createElement("img")
        scrollObserver.className = "scroll-observer"
        img.setAttribute("src", "img/ball-triangle.svg")
        img.setAttribute("alt", "Loading...")

        scrollObserver.appendChild(img)

        return scrollObserver
    }

    const render = async ($root) => {
        const newsListContainerEl = document.createElement("div")
        const newsListEl = await createNewsList(newsState)
        const scrollObserverElement = createScrollObserver()            //옵저버 생성

        //카테고리가 변경되는 이벤트가 발생하면 addNewsData()를 실행해서 다시 
        //article.news-list를 생성해주고, addNewsData() 로 API로 가져온 데이터를 붙여서 반환한다.
        const handleClickItem = (newsState) => {
            //newsList.innerText = ""                               <--- 페이지 깜박임 조정.....??
            updateNewsList(newsListEl, newsState, true)
        }

        const categorySelectorEl = createCategorySelector(newsState, handleClickItem)  //카테고리 셀렉터 생성
        newsListContainerEl.className = "news-list-container"

        //카테고리 셀렉터, 뉴스리스트 생성
        $root.appendChild(categorySelectorEl)
        $root.appendChild(newsListEl)
        $root.appendChild(scrollObserverElement)

        //옵저버를 통해서 스크롤 내리면서 데이터 생성
        let observer = new IntersectionObserver(entries => {
            setTimeout(() => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    newsState.page += 1
                    console.log(newsState)
                    updateNewsList(newsListEl, newsState, false)
                });
            }, 200)
        });

        const scrollEl = document.querySelector(".scroll-observer")
        observer.observe(scrollEl);
    }

    const init = ($root) => {
        render($root)
    }

    init($root)
}
