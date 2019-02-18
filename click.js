const BUTTON = document.querySelector('button.click');
const COUNTER = document.querySelector('.click-counter');
let count = 0;
BUTTON.onclick = ()=>{
  count++;
  COUNTER.innerHTML = count;
};
