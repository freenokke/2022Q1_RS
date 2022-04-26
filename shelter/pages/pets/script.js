//==================Burger Menu==================================
const body = document.querySelector('body')
const burgerIcon = document.querySelector('.header-menu__icon')
const menu = document.querySelector('.header-menu.burger-menu')
const menuItems = document.querySelectorAll('.header-menu.burger-menu .header-menu__item')
const overlay = document.querySelector('.overlay')

burgerIcon.addEventListener('click', burgerMenuHandler)


menu.addEventListener('animationend', (e) => {
    if (e.animationName === 'slide-in') {
        let duplicate = document.querySelector(".header-title").cloneNode(true)
        duplicate.classList.add('duplicate-title')
        menu.prepend(duplicate)
    } else if (e.animationName === 'slide-out') {
        menu.classList.remove('not-active')
        document.querySelectorAll('.duplicate-title').forEach(item => {
            item.remove()
        })
        setTimeout(() => {
            burgerIcon.classList.remove('re-rotate')
        }, 1000)
    }
    
    burgerIcon.addEventListener('click', burgerMenuHandler)

})

overlay.addEventListener('click', () => {
    showHideMenu()
    rotateMenuIcon()
    overlay.style.display = 'none'
    body.classList.remove('body_lock')
})

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        showHideMenu()
        rotateMenuIcon()
        overlaySwitch()
        body.classList.remove('body_lock')
    })
})

function overlaySwitch() {
    let computedStyle = getComputedStyle(overlay);
    if (computedStyle.display == 'none') {
        overlay.style.display = 'block'
    } else {
        overlay.style.display = 'none'
    }
}

function showHideMenu() {
    if (menu.classList.contains('active')) {
        menu.classList.remove('active')
        menu.classList.add('not-active')
    } else {
        menu.classList.add('active')
        menu.classList.remove('not-active')
    }
}

function rotateMenuIcon() {
    if (burgerIcon.classList.contains('rotate')) {
        burgerIcon.classList.remove('rotate')
        burgerIcon.classList.add('re-rotate')
    } else {
        burgerIcon.classList.add('rotate')
        burgerIcon.classList.remove('re-rotate')
    }
}

function burgerMenuHandler() {
    showHideMenu()
    rotateMenuIcon()
    overlaySwitch()
    body.classList.toggle('body_lock')

    burgerIcon.removeEventListener('click', burgerMenuHandler)
}

//===================== Pagination ======================

//Получение данных о животных
const url = '../../assets/pets.json'

const PETS = async function() {
    const res = await fetch(url);
    const data = await res.json();
    return data
}()


const PETS_CONTAINER = document.querySelector('.friends-cards')
const NEXT_BTN = document.querySelector('.pagination-handle__handler.next')
const PREV_BTN = document.querySelector('.pagination-handle__handler.prev')
const FIRSTPAGE_BTN = document.querySelector('.pagination-handle__handler.start')
const LASTPAGE_BTN = document.querySelector('.pagination-handle__handler.end')
const PAGE = document.querySelector('.pagination-handle__handler.current')
let petsArray = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7,]
let filledgWithItemsArr;
let currentPage = 1
let countOfPages;
let viewArea = document.documentElement.clientWidth;


NEXT_BTN.addEventListener('click', nextPage)
PREV_BTN.addEventListener('click', previousPage)
FIRSTPAGE_BTN.addEventListener('click', firstPage)
LASTPAGE_BTN.addEventListener('click', lastPage)

document.addEventListener('DOMContentLoaded', () => {
    setData(PETS)
    viewArea = document.documentElement.clientWidth
    checkPages()
    PAGE.textContent = currentPage

    PREV_BTN.classList.add('pagination-handle__handler_inactive')
    FIRSTPAGE_BTN.classList.add('pagination-handle__handler_inactive')
    PREV_BTN.removeEventListener('click', previousPage)
    FIRSTPAGE_BTN.removeEventListener('click', firstPage)
})


//==================== Functions ==============================
// запись данных из JSON файла в карточки питомцев в секции Our Pets
function setData(data) {
    PETS_CONTAINER.innerHTML = '';
    data.then(data => {
            if (viewArea >= 1280) {
                let separatedArr = separate(8, 6)
                filledgWithItemsArr = separatedArr.map(item => {
                    shuffle(item)
                    return item.map(i => {
                        let card = createElem(data, i)
                        return card
                    })
                })
                PETS_CONTAINER.append(...filledgWithItemsArr[0])
            } else if (viewArea < 1280 && viewArea >= 768) {
                let separatedArr = separate(6, 8)
                console.log(separatedArr)
                filledgWithItemsArr = separatedArr.map(item => {
                    shuffle(item)
                    return item.map(i => {
                        let card = createElem(data, i)
                        return card
                    })
                })
                PETS_CONTAINER.append(...filledgWithItemsArr[0])
            } else if (viewArea < 768 && viewArea >= 320) {
                let separatedArr = separate(3, 16)
                filledgWithItemsArr = separatedArr.map(item => {
                    shuffle(item)
                    return item.map(i => {
                        let card = createElem(data, i)
                        return card
                    })
                })
                PETS_CONTAINER.append(...filledgWithItemsArr[0])
            }
    })
}


function createElem(data, i) {
    let elem = document.createElement('div')
    let nestedImageBlock = document.createElement('div')
    let image = new Image()
    let nestedTextBlock = document.createElement('div')
    let nestedButton = document.createElement('button')

    image.src = data[i].img
    image.alt = data[i].name
    
    nestedTextBlock.textContent = data[i].name
    
    nestedButton.type = 'button'
    nestedButton.textContent = 'Learn more'
    
    nestedImageBlock.append(image)
    
    elem.classList.add('friends-card')
    elem.id = i
    nestedImageBlock.classList.add('friends-card__image')
    nestedTextBlock.classList.add('friends-card__text')
    nestedButton.classList.add('friends-card__button')

    elem.append(nestedImageBlock, nestedTextBlock, nestedButton)

    return elem
}

//перемешивание массива с данными о питомцах
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
}

function separate(num, count) {
    const arr = [...petsArray]
    const separatedArray = []
    for (let i = 0; i < count; i++) {
        separatedArray.push(arr.splice(0, num))
    }
    return separatedArray
}

function checkPages() {
    if (viewArea >= 1280) countOfPages = 6
    if (viewArea < 1280 && viewArea >= 768) countOfPages = 8
    if (viewArea < 768 && viewArea >= 320) countOfPages = 16
}

function switchPageUp() {
    if (+PAGE.textContent < countOfPages) {
    +PAGE.textContent++
    currentPage = +PAGE.textContent
    }
    checkBtnInactive(currentPage)
}

function switchPageDown() {
    if (+PAGE.textContent <= countOfPages && +PAGE.textContent != 1) {
        +PAGE.textContent--
        currentPage = +PAGE.textContent
    }
    checkBtnInactive(currentPage)
}

function nextPage() {
    PETS_CONTAINER.innerHTML = ''
    switchPageUp()
    PETS_CONTAINER.append(...filledgWithItemsArr[currentPage - 1])
}

function previousPage() {
    PETS_CONTAINER.innerHTML = ''
    switchPageDown()
    PETS_CONTAINER.append(...filledgWithItemsArr[currentPage - 1])
}

function lastPage() {
    PETS_CONTAINER.innerHTML = ''
    PETS_CONTAINER.append(...filledgWithItemsArr[countOfPages - 1])
    currentPage = countOfPages
    PAGE.textContent = currentPage
    checkBtnInactive(currentPage)
}

function firstPage() {
    PETS_CONTAINER.innerHTML = ''
    PETS_CONTAINER.append(...filledgWithItemsArr[0])
    currentPage = 1
    PAGE.textContent = currentPage
    checkBtnInactive(currentPage)
}

function checkBtnInactive(page) {
    console.log(typeof page)
    if (page == 1) {
        PREV_BTN.classList.add('pagination-handle__handler_inactive')
        FIRSTPAGE_BTN.classList.add('pagination-handle__handler_inactive')
        PREV_BTN.removeEventListener('click', previousPage)
        FIRSTPAGE_BTN.removeEventListener('click', firstPage)

        NEXT_BTN.classList.remove('pagination-handle__handler_inactive')
        LASTPAGE_BTN.classList.remove('pagination-handle__handler_inactive')
        NEXT_BTN.addEventListener('click', nextPage)
        LASTPAGE_BTN.addEventListener('click', lastPage)
    } else if (page > 1 && page < countOfPages ) {
        PREV_BTN.classList.remove('pagination-handle__handler_inactive')
        FIRSTPAGE_BTN.classList.remove('pagination-handle__handler_inactive')
        PREV_BTN.addEventListener('click', previousPage)
        FIRSTPAGE_BTN.addEventListener('click', firstPage)

        NEXT_BTN.classList.remove('pagination-handle__handler_inactive')
        LASTPAGE_BTN.classList.remove('pagination-handle__handler_inactive')
        NEXT_BTN.addEventListener('click', nextPage)
        LASTPAGE_BTN.addEventListener('click', lastPage)
    } else if (page == countOfPages) {
        NEXT_BTN.classList.add('pagination-handle__handler_inactive')
        LASTPAGE_BTN.classList.add('pagination-handle__handler_inactive')
        NEXT_BTN.removeEventListener('click', nextPage)
        LASTPAGE_BTN.removeEventListener('click', lastPage)

        PREV_BTN.classList.remove('pagination-handle__handler_inactive')
        FIRSTPAGE_BTN.classList.remove('pagination-handle__handler_inactive')
        PREV_BTN.addEventListener('click', previousPage)
        FIRSTPAGE_BTN.addEventListener('click', firstPage)
    }
}




//================================== Popup ==============================

const POPUP = document.querySelector('#popup')
const POPUP_CONTAINER = document.querySelector('.popup-container')
const PET_СARDS = document.querySelectorAll('.friends-card')



PETS_CONTAINER.addEventListener('click', (e) => {
    if (e.target.closest('.friends-card')) {
        const clickedElementId = e.target.closest('.friends-card').id
        removeScrollShifting()
        popupOpen(clickedElementId)
        body.classList.add('body_lock')
    }
});

function popupClose() {
    POPUP.classList.remove('active')
    comeBackScrollShifting()
    body.classList.remove('body_lock')
}

function popupOpen(id) {
    POPUP_CONTAINER.innerHTML = ''
    POPUP_CONTAINER.append(createPopup(id))
    POPUP.classList.add('active')
    
    const POPUP_CLOSE = document.querySelector('.popup-close')
    POPUP_CLOSE.addEventListener('click', popupClose)

    const POPUP_CONTENT = document.querySelector('.popup-content')
    POPUP.addEventListener('mouseover', (e) => {
        if (!e.target.closest('.popup-content')) {
            POPUP_CONTENT.querySelector('.popup-close').style.backgroundColor = '#FDDCC4'
        } else {
            POPUP_CONTENT.querySelector('.popup-close').style.backgroundColor = ''
        }
    })

    POPUP_CONTAINER.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            popupClose()
        }
    })
}

function createPopup(id, data = PETS) {
    console.log(id)
    const card = document.createElement('div')
    const petImage = new Image()
    const petDescriptionBlock = document.createElement('div')
    const petNickName = document.createElement('h3')
    const petBreed = document.createElement('h4')
    const petText = document.createElement('p')
    const petFeaturesList = document.createElement('ul')
    const petAge = document.createElement('li')
    const petInoculations = document.createElement('li')
    const petDiseases = document.createElement('li')
    const petParasites = document.createElement('li')
    const popupClose = document.createElement('div')


    petNickName.classList.add('header3') 
    petBreed.classList.add('header4') 
    petText.classList.add('text')
    card.classList.add('popup-content')
    petImage.classList.add('popup-content__image')
    petDescriptionBlock.classList.add('popup-content__description', 'description-content')
    petNickName.classList.add('description-content__nickname')
    petBreed.classList.add('description-content__breed')
    petText.classList.add('description-content__text')
    petFeaturesList.classList.add('description-content__features')
    popupClose.classList.add('popup-close')

    data.then(data => {
        petImage.src = data[id].img
        petNickName.textContent = data[id].name
        petBreed.textContent = `${data[id].type} - ${data[id].breed}`
        petText.textContent = data[id].description
        petAge.innerHTML = `<span class="bold">Age: <span> ${data[id].age}`
        petInoculations.innerHTML = `<span class="bold">Inoculations: <span> ${data[id].inoculations}`
        petDiseases.innerHTML = `<span class="bold">Diseases: <span> ${data[id].diseases}`
        petParasites.innerHTML = `<span class="bold">Parasites: <span> ${data[id].parasites}`
    })

    petFeaturesList.append(petAge, petInoculations, petDiseases, petParasites)
    petDescriptionBlock.append(petNickName, petBreed, petText, petFeaturesList)
    card.append(petImage, petDescriptionBlock, popupClose)

    return card
}

//убирает смещение контента при исчезновении полосы скроллбара
function removeScrollShifting() {
    scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    console.log(scrollBarWidth)
    console.log(window.innerWidth)
    console.log(document.documentElement.clientWidth)
    body.style.marginLeft = `-${scrollBarWidth}px`
}

function comeBackScrollShifting() {
    document.body.style.marginLeft = ''
}