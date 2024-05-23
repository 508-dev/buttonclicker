let count = 0;
const COUNTER = document.querySelector('.click-counter');

class Button {
  constructor(type, cb) {
    this.type = type;
    this.external_callback = cb || function(){};
    this.element = document.createElement('button');
    this.element.classList.add(this.type);
    this.element.innerHTML = this.type.charAt(0).toUpperCase() + this.type.slice(1);
    this.element.onclick = this.onclick.bind(this);
  }
  onclick() {
    this.external_callback();
  }
  static basicClick() {
    this.incrementCount();
  }
}

class Game {
  constructor() {
    this.arena = document.querySelector('.arena');
    this.upgrades = document.querySelector('.upgrades');
    this.state = {
      basic_increment: 1,
      upgrades: [],
    };
    this.arena = new DomArea('main .arena', this.state);
    this.upgrades = new UpgradesList('main .upgrades', this.state);
  }
  stateCheck(count) {
    if (count === 10 && this.state.upgrades.indexOf('addClicker') === -1) {
      this.state.upgrades.push('addClicker');
      this.addButtonToUpgrades(
        new Button('addClicker', this.upgradeAddBasicButton.bind(this)),
      );	
    } else if (count >= 100 && this.state.upgrades.indexOf('add10Clickers') === -1) {
      this.state.upgrades.push('add10Clickers');
      this.addButtonToUpgrades(
        new Button('add10Clickers', this.upgradeAdd10Clickers.bind(this)),
      );
    } else if (count >= 1000 && this.state.upgrades.indexOf('autoclicker') === -1) {
      this.state.upgrades.push('autoclicker');
      this.addButtonToUpgrades(
        new Button('autoClicker', this.upgradeAddAutoClicker.bind(this)),
      );
    }
  }
  addBasicButtonToArena() {
    const button = new Button('click', this.incrementCount.bind(this));
    this.arena.addButton(button);
  }
  addAutoClicker() {
    setInterval(function(){
      this.incrementCount();
    }.bind(this), 1000);
  }
  addButtonToUpgrades(button) {
    this.upgrades.addButton(button);
  }
  incrementCount() {
    count += this.state.basic_increment;
    COUNTER.innerHTML = count;
    this.stateCheck(count);
  }
  decrementCount(num) {
    count -= num;
    COUNTER.innerHTML = count;
    this.stateCheck();
  }
  upgradeAddBasicButton() {
    if (count >= 10) {
      this.addBasicButtonToArena.call(this);
      this.state.basic_increment++;
      this.decrementCount(10);
    }
  }
  upgradeAdd10Clickers() {
    if (count >= 100) {
	  for (let i =0; i < 10; i++)
	  {
		this.addBasicButtonToArena.call(this);
		this.state.basic_increment++;
	  }
      this.decrementCount(100);
    }
  }
  upgradeAddAutoClicker() {
    if (count >= 1000) {
      this.addAutoClicker();
      this.decrementCount(1000);
    }
  }
}

class DomArea {
  constructor(selector, state) {
    this.state = state;
    this.element = document.querySelector(selector);
    this.domlist = [];
  }
  addButton(button) {
    let el;
    if (button instanceof Button) {
      el = button.element;
    } else {
      el = button;
    }
    this.domlist.push(el);
    this.element.appendChild(el);
    return this.element;
  }
}

class UpgradesList extends DomArea {
  constructor(selector) {
    super(selector);
  }
  addButton(button) {
    let el;
    if (button instanceof Button) {
      el = button.element;
    } else {
      el = button;
    }
    this.domlist.push(el);
    const upgrades_list = this.element.querySelector('ul');
    const new_upgrade_list_item = document.createElement('li');
    new_upgrade_list_item.appendChild(el);
    upgrades_list.appendChild(new_upgrade_list_item);
    return this.upgrades_list;
  }
}

const game = new Game();
game.addBasicButtonToArena();
