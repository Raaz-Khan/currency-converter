
import { countryList,countryName } from "./code.js";
console.log('js is running');
const mainURL = "https://v6.exchangerate-api.com/v6/7b85bf757fa55fac06572998/pair";


let amountContainer = document.querySelector('#amount');
let fromCurr = document.querySelector('#From');
let toCurr = document.querySelector('#To');
let fromFlag = document.querySelector('#fromFlag');
let toFlag = document.querySelector('#toFlag');
let Output = document.querySelector('.rate');
let convertBtn = document.querySelector('#submit');
let changeBtn = document.querySelector('.change');




function currOption(Select) {

    for (const curr in countryList) {
    let newOption = document.createElement('option');
    newOption.innerHTML = countryName[curr];   
    newOption.value = curr ;

    if (Select.name === 'From' && curr === 'USD') {
        newOption.selected = true;
    }
    if (Select.name === 'To' && curr === 'INR') {
        newOption.selected = true;
    }


    Select.append(newOption);
    }

    Select.addEventListener('change',(e)=>{
        updateFlag(e.target);
    });
}


    
async function currConvert(event) {
    event.preventDefault();
    let base_curr = fromCurr.value;
    let target_curr = toCurr.value;
    let amount = amountContainer.value;
    let newUrl = `${mainURL}/${base_curr}/${target_curr}/${amount}`;
    let promise = await fetch(newUrl);
    let data = await promise.json();
    Output.innerText = data.conversion_result;

}

let updateFlag = (e)=>{
    let currency = e.value;
    let country = countryList[currency];
    let newFlag = `https://flagsapi.com/${country}/flat/64.png`;
    let image =   e.parentElement.querySelector('img');
    image.src = newFlag;
    
}


let exchange = (e)=>{

    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    updateFlag(fromCurr);
    updateFlag(toCurr);
    currConvert(e);
}


currOption(fromCurr);
currOption(toCurr);



changeBtn.addEventListener('click',(e)=>{
    exchange(e);
});




window.addEventListener('load',(e)=>{
    currConvert(e);
})


convertBtn.addEventListener('click',(e)=>{
    currConvert(e);
})