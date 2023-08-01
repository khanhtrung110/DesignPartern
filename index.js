"use strict";
//Singleton 
// Chi khoi tao 1 doi tuong
let instance;
let globalState = {
    color: ""
};
class StateUtility {
    constructor() {
        if (instance) {
            throw new Error("New instance cannot be created!!");
        }
        instance = this;
    }
    getPropertyByName(propertyName) {
        return globalState[propertyName];
    }
    setPropertyValue(propertyName, propertyValue) {
        globalState[propertyName] = propertyValue;
    }
}
let stateUtilityInstance = new StateUtility();
stateUtilityInstance.setPropertyValue("color", "red");
//Prototype
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
        this.name = name;
        this.salary = salary;
    }
    funcEmployee1() {
        return false;
    }
}
Employee.prototype.getSalary = function () {
    return this.salary;
};
const e1 = new Employee('Bobby Hadz', 100);
// Builder
// nhap thuoc tinh tung phan
class HotDog {
    constructor(bread, cheese, meat) {
        this.cheese = false;
        this.meat = false;
        this.bread = '';
        this.bread = bread;
    }
    addCheese() {
        this.cheese = true;
        return this;
    }
    addMeat() {
        this.meat = true;
        return this;
    }
}
const myLunch = new HotDog('bread 1');
myLunch.addCheese().addMeat();
console.log('myLunch', myLunch);
//Factory
//Xay dung Class tao doi tuong
class IosButton {
}
;
class AndroidButton {
}
;
class ButtonFactory {
    createButton(os) {
        if (os == 'ios') {
            return new IosButton();
        }
        else {
            return new AndroidButton();
        }
    }
}
const factory = new ButtonFactory();
const btnIos = factory.createButton('ios');
//Facade
//Tap hop cac phan nho thanh 1 chuc nang
class PlumbingSystem {
    // low evel access to plubming system
    setPressure(v) { }
    turnOn() { }
    turnOff() { }
}
class ElectricalSystem {
    // low evel access to electrical system
    setVoltage(v) { }
    turnOn() { }
    turnOff() { }
}
class House {
    constructor() {
        this.plumbing = new PlumbingSystem();
        this.electrical = new ElectricalSystem();
    }
    turnOnSystems() {
        this.electrical.setVoltage(120);
        this.electrical.turnOn();
        this.plumbing.setPressure(500);
        this.plumbing.turnOn();
    }
    shutDown() {
        this.plumbing.turnOff();
        this.electrical.turnOff();
    }
}
const client = new House();
client.turnOnSystems();
client.shutDown();
//Proxy
//Cap nhap thay doi giong Vue
const original = { name: 'jeff' };
const reactive = new Proxy(original, {
    get(target, key) {
        console.log('Tracking: ', key);
        return target[key];
    },
    set(target, key, value) {
        console.log('updating UI...');
        return Reflect.set(target, key, value);
    },
});
reactive.name; // 'Tracking: name'
reactive.name = 'bob'; // 'updating UI...'
//Iterator 
function range(start, end, step = 1) {
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (start < end) {
                start = start + step;
                return { value: start, done: false };
            }
            return { done: true, value: end };
        }
    };
}
for (const n of range(0, 100, 5)) {
    console.log(n);
}
//Observer
// Giong voi theo doi cac xu kien nhu click trong Dom.
const observers = [];
const useObserver = Object.freeze({
    notify: (data) => observers.forEach((observer) => observer(data)),
    subscribe: (func) => observers.push(func),
    unsubscribe: (func) => {
        [...observers].forEach((observer, index) => {
            if (observer === func) {
                observers.splice(index, 1);
            }
        });
    },
});
useObserver.subscribe((data) => console.log('data', data));
//Implementation
// Bo xu ly trung tam
var Participant = function (name) {
    this.name = name;
    this.chatroom = null;
};
Participant.prototype = {
    send: function (message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function (message, from) {
        console.log(from.name + " to " + this.name + ": " + message);
    }
};
var Chatroom = function () {
    var participants = {};
    return {
        register: function (participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },
        send: function (message, from, to) {
            if (to) { // single message
                to.receive(message, from);
            }
            else { // broadcast message
                for (key in participants) {
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
};
function run() {
    var yoko = new Participant("Yoko");
    var john = new Participant("John");
    var paul = new Participant("Paul");
    var ringo = new Participant("Ringo");
    var chatroom = new Chatroom();
    chatroom.register(yoko);
    chatroom.register(john);
    chatroom.register(paul);
    chatroom.register(ringo);
    yoko.send("All you need is love.");
    yoko.send("I love you John.");
    john.send("Hey, no need to broadcast", yoko);
    paul.send("Ha, I heard that!");
    ringo.send("Paul, what do you think?", paul);
}
//State
//Giong State store vue
class HappyState {
    think() {
        return 'I am happy 🙂';
    }
}
class SadState {
    think() {
        return 'I am sad 🙁';
    }
}
class Human {
    constructor() {
        this.state = new HappyState();
    }
    changeState(state) {
        this.state = state;
    }
    think() {
        return this.state.think();
    }
}
const human = new Human();
console.log(human.think());
human.changeState(new SadState());
console.log(human.think());
