const body = document.querySelector('body')
const burgerIcon = document.querySelector('.header-menu__icon')
const menu = document.querySelector('.header-menu')
const menuItems = document.querySelectorAll('.header-menu__item')
const overlay = document.querySelector('.overlay')

function overlaySwitch() {
    let computedStyle = getComputedStyle(overlay);
    if (computedStyle.display == 'none') {
        overlay.style.display = 'block'
    } else {
        overlay.style.display = 'none'
    }
}
//
burgerIcon.addEventListener('click', function() {
    menu.classList.toggle('header-menu_active')
    overlaySwitch()
    body.classList.toggle('body_lock')
})

overlay.addEventListener('click', () => {
    menu.classList.remove('header-menu_active')
    overlay.style.display = 'none'
    body.classList.remove('body_lock')
})

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.remove('header-menu_active')
        overlaySwitch()
        body.classList.remove('body_lock')
    })
})



