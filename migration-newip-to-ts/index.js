(()=>{"use strict";var n={669:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,".news {\n    columns: 1;\n    margin-top: 50px;\n}\n\n/* .news__description-content {\n    display: none;\n}\n\n.news__description-source {\n    display: none;\n} */\n\n.news__item {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    margin: 1rem auto;\n    margin-bottom: 1.6%;\n    background: #fff;\n    color: #333;\n    line-height: 1.4;\n    font-family: Arial, sans-serif;\n    border-radius: 5px;\n    overflow: hidden;\n    cursor: pointer;\n}\n\n.news__item:hover .news__meta-photo {\n    transform: scale(1.3) rotate(3deg);\n}\n\n.news__item .news__meta {\n    position: relative;\n    height: auto\n}\n\n.news__item .news__meta-photo {\n    transition: transform 0.2s;\n}\n\n.news__item .news__meta-photo img {\n    width: 100%;\n}\n\n.news__item .news__meta-details,\n.news__item .news__meta-details ul {\n    margin: auto;\n    padding: 0;\n    list-style: none;\n}\n\n.news__item .news__meta-details {\n    position: absolute;\n    top: 0;\n    height: 130%;\n    margin: auto;\n    left: -100%;\n    transition: left 0.2s;\n    background: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    width: 100%;\n    font-size: 0.9rem;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n.news__item .news__description {\n    padding: 1rem;\n    background: #fff;\n    position: relative;\n    z-index: 1;\n}\n\n.news__item .news__description h2 {\n    line-height: 1;\n    margin: 0;\n    font-size: 1rem;\n}\n\n.news__item .news__description h3 {\n    font-size: 1rem;\n    font-weight: 300;\n    text-transform: uppercase;\n    color: #a2a2a2;\n    margin-top: 5px;\n}\n\n.news__item .news__description .news__read-more {\n    text-align: right;\n}\n\n.news__item .news__description .news__read-more a {\n    color: #5ad67d;\n    display: inline-block;\n    position: relative;\n    text-decoration: none;\n    font-weight: 800;\n}\n\n.news__item .news__description .news__read-more a:after {\n    content: '→';\n    margin-left: -10px;\n    opacity: 0;\n    vertical-align: middle;\n    transition: margin 0.3s, opacity 0.3s;\n}\n\n.news__item .news__description .news__read-more a:hover:after {\n    margin-left: 5px;\n    opacity: 1;\n}\n\n.news__item p {\n    margin: 1rem 0 0;\n}\n\n.news__item p:first-of-type {\n    margin-top: 1.25rem;\n    position: relative;\n}\n\n.news__item p:first-of-type:before {\n    content: '';\n    position: absolute;\n    height: 5px;\n    background: #5ad67d;\n    width: 35px;\n    top: -0.75rem;\n    border-radius: 3px;\n}\n\n.news__item:hover .news__meta-details {\n    left: 0%;\n}\n\n@media (min-width: 530px) {\n    .news {\n        columns: 2;\n    }\n}\n\n@media (min-width: 768px) {\n    .news__item {\n        flex-direction: column;\n        max-width: 700px;\n    }\n\n    .news__item .news__meta {\n        height: auto;\n    }\n\n    .news__item.alt .news__meta-details {\n        padding-left: 25px;\n    }\n\n    .news__description-content {\n        display: block\n    }\n\n    .news__description-source {\n        display: block;\n    }\n\n    .news__item .news__description h2 {\n        font-size: 1.7rem;\n    }\n\n    .news {\n        columns: 3;\n    }\n}\n\n",""]);const i=o},501:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,".sources {\n    display: flex;\n    flex-wrap: wrap;\n    width: 100%;\n    max-height: 300px;\n    overflow: auto;\n    align-items: center;\n    font: 300 1em 'Fira Sans', sans-serif;\n    justify-content: center;\n    align-content: flex-start;\n}\n\n.sources::-webkit-scrollbar-thumb {\n    border-radius: 100px;\n    border: 6px solid rgba(0, 0, 0, 0.18);\n    border-left: 0;\n    border-right: 0;\n    background-color: #30c4ffa6;\n}\n\n.sources::-webkit-scrollbar {\n    width: 7px;\n}\n\n\n.sources::-webkit-scrollbar-track {\n    background-color: #e4e4e457;\n    border-radius: 100px;\n}\n\n.source__item {\n    background: none;\n    border: 2px solid #30c5ff;\n    font: inherit;\n    line-height: 1;\n    margin: 0.5em;\n    padding: 5px;\n    color: #70d6ff;\n    transition: 0.25s;\n    cursor: pointer;\n}\n\n.source__item:hover,\n.source__item:focus {\n    border-color: #3fcc59;\n    color: #69db7e;\n    box-shadow: 0 0.5em 0.5em -0.4em #3fcc59;\n    transform: translateY(-0.25em);\n}\n\n.source__item-name {\n    font-weight: 400;\n    white-space: nowrap;\n}\n\n@media  (min-width: 530px ) {\n    .source__item {\n        padding: 0.5em;\n    }\n}\n\n@media  (min-width: 768px ) {\n    .source__item {\n        padding: 1em 2em;\n\n    }\n}\n",""]);const i=o},767:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,"* {\n    box-sizing: border-box;\n}\n\nbody {\n    color: #fff;\n    background: #17181c;\n    font-family: sans-serif;\n}\n\nheader {\n    padding: 10px 30px;\n}\n\nheader h1 {\n    font-size: 40px;\n    font-weight: 800;\n}\n\nfooter {\n    height: 100px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\nfooter .copyright {\n    font-size: 14px;\n    color: #333;\n    text-align: center;\n}\nfooter .copyright a {\n    color: #444;\n}\nfooter .copyright a:hover {\n    color: #555;\n}\nfooter .copyright:before {\n    content: '©';\n}\n\n.footer__content {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 30px;\n    width: 100%;\n    max-width: 700px;\n}\n\n.footer__content span{\n    color: white;\n    font-weight: bold;\n}\n\n.logo {\n    width: 100px;\n}\n\n.logo_link {\n    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(289deg) brightness(103%) contrast(102%);\n    animation: pulsing1 2s infinite;\n}\n\n.social-link__img {\n    animation: pulsing1 2s infinite;\n}\n\n.social-link__img {\n    width: 35px;\n    height: 35px;\n}\n\n#lang {\n    margin-left: 20px;\n    outline: none;\n    width: 150px;\n    height: 25px;\n}\n\n\n.filter {\n    display: flex;\n    flex-direction: column;\n    margin-bottom: 20px;\n    cursor: pointer;\n}\n\n.categories-item {\n    cursor: pointer;\n    margin-bottom: 10px;\n    font-family: Arial, sans-serif;\n    letter-spacing: 2px;\n    padding: 3px;\n    width: fit-content;\n    border-radius: 10px;\n    transition: all 0.2s;\n}\n\n.categories-item:hover {\n    background-color: #30c4ffcb;\n}\n\n@media (min-width: 475px) {\n    .filter {\n        flex-direction: row;\n    }\n}\n\n@keyframes pulsing1 {\n    0% {\n        transform: translateY(10%);\n    }\n    50% {\n        transform: translateY(0%);\n    }\n    100% {\n        transform: translateY(10%);\n    }\n}\n@keyframes pulsing2 {\n    0% {\n        width: 40%;\n    }\n    50% {\n        \n        width: 0;\n    }\n    100% {\n        width: 40%;\n    }\n}",""]);const i=o},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=n(e);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t,r){"string"==typeof n&&(n=[[null,n,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(o[s]=!0)}for(var a=0;a<n.length;a++){var c=[].concat(n[a]);r&&o[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),e.push(c))}},e}},379:(n,e,t)=>{var r,o=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),i=[];function s(n){for(var e=-1,t=0;t<i.length;t++)if(i[t].identifier===n){e=t;break}return e}function a(n,e){for(var t={},r=[],o=0;o<n.length;o++){var a=n[o],c=e.base?a[0]+e.base:a[0],l=t[c]||0,d="".concat(c," ").concat(l);t[c]=l+1;var u=s(d),p={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(i[u].references++,i[u].updater(p)):i.push({identifier:d,updater:h(p,e),references:1}),r.push(d)}return r}function c(n){var e=document.createElement("style"),r=n.attributes||{};if(void 0===r.nonce){var i=t.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(n){e.setAttribute(n,r[n])})),"function"==typeof n.insert)n.insert(e);else{var s=o(n.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(e)}return e}var l,d=(l=[],function(n,e){return l[n]=e,l.filter(Boolean).join("\n")});function u(n,e,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(n.styleSheet)n.styleSheet.cssText=d(e,o);else{var i=document.createTextNode(o),s=n.childNodes;s[e]&&n.removeChild(s[e]),s.length?n.insertBefore(i,s[e]):n.appendChild(i)}}function p(n,e,t){var r=t.css,o=t.media,i=t.sourceMap;if(o?n.setAttribute("media",o):n.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}var m=null,f=0;function h(n,e){var t,r,o;if(e.singleton){var i=f++;t=m||(m=c(e)),r=u.bind(null,t,i,!1),o=u.bind(null,t,i,!0)}else t=c(e),r=p.bind(null,t,e),o=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else o()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var t=a(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var r=0;r<t.length;r++){var o=s(t[r]);i[o].references--}for(var c=a(n,e),l=0;l<t.length;l++){var d=s(t[l]);0===i[d].references&&(i[d].updater(),i.splice(d,1))}t=c}}}}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,exports:{}};return n[r](i,i.exports,t),i.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;!function(n){n[n.unauthorized=401]="unauthorized",n[n.notFound=404]="notFound"}(n||(n={}));var e=t(379),r=t.n(e),o=t(669);r()(o.Z,{insert:"head",singleton:!1}),o.Z.locals;var i=t(501);r()(i.Z,{insert:"head",singleton:!1}),i.Z.locals;class s{constructor(){this.news=new class{draw(n){const e=n.length>=12?n.filter(((n,e)=>e<12)):n,t=document.createDocumentFragment(),r=document.querySelector("#newsItemTemp");if(e.forEach(((n,e)=>{const o=r.content.cloneNode(!0),i=new Image;if(i.src=n.urlToImage||"img/news_placeholder.png",e%2&&o.querySelector(".news__item").classList.add("alt"),o.querySelector(".news__meta-photo").append(i),o.querySelector(".news__meta-author").textContent=n.author||n.source.name,o.querySelector(".news__meta-date").textContent=n.publishedAt.slice(0,10).split("-").reverse().join("-"),null===o.querySelector(".news__description-title"))throw new Error('Element with class ".news__description-title" not found');if(o.querySelector(".news__description-title").textContent=n.title,null===o.querySelector(".news__description-source"))throw new Error('Element with class ".news__description-source" not found');if(o.querySelector(".news__description-source").textContent=n.source.name,!o.querySelector(".news__description-content"))throw new Error('Element with class ".news__description-content" not found');if(o.querySelector(".news__description-content").textContent=n.description,null===o.querySelector(".news__read-more a"))throw new Error('Element with class ".news__read-more a" not found');o.querySelector(".news__read-more a").setAttribute("href",n.url),t.append(o)})),null===document.querySelector(".news"))throw new Error('Element with class ".news" not found');this.clear(),document.querySelector(".news").appendChild(t)}clear(){document.querySelector(".news").innerHTML=""}},this.sources=new class{draw(n){const e=document.createDocumentFragment(),t=document.querySelector("#sourceItemTemp");if(null===t)throw new Error('Element with id "#sourceItemTemp" not found');if(n.forEach((n=>{const r=t.content.cloneNode(!0);r.querySelector(".source__item-name").textContent=n.name,r.querySelector(".source__item").setAttribute("data-source-id",n.id),e.append(r)})),null===document.querySelector(".sources"))throw new Error('Element with class ".sources" not found');this.clear(),document.querySelector(".sources").append(e)}clear(){document.querySelector(".sources").innerHTML=""}}}drawNews(n){const e=(null==n?void 0:n.articles)?null==n?void 0:n.articles:[];this.news.draw(e)}drawSources(n){const e=(null==n?void 0:n.sources)?null==n?void 0:n.sources:[];this.sources.draw(e)}clearNews(){this.news.clear()}clearSources(){this.sources.clear()}}var a;!function(n){n.ar="Argentina",n.au="Australia",n.at="Austria",n.be="Belgium",n.br="Brazil",n.bg="Bulgaria",n.ca="Canada",n.cn="China",n.co="Colombia",n.cu="Cuba",n.cz="Czech Republic",n.eg="Egypt",n.fr="France",n.de="Germany",n.gr="Greece",n.hk="Hong Kong",n.hu="Hungary",n.in="India",n.id="Indonesia",n.ie="Ireland",n.il="Israel",n.it="Italy",n.jp="Japan",n.lv="Latvia",n.lt="Lithuania",n.my="Malaysia",n.mx="Mexico",n.ma="Morocco",n.nl="Netherlands",n.nz="New Zealand",n.ng="Nigeria",n.no="Norway",n.ph="Philippines",n.pl="Poland",n.pt="Portugal",n.ro="Romania",n.ru="Russia",n.sa="Saudi Arabia",n.rs="Serbia",n.sg="Singapore",n.sk="Slovakia",n.si="Slovenia",n.za="South Africa",n.kr="South Korea",n.se="Sweden",n.ch="Switzerland",n.tw="Taiwan",n.th="Thailand",n.tr="Turkey",n.ae="UAE",n.ua="Ukraine",n.gb="United Kingdom",n.us="United States",n.ve="Venuzuela"}(a||(a={}));var c=t(767);r()(c.Z,{insert:"head",singleton:!1}),c.Z.locals,(new class{constructor(){this.country="us",this.controller=new class extends class extends class{constructor(n,e){this.baseLink=n,this.options=e}getResp({endpoint:n,options:e={}},t=(()=>{console.error("No callback for GET response")})){this.load("GET",n,t,e)}errorHandler(e){if(!e.ok)throw e.status!==n.unauthorized&&e.status!==n.notFound||console.log(`Sorry, but there is ${e.status} error: ${e.statusText}`),Error(e.statusText);return e}makeUrl(n,e){const t=Object.assign(Object.assign({},this.options),n);let r=`${this.baseLink}${e}?`;return Object.keys(t).forEach((n=>{r+=`${n}=${t[n]}&`})),r.slice(0,-1)}load(n,e,t,r={}){fetch(this.makeUrl(r,e),{method:n}).then(this.errorHandler).then((n=>n.json())).then((n=>t(n))).catch((n=>console.error(n)))}}{constructor(){super("https://newsapi.org/v2/",{apiKey:"230d48c5013d4c00bef47cc7a53124e2"})}}{getSources(n,e,t){const r=n.target.textContent;n.target.style.backgroundColor="#30c4ffcb",super.getResp({endpoint:"sources",options:{category:r,country:e}},t)}getNews(n,e){let t=n.target;const r=n.currentTarget;for(;t!==r;){if(t.classList.contains("source__item")){const n=t.getAttribute("data-source-id");return void(r.getAttribute("data-source")!==n&&(r.setAttribute("data-source",n),super.getResp({endpoint:"everything",options:{sources:n}},e)))}t=t.parentNode}}},this.view=new s}start(){this.addCountrySelect(),this.addEvents()}addEvents(){const n=document.querySelector(".sources"),e=document.querySelectorAll(".categories-item"),t=document.querySelectorAll(".lang-option"),r=document.querySelector("#lang");if(null===n)throw new Error('Element with class ".sources" is not found');if(n.addEventListener("click",(n=>this.controller.getNews(n,(n=>this.view.drawNews(n))))),!(e.length>0))throw new Error("Categories list is not found");if(e.forEach((n=>{n.addEventListener("click",(n=>{e.forEach((n=>n.style.backgroundColor="transparent")),this.controller.getSources(n,this.country,(n=>this.view.drawSources(n)))}))})),!(null!==r&&t.length>0))throw new Error("Languages list is not found");r.addEventListener("change",(()=>{this.country=r.value,this.view.clearNews(),this.view.clearSources()}))}addCountrySelect(){const n=document.querySelector("#lang");if(null===n)throw new Error('Element with id "#lang" is not found');{const e=Object.keys(a),t=Object.values(a);for(let r=0;r<e.length;r++){const o=document.createElement("option");o.className="lang-option",o.textContent=t[r],o.value=e[r],"us"===o.value&&o.setAttribute("selected",""),n.append(o)}}}}).start()})()})();