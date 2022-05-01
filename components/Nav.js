const CATEGORYS = [
    {
        NAME: 'all',
        TEXT: '전체보기',
    },
    {
        NAME: 'business',
        TEXT: '비즈니스',
    },
    {
        NAME: 'entertainment',
        TEXT: '엔터테인먼트',
    },
    {
        NAME: 'health',
        TEXT: '건강',
    },
    {
        NAME: 'science',
        TEXT: '과학',
    },
    {
        NAME: 'sports',
        TEXT: '스포츠',
    },
    {
        NAME: 'technology',
        TEXT: '기술',
    },
]

export default function createCategorySelector(newsState, onClickItem) {
    const nav = document.createElement("nav")
    const ul = document.createElement("ul")

    nav.className = "category-list"
    nav.appendChild(ul)

    CATEGORYS.forEach((category) => {
        const li = document.createElement("li")
        li.id = category.NAME
        li.className = "category-item"
        li.innerText = category.TEXT
        ul.appendChild(li)

        //카테고리 셀렉터에 클릭 이벤트 등록
        li.addEventListener("click", () => {
            //클릭 이벤트 발생 시 현재상태 변경
            newsState.category = category.NAME
            newsState.page = 0
            console.log(newsState)
            onClickItem(newsState)
            //클릭 이벤트 발생시 다시 렌더링 이벤트 추가해줘야함
        })
    })

    nav.appendChild(ul)
    return nav
}