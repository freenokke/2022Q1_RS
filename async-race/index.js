(()=>{"use strict";var e={984:(e,t,n)=>{e.exports=n.p+"assets/images/sprite-car.svg"}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{const e=class{constructor(e,t="div",n="",i=""){const s=document.createElement(t);s.className=n,s.textContent=i,e&&e.append(s),this.node=s}destroy(){this.node.remove()}clear(){this.node.innerHTML=""}};var t,i;!function(e){e.BASE="http://127.0.0.1:3000"}(t||(t={})),function(e){e.GARAGE="garage",e.WINNERS="winners",e.ENGINE="engine"}(i||(i={}));const s=["Durango","Ram","Challenger","Charger","Grand Caravan","X7","X5","X3","X6 M","X6","X1","X4","C3 Aircross","C5 Aircross","Duster","CR-V","Corolla","C4 Cactus","DS3 Crossback","C1","C3","Berlingo Multispace","DS4 Crossback","UX 250h","NX 300h","LC 500","RX 350/200t","Rapid","Largus","IS 200t","LS 500h","RX","ES 200/250/350","Hatchback","CX-5","Sedan","CX-30","CX-9","CX-3","MX-5 Roadster","Phantom","Camry","Polo","Cullinan","Ghost","Dawn","Duster","Arkana","Sandero","Logan","Trafic Fourgon","Logan MCV","Captur","Kadjar","RAV4","Rio","Creta","Solaris"],r=["Acura","Alfa Romeo","Alpine","Apollo","Apple","Aston Martin","Audi","Automobili Pininfarina","Bentley","BMW","Bollinger","Brilliance","Bugatti","Buick","BYD","Cadillac","Chana","Chery","Chevrolet","Chrysler","Citroen","Continental","CUPRA","Dacia","Daewoo","Daihatsu","Datsun","Detroit Electric","Dodge","DS Automobiles","FAW","Ferrari","Fiat","Fisker","Ford","Foxtron","Geely","Genesis","GMC","Great Wall","Haval","Honda","Hummer","Hyundai","Ineos","Infiniti","Iran Khodro","JAC","Jaguar","Jeep","JETOUR","KIA","Koenigsegg","Lada","Lamborghini","Lancia","Land Rover","Lexus","Lifan","Lincoln","Lordstown","Lotus","Lucid","LvChi","Lynk & Co","Maserati","Maybach","Mazda","MCLaren","Mercedes-Benz","MG","MINI","Mitsubishi","Nikola","NIO","Nissan","Opel","Pagani","Peugeot","Polestar","Porsche","Qoros","Range Rover","Ravon","Renault","Rimac","Rivian","Rolls-Royce","Saab","Saipa","SEAT","Skoda","smart","SsangYong","SSC North America","Stellantis","Subaru","Suzuki","Tata","Tesla","Torsus","Toyota","VinFast","Volkswagen","Volvo","Xpeng","Zotye"];var o=function(e,t,n,i){return new(n||(n=Promise))((function(s,r){function o(e){try{d(i.next(e))}catch(e){r(e)}}function a(e){try{d(i.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}d((i=i.apply(e,t||[])).next())}))};const a=class{constructor(){this.domain=t.BASE,this.limitCarsOnPage=7,this.limitWinnersOnPage=10}getCars(e){return o(this,void 0,void 0,(function*(){let t;e?(t=yield fetch(`${this.domain}/${i.GARAGE}/?_limit=${this.limitCarsOnPage}/&_page=${e}`),sessionStorage.setItem("currentGamePage",e.toString())):t=yield fetch(`${this.domain}/${i.GARAGE}/?_limit=${this.limitCarsOnPage}`);const n=t.headers.get("X-Total-Count");sessionStorage.setItem("totalCarsCount",n);const s=yield t.json();return this.carsInGarage=s,this.carsInGarage}))}getCar(e){return o(this,void 0,void 0,(function*(){const t=yield fetch(`${this.domain}/${i.GARAGE}/${e}`);return yield t.json()}))}deleteCar(e){return o(this,void 0,void 0,(function*(){yield fetch(`${this.domain}/${i.GARAGE}/${e}`,{method:"DELETE"})}))}createCar(e){return o(this,void 0,void 0,(function*(){yield fetch(`${this.domain}/${i.GARAGE}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});const t=sessionStorage.getItem("currentGamePage");return this.getCars(Number(t))}))}createPlentyOfCars(e){return o(this,void 0,void 0,(function*(){const t=[];let n=0;for(;n<e;){const e=Math.floor(16777215*Math.random()).toString(16),o={name:`${r[Math.floor(Math.random()*r.length)]} ${s[Math.floor(Math.random()*s.length)]}`,color:`#${e}`},a=fetch(`${this.domain}/${i.GARAGE}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});t.push(a),n+=1}yield Promise.all(t);const o=sessionStorage.getItem("currentGamePage");return yield this.getCars(Number(o))}))}updateCar(e,t){return o(this,void 0,void 0,(function*(){yield fetch(`${this.domain}/${i.GARAGE}/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});const n=sessionStorage.getItem("currentGamePage");return this.getCars(Number(n))}))}startStopEngine(e,t){return o(this,void 0,void 0,(function*(){const n=yield fetch(`${this.domain}/${i.ENGINE}?id=${e}&status=${t}`,{method:"PATCH"});return yield n.json()}))}driveMode(e,t,n="drive"){return o(this,void 0,void 0,(function*(){return yield fetch(`${this.domain}/${i.ENGINE}?id=${e}&status=${n}`,{method:"PATCH",signal:t})}))}createWinner(e){return o(this,void 0,void 0,(function*(){yield fetch(`${this.domain}/${i.WINNERS}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}))}getWinners(e,t,n){return o(this,void 0,void 0,(function*(){let s;!e||t||n?s=t&&n?yield fetch(`${this.domain}/${i.WINNERS}/?_limit=${this.limitWinnersOnPage}/&_page=${e}&_sort=${t}&_order=${n}`):yield fetch(`${this.domain}/${i.WINNERS}/?_limit=${this.limitWinnersOnPage}`):(s=yield fetch(`${this.domain}/${i.WINNERS}/?_limit=${this.limitWinnersOnPage}/&_page=${e}`),sessionStorage.setItem("currentWinnerPage",e.toString()));const r=s.headers.get("X-Total-Count");return sessionStorage.setItem("totalWinnersCount",r),yield s.json()}))}getWinner(e){return o(this,void 0,void 0,(function*(){return yield fetch(`${this.domain}/${i.WINNERS}/${e}`,{method:"GET"})}))}updateWinner(e,t){return o(this,void 0,void 0,(function*(){return(yield fetch(`${this.domain}/${i.WINNERS}/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json()}))}deleteWinner(e){return o(this,void 0,void 0,(function*(){yield fetch(`${this.domain}/${i.WINNERS}/${e}`,{method:"DELETE"})}))}};var d=function(e,t,n,i){return new(n||(n=Promise))((function(s,r){function o(e){try{d(i.next(e))}catch(e){r(e)}}function a(e){try{d(i.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}d((i=i.apply(e,t||[])).next())}))};var l=function(e,t,n,i){return new(n||(n=Promise))((function(s,r){function o(e){try{d(i.next(e))}catch(e){r(e)}}function a(e){try{d(i.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}d((i=i.apply(e,t||[])).next())}))};const c=class extends e{constructor(e,t,n,i,s){super(e,t,n,i),this.controller=s,this.render()}render(){this.carCreationField(),this.carUpdatingFiled(),this.handleButtons()}carUpdatingFiled(){const t=new e(this.node,"div","createField flex items-center gap-2 mt-2");this.updateNameInput=new e(t.node,"input","textInput p-1 rounded"),this.updateNameInput.node.type="text",this.updateNameInput.node.id="updateTextInput",this.updateColorInput=new e(t.node,"input","colorInpit rounded"),this.updateColorInput.node.type="color",this.updateColorInput.node.id="updateColorInput",this.updateButton=new e(t.node,"button","btn btn-orange","UPDATE"),this.updatingFieldListeners()}carCreationField(){const t=new e(this.node,"div","createField flex items-center gap-2 mt-2");this.createNameInput=new e(t.node,"input","textInput p-1 rounded"),this.createNameInput.node.type="text",this.createNameInput.node.placeholder=" Some new car",this.createColorInput=new e(t.node,"input","colorInput rounded"),this.createColorInput.node.type="color",this.createButton=new e(t.node,"button","btn btn-orange","CREATE"),this.creationFieldListeners()}handleButtons(){const t=new e(this.node,"div","handleField flex items-center gap-2 mt-2");this.raceButton=new e(t.node,"button","raceButton btn btn-red","RACE"),this.resetButton=new e(t.node,"button","raceButton btn btn-pressed pointer-events-none","RESET"),this.generateCarsButton=new e(t.node,"button","generateButtone btn btn-red","GENERATE CARS"),this.raceButtonListener(),this.generateCarButtonListener(),this.resetButtonListener()}creationFieldListeners(){this.createButton.node.onclick=()=>l(this,void 0,void 0,(function*(){const e=yield this.controller.createCar({name:this.createNameInput.node.value.trim()?this.createNameInput.node.value.trim():"Some new car",color:this.createColorInput.node.value});this.GARAGE.render(e),this.createNameInput.node.value=""}))}updatingFieldListeners(){this.updateButton.node.onclick=()=>l(this,void 0,void 0,(function*(){const e=yield this.controller.updateCar(Number(this.updateNameInput.node.dataset.id),{name:this.updateNameInput.node.value.trim()?this.updateNameInput.node.value.trim():"Some new car",color:this.updateColorInput.node.value});this.GARAGE.render(e),this.updateNameInput.node.value="",this.updateColorInput.node.value="#000000"}))}raceButtonListener(){this.raceButton.node.onclick=()=>l(this,void 0,void 0,(function*(){this.disableViewButtons(!0),this.disableRaceButton(!0),this.disableGenerateButton(!0),this.disableCreateAndUpdateButtons(!0),this.disableResetButton(!1),this.GARAGE.disablePaginationButtons(!0),this.GARAGE.displayedCar.forEach((e=>{e.disableStartEngineButton(!0),e.disableStopEngineButton(!0),e.disableSelectAndRemoveButtons(!0)}));const e=(yield Promise.allSettled(this.GARAGE.displayedCar.map((e=>this.controller.startStopEngine(e.id,"started"))))).map((e=>{let t;return"fulfilled"===e.status&&(t=e.value),t}));this.disableViewButtons(!1),yield Promise.allSettled(this.GARAGE.displayedCar.map(((t,n)=>t.preparingForDrive(e[n],!0))))}))}resetButtonListener(){this.resetButton.node.onclick=()=>l(this,void 0,void 0,(function*(){this.disableResetButton(!0),yield Promise.allSettled(this.GARAGE.displayedCar.map((e=>this.controller.startStopEngine(e.id,"stopped")))),this.GARAGE.displayedCar.forEach((e=>{e.preventDriving(),e.disableStartEngineButton(!1),e.disableStopEngineButton(!0),e.disableSelectAndRemoveButtons(!1)})),setTimeout((()=>this.disableRaceButton(!1)),1e3),this.disableGenerateButton(!1),this.disableCreateAndUpdateButtons(!1),this.GARAGE.disablePaginationButtons(!1)}))}generateCarButtonListener(){this.generateCarsButton.node.onclick=()=>l(this,void 0,void 0,(function*(){const e=yield this.controller.createPlentyOfCars(100);this.GARAGE.render(e)}))}disableRaceButton(e){e?(this.raceButton.node.classList.add("pointer-events-none","btn-pressed"),this.raceButton.node.classList.remove("btn-red")):(this.raceButton.node.classList.remove("pointer-events-none","btn-pressed"),this.raceButton.node.classList.add("btn-red"))}disableGenerateButton(e){e?(this.generateCarsButton.node.classList.add("pointer-events-none","btn-pressed"),this.generateCarsButton.node.classList.remove("btn-red")):(this.generateCarsButton.node.classList.remove("pointer-events-none","btn-pressed"),this.generateCarsButton.node.classList.add("btn-red"))}disableResetButton(e){e?(this.resetButton.node.classList.add("pointer-events-none","btn-pressed"),this.resetButton.node.classList.remove("btn-red")):(this.resetButton.node.classList.remove("pointer-events-none","btn-pressed"),this.resetButton.node.classList.add("btn-red"))}disableCreateAndUpdateButtons(e){e?(this.createButton.node.classList.add("pointer-events-none","btn-pressed"),this.updateButton.node.classList.add("pointer-events-none","btn-pressed"),this.createButton.node.classList.remove("btn-orange"),this.updateButton.node.classList.remove("btn-orange")):(this.updateButton.node.classList.remove("pointer-events-none","btn-pressed"),this.createButton.node.classList.remove("pointer-events-none","btn-pressed"),this.updateButton.node.classList.add("btn-orange"),this.createButton.node.classList.add("btn-orange"))}};n(984);var h=function(e,t,n,i){return new(n||(n=Promise))((function(s,r){function o(e){try{d(i.next(e))}catch(e){r(e)}}function a(e){try{d(i.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}d((i=i.apply(e,t||[])).next())}))};class u extends e{constructor(e,t,n,i,s,r,o,a,d){super(e,t,n),this.startAnimation=e=>{const t=this.node.querySelector(".distance"),n=this.node.querySelector(".car");let i=0;const s=t.offsetLeft,r=t.offsetWidth-n.offsetWidth,o=(r-s)/(60*e),a=()=>{i+=o,n.style.transform=`translateX(${i}px)`,i<r&&(this.animationFrameId=requestAnimationFrame(a))};a()},this.renderGARAGE=a,this.rerenderWinners=d,this.controller=o,this.name=i,this.color=s,this.id=r,this.createButtons(),this.draw(),this.controlCarListeners(),this.controlEngineListeners()}draw(){this.node.innerHTML=`\n    <div class="flex gap-2">\n      <span class='name text-center font-semibold text-white p-1 bg-black bg-opacity-25 rounded-xl'>${this.name}</span>\n    </div>\n    <div class="way flex h-20 bg-neutral-500 px-2">\n      <div class="self-center"></div>\n      <div class="distance flex grow items-center justify-start">\n        <div class="car z-20">\n          <svg width="135" height="65" class="relative rotate-[-90]" fill="${this.color}">\n            <use xlink:href="./assets/images/sprite-car.svg#car"></use>\n          </svg>\n        </div>\n      </div>\n      <div class="finish"></div>\n    </div>\n    `,this.node.firstElementChild.insertAdjacentElement("afterbegin",this.removeCarButton.node),this.node.firstElementChild.insertAdjacentElement("afterbegin",this.selectCarButton.node),this.node.lastElementChild.firstElementChild.append(this.startEngineButton.node,this.stopEngineButton.node)}createButtons(){this.selectCarButton=new e(null,"button","btn p-1 btn-orange","Select"),this.removeCarButton=new e(null,"button","btn p-1 btn-orange","Remove"),this.startEngineButton=new e(null,"button","btn btn-blue block p-1 mb-2","START"),this.stopEngineButton=new e(null,"button","btn btn-pressed block pointer-events-none p-1","STOP")}controlCarListeners(){return h(this,void 0,void 0,(function*(){this.selectCarButton.node.onclick=()=>{const e=document.querySelector("#updateTextInput");e.value=this.name,e.dataset.id=this.id.toString(),document.querySelector("#updateColorInput").value=this.color},this.removeCarButton.node.onclick=()=>h(this,void 0,void 0,(function*(){const e=yield this.controller.deleteCar(this.id);this.renderGARAGE(e),yield this.controller.deleteWinner(this.id),this.updateWinnersTable()}))}))}controlEngineListeners(){return h(this,void 0,void 0,(function*(){this.startEngineButton.node.onclick=()=>h(this,void 0,void 0,(function*(){const e=yield this.controller.startStopEngine(this.id,"started");this.preparingForDrive(e),this.disableStopEngineButton(!1),this.disableStartEngineButton(!0)})),this.stopEngineButton.node.onclick=()=>h(this,void 0,void 0,(function*(){yield this.controller.startStopEngine(this.id,"stopped"),this.preventDriving(),this.disableStopEngineButton(!0),this.disableStartEngineButton(!1)}))}))}preparingForDrive(e,t=!1){u.Winner=null,this.abortRequest=new AbortController;const{velocity:n,distance:i}=e,s=i/n/1e3;this.drive(s,t)}drive(e,t){return h(this,void 0,void 0,(function*(){try{this.startAnimation(e),500===(yield this.controller.driveMode(this.id,this.abortRequest.signal)).status?cancelAnimationFrame(this.animationFrameId):t&&null===u.Winner?(u.Winner=this,this.showRaceResult(e,!0),this.determineWinner(this,e)):this.showRaceResult(e)}catch(e){window.console.warn("Race has forcibly been ended by User")}}))}showRaceResult(t,n=!1){const i=this.node.querySelector(".distance");n?(this.result=new e(i,"div","z-50 race-result flex flex-col justify-between items-center h-[90%] absolute left-[50%] translate-x-[-50%]"),this.result.node.insertAdjacentHTML("beforeend",`<span class='text-4xl font-extrabold tracking-widest animate-bounce text-white'>WINNER</span>\n        <span class='text-3xl font-semibold tracking-wider text-white'>${t.toFixed(3)} sec</span>`)):(this.result=new e(i,"div","z-50 race-result flex h-[90%] absolute left-[50%] translate-x-[-50%]"),this.result.node.insertAdjacentHTML("beforeend",`<span class='text-3xl font-semibold self-end tracking-wider text-white'>${t.toFixed(3)} sec</span>`))}preventDriving(){return h(this,void 0,void 0,(function*(){cancelAnimationFrame(this.animationFrameId),this.abortRequest.abort(),this.node.querySelector(".car").style.transform="translateX(0px)",this.result&&this.result.destroy()}))}determineWinner(e,t){return h(this,void 0,void 0,(function*(){const n=yield this.controller.isFormerWinner(e.id),i=+t.toFixed(3);if(n){const n=yield this.controller.getWinner(e.id),i=+(n.time<t?n.time:t).toFixed(3);yield this.controller.updateWinner(this.id,{wins:n.wins+1,time:i,color:e.color,name:e.name})}else yield this.controller.createWinner({id:e.id,wins:1,time:i,color:e.color,name:e.name});this.updateWinnersTable()}))}updateWinnersTable(){return h(this,void 0,void 0,(function*(){const e=sessionStorage.getItem("currentWinnerPage"),t=yield this.controller.getWinners(Number(e));this.rerenderWinners(t)}))}disableStartEngineButton(e){e?(this.startEngineButton.node.classList.add("pointer-events-none","btn-pressed"),this.startEngineButton.node.classList.remove("btn-blue")):(this.startEngineButton.node.classList.remove("pointer-events-none","btn-pressed"),this.startEngineButton.node.classList.add("btn-blue"))}disableStopEngineButton(e){e?(this.stopEngineButton.node.classList.add("pointer-events-none","btn-pressed"),this.stopEngineButton.node.classList.remove("btn-red")):(this.stopEngineButton.node.classList.remove("pointer-events-none","btn-pressed"),this.stopEngineButton.node.classList.add("btn-red"))}disableSelectAndRemoveButtons(e){e?(this.selectCarButton.node.classList.add("pointer-events-none","btn-pressed"),this.removeCarButton.node.classList.add("pointer-events-none","btn-pressed"),this.selectCarButton.node.classList.remove("btn-orange"),this.removeCarButton.node.classList.remove("btn-orange")):(this.selectCarButton.node.classList.remove("pointer-events-none","btn-pressed"),this.removeCarButton.node.classList.remove("pointer-events-none","btn-pressed"),this.selectCarButton.node.classList.add("btn-orange"),this.removeCarButton.node.classList.add("btn-orange"))}}u.Winner=null;const g=u;var m=function(e,t,n,i){return new(n||(n=Promise))((function(s,r){function o(e){try{d(i.next(e))}catch(e){r(e)}}function a(e){try{d(i.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}d((i=i.apply(e,t||[])).next())}))};const p=class extends e{constructor(e,t,n,i,s){super(e,t,n,i),this.controller=s,this.limitOnPage=7,this.currentPage=sessionStorage.getItem("currentGamePage"),this.carsInGarage=sessionStorage.getItem("totalCarsCount"),this.lastPage=Math.ceil(Number(this.carsInGarage)/this.limitOnPage)}render(e){this.node.firstElementChild&&this.clear(),this.currentPage=sessionStorage.getItem("currentGamePage"),this.carsInGarage=sessionStorage.getItem("totalCarsCount"),this.lastPage=Math.ceil(Number(this.carsInGarage)/this.limitOnPage),this.showCarsInGarage(),this.displayedCar=e.map((e=>new g(this.node,"div","flex flex-col gap-2",e.name,e.color,e.id,this.controller,(e=>this.render(e)),(e=>this.rerenderWinners(e))))),this.drawPagination()}showCarsInGarage(){new e(this.node,"div","font-extrabold text-white w-max text-xl tracking-wider p-1 bg-black bg-opacity-25 rounded-xl").node.textContent=`Garage(${this.carsInGarage})`}drawPagination(){const t=new e(this.node,"div","flex p-3 gap-2 items-center");this.prevButton=new e(t.node,"button","btn btn-red","Prev"),this.nextButton=new e(t.node,"button","btn btn-blue","Next"),this.pagination=new e(t.node,"span","font-extrabold tracking-wider"),this.pagination.node.innerHTML=`\n      Page: ${this.currentPage} / ${this.lastPage}\n      `,this.pagination.node.className="font-extrabold text-xl text-white bg-black bg-opacity-25 rounded-xl p-1",this.isActive(),this.createPaginationListeners()}isActive(){1===Number(this.currentPage)&&this.prevButton.node.classList.add("btn-pressed","pointer-events-none"),Number(this.carsInGarage)<=7&&this.nextButton.node.classList.add("btn-pressed","pointer-events-none"),Number(this.carsInGarage)>7&&this.nextButton.node.classList.remove("btn-pressed","pointer-events-none"),+this.currentPage===this.lastPage&&this.nextButton.node.classList.add("btn-pressed","pointer-events-none")}createPaginationListeners(){this.nextButton.node.onclick=()=>m(this,void 0,void 0,(function*(){const e=+this.currentPage+1,t=yield this.controller.getCars(e);this.currentPage=e.toString(),sessionStorage.setItem("currentGamePage",this.currentPage),this.render(t)})),this.prevButton.node.onclick=()=>m(this,void 0,void 0,(function*(){const e=+this.currentPage-1,t=yield this.controller.getCars(e);this.currentPage=e.toString(),sessionStorage.setItem("currentGamePage",this.currentPage),this.render(t)}))}disablePaginationButtons(e){e?(this.prevButton.node.classList.add("pointer-events-none","btn-pressed"),this.nextButton.node.classList.add("pointer-events-none","btn-pressed")):(this.prevButton.node.classList.remove("pointer-events-none","btn-pressed"),this.nextButton.node.classList.remove("pointer-events-none","btn-pressed"),this.isActive())}},v=class extends e{showScreen(){this.node.classList.remove("hidden")}hideScreen(){this.node.classList.add("hidden")}},b=class extends v{constructor(e,t,n,i,s){super(e,t,n,i),this.handler=new c(this.node,"div","handler","",s),this.garage=new p(this.node,"div","garage mt-3 flex flex-col gap-2","",s),this.handler.GARAGE=this.garage}},f=class extends e{constructor(t,n,i,s,r,o){super(t,n,i,s),this.showGameViewButton=new e(this.node,"button","btn btn-red","Game"),this.showWinnersViewButton=new e(this.node,"button","btn btn-blue","Winners"),this.gameScreen=r,this.winnersScreen=o,this.showGameViewButton.node.onclick=()=>{this.gameScreen.showScreen(),this.winnersScreen.hideScreen(),sessionStorage.setItem("screen","game")},this.showWinnersViewButton.node.onclick=()=>{this.gameScreen.hideScreen(),this.winnersScreen.showScreen(),sessionStorage.setItem("screen","winners")}}disableViewsButtons(e){e?(this.showGameViewButton.node.classList.remove("btn-red"),this.showWinnersViewButton.node.classList.remove("btn-blue"),this.showGameViewButton.node.classList.add("pointer-events-none","btn-pressed"),this.showWinnersViewButton.node.classList.add("pointer-events-none","btn-pressed")):(this.showGameViewButton.node.classList.add("btn-red"),this.showWinnersViewButton.node.classList.add("btn-blue"),this.showGameViewButton.node.classList.remove("pointer-events-none","btn-pressed"),this.showWinnersViewButton.node.classList.remove("pointer-events-none","btn-pressed"))}};var w=function(e,t,n,i){return new(n||(n=Promise))((function(s,r){function o(e){try{d(i.next(e))}catch(e){r(e)}}function a(e){try{d(i.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}d((i=i.apply(e,t||[])).next())}))};const S=class extends e{constructor(e,t,n){super(e,t,n),this.limitOnPage=10}render(t){let n;this.node.firstElementChild&&this.clear(),this.currentPage=sessionStorage.getItem("currentWinnerPage"),this.allWinners=sessionStorage.getItem("totalWinnersCount"),this.lastPage=Math.ceil(Number(this.allWinners)/this.limitOnPage),n=1===Number(this.currentPage)?1:Number(+this.currentPage-1+"1"),this.showWinnersCount(),this.displayedWinners=t.map((t=>{const i=new e(this.node,"tr","");return i.node.innerHTML=`\n      <tr class="p-3">\n        <td class="p-3">${n}</td>\n        <td class="p-3">\n          <svg width="100" height="50" class="relative rotate-[-90] mr-1" fill="${t.color}">\n            <use xlink:href="./assets/images/sprite-car.svg#car"></use>\n          </svg>\n        </td>\n        <td class="p-3">${t.name}</td>\n        <td class="p-3">${t.wins}</td>\n        <td class="p-3">${t.time}</td>\n      </tr>\n      `,n+=1,i.node})),0!==this.displayedWinners.length&&(this.showTable(this.displayedWinners),this.drawWinnersPagination())}showWinnersCount(){0===Number(this.allWinners)?new e(this.node,"div","mt-10 text-center font-extrabold text-white w-max text-3xl tracking-wider p-2 bg-black bg-opacity-25 rounded-xl").node.innerHTML="No winners yet.<br/>\n        Play the game with a race mode if you wanna determine them":new e(this.node,"div","font-extrabold text-white w-max text-xl tracking-wider p-1 bg-black bg-opacity-25 rounded-xl p-1").node.textContent=`Winners(${this.allWinners})`}showTable(t){const n=new e(this.node,"table","p-3 mt-5 bg-white rounded-xl bg-opacity-25");n.node.innerHTML='\n    <thead class="text-center font-semibold text-lg">\n    <tr>\n      <th class="p-2">№</th>\n      <th class="p-2">Car</th>\n      <th class="p-2">Name</th>\n    </tr>\n  </thead>\n  ',this.winsColumn=new e(n.node.firstElementChild.firstElementChild,"th","p-2 cursor-pointer hover:bg-orange-200","Wins"),this.timeColumn=new e(n.node.firstElementChild.firstElementChild,"th","p-2 cursor-pointer hover:bg-orange-200","Best time");const i=new e(this.node,"tbody","text-center text-lg font-medium");i.node.append(...t),n.node.append(i.node),this.createListenersForTable()}drawWinnersPagination(){const t=new e(this.node,"div","flex p-3 gap-2 items-center");this.prevButton=new e(t.node,"button","btn btn-red","Prev"),this.nextButton=new e(t.node,"button","btn btn-blue","Next"),this.pagination=new e(t.node,"span","font-extrabold tracking-wider"),this.pagination.node.innerHTML=`\n      Page: ${this.currentPage} / ${this.lastPage}\n      `,this.pagination.node.className="font-extrabold text-xl text-white bg-black bg-opacity-25 rounded-xl p-1",this.isActive(),this.prevButtonListener(),this.nextButtonListener()}isActive(){1===Number(this.currentPage)&&this.prevButton.node.classList.add("btn-pressed","pointer-events-none"),Number(this.allWinners)<=10&&this.nextButton.node.classList.add("btn-pressed","pointer-events-none"),Number(this.allWinners)>10&&this.nextButton.node.classList.remove("btn-pressed","pointer-events-none"),+this.currentPage===this.lastPage&&this.nextButton.node.classList.add("btn-pressed","pointer-events-none")}prevButtonListener(){this.prevButton.node.onclick=()=>w(this,void 0,void 0,(function*(){const e=+this.currentPage-1;let t;t=null!==sessionStorage.getItem("timeSort")?yield this.controller.sortWinners(e,"time",sessionStorage.getItem("timeSortOrder")):null!==sessionStorage.getItem("winsSort")?yield this.controller.sortWinners(e,"wins",sessionStorage.getItem("winsSortOrder")):yield this.controller.getWinners(e),this.currentPage=e.toString(),sessionStorage.setItem("currentWinnerPage",this.currentPage),this.render(t)}))}nextButtonListener(){this.nextButton.node.onclick=()=>w(this,void 0,void 0,(function*(){const e=+this.currentPage+1;let t;t=null!==sessionStorage.getItem("timeSort")?yield this.controller.sortWinners(e,"time",sessionStorage.getItem("timeSortOrder")):null!==sessionStorage.getItem("winsSort")?yield this.controller.sortWinners(e,"wins",sessionStorage.getItem("winsSortOrder")):yield this.controller.getWinners(e),this.currentPage=e.toString(),sessionStorage.setItem("currentWinnerPage",this.currentPage),this.render(t)}))}createListenersForTable(){this.sortingByTime(),this.sortingByWins()}sortingByTime(){this.timeColumn.node.onclick=()=>w(this,void 0,void 0,(function*(){if(sessionStorage.setItem("timeSort","true"),this.timeSortOrder)if("asc"===this.timeSortOrder){this.timeSortOrder="desc",sessionStorage.setItem("timeSortOrder",this.timeSortOrder);const e=yield this.controller.sortWinners(+sessionStorage.getItem("currentWinnerPage"),"time",this.timeSortOrder);this.render(e),this.timeColumn.node.textContent="Best time ↓",this.timeColumn.node.classList.add("bg-gray-200")}else{this.timeSortOrder=null,sessionStorage.removeItem("timeSortOrder"),sessionStorage.removeItem("timeSort");const e=yield this.controller.getWinners(+sessionStorage.getItem("currentWinnerPage"));this.render(e),this.timeColumn.node.textContent="Best time",this.timeColumn.node.classList.remove("bg-gray-200")}else{this.timeSortOrder="asc",sessionStorage.setItem("timeSortOrder",this.timeSortOrder);const e=yield this.controller.sortWinners(+sessionStorage.getItem("currentWinnerPage"),"time",this.timeSortOrder);this.render(e),this.timeColumn.node.textContent="Best time ↑",this.timeColumn.node.classList.add("bg-gray-200")}}))}sortingByWins(){this.winsColumn.node.onclick=()=>w(this,void 0,void 0,(function*(){if(sessionStorage.setItem("winsSort","true"),this.winsSortOrder)if("asc"===this.winsSortOrder){this.winsSortOrder="desc",sessionStorage.setItem("winsSortOrder",this.winsSortOrder);const e=yield this.controller.sortWinners(+sessionStorage.getItem("currentWinnerPage"),"wins",this.winsSortOrder);this.render(e),this.winsColumn.node.textContent="Wins ↓",this.winsColumn.node.classList.add("bg-gray-200")}else{this.winsSortOrder=null,sessionStorage.removeItem("winsSortOrder"),sessionStorage.removeItem("winsSort");const e=yield this.controller.getWinners(+sessionStorage.getItem("currentWinnerPage"));this.render(e),this.winsColumn.node.textContent="Wins",this.winsColumn.node.classList.remove("bg-gray-200")}else{this.winsSortOrder="asc",sessionStorage.setItem("winsSortOrder",this.winsSortOrder);const e=yield this.controller.sortWinners(+sessionStorage.getItem("currentWinnerPage"),"wins",this.winsSortOrder);this.render(e),this.winsColumn.node.textContent="Wins ↑",this.winsColumn.node.classList.add("bg-gray-200")}}))}},y=class extends v{constructor(e,t,n,i){super(e,t,n),this.table=new S(this.node,"div","flex flex-col items-center"),this.table.controller=i}},C=class extends e{constructor(e,t,n,i,s){super(e,t,n,i),this.winnerScreen=new y(this.node,"div","view__winnerScreen w-[100%] absolute top-[70px] left-0 flex justify-center hidden",s),this.gameScreen=new b(this.node,"main","view__gamescreen w-[100%] absolute top-[70px] left-0 px-3 hidden","",s),this.screenToggler=new f(e,"div","view__screen-toggler flex justify-center p-3 gap-3","",this.gameScreen,this.winnerScreen),this.gameScreen.garage.rerenderWinners=e=>this.winnerScreen.table.render(e),this.gameScreen.handler.disableViewButtons=e=>{this.screenToggler.disableViewsButtons(e)}}};var B=function(e,t,n,i){return new(n||(n=Promise))((function(s,r){function o(e){try{d(i.next(e))}catch(e){r(e)}}function a(e){try{d(i.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}d((i=i.apply(e,t||[])).next())}))};new class extends e{constructor(e,t,n){super(e,t,n),this.model=new a,this.controller=new class{constructor(){this.model=new a}getCars(e){return d(this,void 0,void 0,(function*(){return yield this.model.getCars(e)}))}deleteCar(e){return d(this,void 0,void 0,(function*(){return yield this.model.deleteCar(e),yield this.model.getCars()}))}createCar(e){return d(this,void 0,void 0,(function*(){return yield this.model.createCar(e)}))}createPlentyOfCars(e){return d(this,void 0,void 0,(function*(){return yield this.model.createPlentyOfCars(e)}))}updateCar(e,t){return d(this,void 0,void 0,(function*(){return yield this.model.updateCar(e,t)}))}startStopEngine(e,t){return d(this,void 0,void 0,(function*(){return yield this.model.startStopEngine(e,t)}))}driveMode(e,t){return d(this,void 0,void 0,(function*(){return yield this.model.driveMode(e,t)}))}createWinner(e){return d(this,void 0,void 0,(function*(){yield this.model.createWinner(e)}))}getWinners(e){return d(this,void 0,void 0,(function*(){return yield this.model.getWinners(e)}))}sortWinners(e,t,n){return d(this,void 0,void 0,(function*(){return yield this.model.getWinners(e,t,n)}))}getWinner(e){return d(this,void 0,void 0,(function*(){const t=yield this.model.getWinner(e);return yield t.json()}))}isFormerWinner(e){return d(this,void 0,void 0,(function*(){return!!(yield this.model.getWinner(e)).ok}))}updateWinner(e,t){return d(this,void 0,void 0,(function*(){yield this.model.updateWinner(e,t)}))}deleteWinner(e){return d(this,void 0,void 0,(function*(){yield this.model.deleteWinner(e)}))}},this.view=new C(this.node,"div","view relative","",this.controller)}init(){return B(this,void 0,void 0,(function*(){this.checkActiveScreen(),this.sessionPreset();const e=yield this.model.getCars(this.startPage);this.renderCarsInGarage(e);const t=yield this.model.getWinners();this.renderWinners(t)}))}checkActiveScreen(){"winners"!==sessionStorage.getItem("screen")?(sessionStorage.getItem("screen"),this.view.gameScreen.showScreen()):this.view.winnerScreen.showScreen()}renderCarsInGarage(e){return B(this,void 0,void 0,(function*(){this.view.gameScreen.garage.render(e)}))}renderWinners(e){return B(this,void 0,void 0,(function*(){e[0]&&!("color"in e[0])&&(yield this.model.deleteWinner(e[0].id));const t=yield this.model.getWinners(this.startPage);this.view.winnerScreen.table.render(t)}))}sessionPreset(){sessionStorage.removeItem("timeSort"),sessionStorage.removeItem("timeSortOrder"),sessionStorage.removeItem("winsSort"),sessionStorage.removeItem("wins"),this.startPage=1}}(document.body,"div","flex-column").init()})()})();