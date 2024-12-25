const baseUrl="https://2024-03-06.currency-api.pages.dev/v1/currencies/";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn =document.querySelector("#btn");
const fromCurr=document.querySelector("#fromCurrency");//FROM SELECT 
const toCurr=document.querySelector("#toCurrency");//TO SELECT
const input=document.querySelector("#amount");
const msg=document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
     
    
      select.append(newOption);
    }
    select.addEventListener("change", updateFlag);
}

  
function updateFlag(event){
    const currCod=event.target.value;
    const countryCode=countryList[currCod];

    const newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = event.target.parentElement.querySelector("img");
    img.src=newsrc;
    

}

btn.addEventListener("click",(ev)=>{
    ev.preventDefault();
    calculate();
});

async function calculate(){

   const url=`${baseUrl}${fromCurr.value.toLowerCase()}.json`;
   let response =await fetch(url);
   let data=await response.json();
   const rate =data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   const inputAmount=input.value;
   const finalAmount=rate*inputAmount;

   const msgPrint=`${inputAmount}${fromCurr.value}=${finalAmount}${toCurr.value}`
   msg.innerText=msgPrint;
}


