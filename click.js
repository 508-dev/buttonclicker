const state = {
  level: 0,
  arena_BUTTONS: [],
  basic_increment: 1
};
let count = 0;
addButtonToArena(createButton('Click', 'click', CLICK_BUTTON));
const BUTTON = document.querySelector('button.click');
const COUNTER = document.querySelector('.click-counter');
BUTTON.onclick = CLICK_BUTTON;

function CLICK_BUTTON() {
  incrementCount();
}

function incrementCount(){
  count += state.basic_increment;
  COUNTER.innerHTML = count;
  stateCheck(count);
}

function stateCheck(count) {
  if (state.level < 1) {
    if (count === 10) {
      addButtonToUpgrades(createButton(
        'Another Button',
        'click',
        addAnotherArenaButton
      ));
    }
  }
}

function addAnotherArenaButton(){
  state.basic_increment++;
  addButtonToArena(createButton('Click', 'click', CLICK_BUTTON));
}

function createButton(text, type, callback){
  const new_button = document.createElement('button');
  new_button.innerHTML = text;
  new_button.classList.add(type);
  new_button.onclick = callback.bind(new_button);
  return new_button;
}

function addButtonToUpgrades(button){
  const upgrades_list = document.querySelector('.upgrades ul');
  const new_upgrade_list_item = document.createElement('li');
  new_upgrade_list_item.appendChild(button);
  upgrades_list.appendChild(new_upgrade_list_item);
  return upgrades_list;
}

function addButtonToArena(button){
  const arena = document.querySelector('.arena');
  arena.appendChild(button);
  state.arena_BUTTONS.push(button);
  return arena;
}
