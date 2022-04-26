//=================Подгрузка данных из JSON ==================

//Получение данных о животных
const url = '../../assets/pets.json'

const PETS = async function() {
    const res = await fetch(url);
    const data = await res.json();
    return data
}()


//перемешивание массива с данными о питомцах
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
}
// запись данных из JSON файла в карточки питомцев в секции Our Pets
function setData(data) {
    data.then(data => {
        let arr = [...data]
        let randomSortedArr = shuffle(arr)
        itemsActive.forEach((item) => {
            let randomItemFromArr = randomSortedArr[randomSortedArr.length - 1]
            let checkIndex = data.findIndex(elem => {
                return randomItemFromArr.name == elem.name
            })
            item.id = checkIndex;
            item.children[0].children[0].src = randomItemFromArr.img
            item.children[1].textContent = randomItemFromArr.name
            randomSortedArr.pop()
        })
    })
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

//============================Slider============================

//объявление переменных
const LEFT_HANDLER = document.querySelector('.slider-handle .prev')
const RIGHT_HANDLER = document.querySelector('.slider-handle .next')
const SLIDES_CONTAINER = document.querySelector('.slider-items__wrapper')
let slideActive = document.querySelector('#item-active')
let lastSlide;

let originalArray = [0, 1, 2, 3, 4, 5, 6, 7]
let currentCards = [] // текущие показанные карточки в Our Pets
let itemsActive = []   // количество элементов в слайдере

//функция при клике на левую стрелку
// Добавляет класс анимации и временно отключает обработчик событий по стрелкам
function moveToLeft() {
    SLIDES_CONTAINER.classList.add('transition-left')
    replace('slideLeft')
    LEFT_HANDLER.removeEventListener('click', moveToLeft)
    RIGHT_HANDLER.removeEventListener('click', moveToRight)
}
// функция при клике на правую стрелку
// Добавляет класс анимации и временно отключает обработчик событий по стрелкам
function moveToRight() {
    SLIDES_CONTAINER.classList.add('transition-right')
    replace('slideRight')
    LEFT_HANDLER.removeEventListener('click', moveToLeft)
    RIGHT_HANDLER.removeEventListener('click', moveToRight)
}

// навешивание обрабочтика событий на клик
LEFT_HANDLER.addEventListener('click', moveToLeft)
RIGHT_HANDLER.addEventListener('click', moveToRight)

// сверяемся с типом примененной анимации и меняем контет в 
// зависимости от направления
// 129-130 возвращаем обработчики событий после завершени анимации
SLIDES_CONTAINER.addEventListener('animationend', (e) => {
    console.log(e.animationName)
    if (e.animationName === 'move-left' || e.animationName === 'move-left-768' || e.animationName === 'move-left-580' || e.animationName === 'move-left-320') {
        SLIDES_CONTAINER.classList.remove('transition-left')
        slideActive.innerHTML = document.querySelector('#item-left').innerHTML
        document.querySelector('#item-left').remove()
    } else {
        SLIDES_CONTAINER.classList.remove('transition-right')
        slideActive.innerHTML = document.querySelector('#item-right').innerHTML
        document.querySelector('#item-right').remove()
    }
    LEFT_HANDLER.addEventListener('click', moveToLeft)
    RIGHT_HANDLER.addEventListener('click', moveToRight)
})


function replace(item, data = PETS) {
    data.then(data => {
        let previousActiveCads = [...currentCards]
        let countOfCards = itemsActive.length
        if (item == 'slideLeft') item = itemTemplate('slideLeft', countOfCards)
        else item = itemTemplate('slideRight', countOfCards)
        for (let i = 0; i < countOfCards; i++) {
            shuffle(originalArray)
            let randomItemFromArr = originalArray[originalArray.length - 1]
            item.children[i].children[0].children[0].src = data[randomItemFromArr].img
            item.children[i].children[1].textContent = data[randomItemFromArr].name
            currentCards[i] = originalArray.pop()
            let checkIndex = data.findIndex(elem => {
                return data[randomItemFromArr].name == elem.name
            })
            item.children[i].id = checkIndex;
        }
        if (item.id == 'item-left') {
            SLIDES_CONTAINER.prepend(item)
        } else {
            SLIDES_CONTAINER.append(item)
        }
        originalArray.push(...previousActiveCads)
    })
}

function itemTemplate(side, childrenCount) {
    const elem = document.createElement('div')
    elem.classList.add('slider-items__item')
    if (side == 'slideLeft') {
        elem.id = 'item-left'
    } else {
        elem.id = 'item-right'
    }
    for (let i = 0; i < childrenCount; i++) {
        let card = slideActive.firstElementChild.cloneNode(true)
        elem.appendChild(card)
    }
    elem.lastElementChild.style.display = 'flex'
    return elem
}

function determineActiveItems() {
    document.querySelectorAll('#item-active .slider-card').forEach(item => {
        let computedStyles = getComputedStyle(item)
        if (computedStyles.display != 'none') {
            itemsActive.push(item)
        }
    })
}

//================================== Popup ==============================

const POPUP = document.querySelector('#popup')
const POPUP_CONTAINER = document.querySelector('.popup-container')



slideActive.addEventListener('click', (e) => {
    if (e.target.closest('.slider-card')) {
        const clickedElementId = e.target.closest('.slider-card').id
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


//======================================================================
document.addEventListener('DOMContentLoaded', () => {
    setData(PETS)
    determineActiveItems()
    //убираем из исходного массива элементы, которые записались в слайдер
    setTimeout(() => {
        itemsActive.forEach(elem => {
            currentCards.push(+elem.getAttribute('id'))
        })
        let rest = originalArray.filter((item) => !currentCards.includes(item))
        originalArray = rest
    }, 1000)
})

