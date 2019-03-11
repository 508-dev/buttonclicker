const BUTTON = document.querySelector('button.click');
const COUNTER = document.querySelector('.click-counter');
let count = 0;
const state = {
  level: 0,
};
BUTTON.onclick = ()=>{
  count++;
  COUNTER.innerHTML = count;
  stateCheck(count);
};

function stateCheck(count) {
  if (state.level < 1) {
    if (count === 10) {
      addButtonToUpgrades(createButton('Another Button'));
    }
  }
}

function createButton(text, callback){
  const new_button = document.createElement('button');
  new_button.innerHTML = text;
  new_button.onclick = callback;
  return new_button;
}

function addButtonToUpgrades(button){
  const upgrades_list = document.querySelector('.upgrades ul');
  const new_upgrade_list_item = document.createElement('li');
  new_upgrade_list_item.appendChild(button);
  upgrades_list.appendChild(new_upgrade_list_item);
  return upgrades_list;
}