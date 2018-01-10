[{
  id: ''
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)


class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    let user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    //return user that was removed
    let user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser (id) {
    //return user that has matching id
    let user = this.users.filter((user) => user.id === id)[0];
    return user;
  }
  getUserList (room) {
    // return array of users that are in the room
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }
//
// let me = new Person('Chris', 26);
// console.log(me.getUserDescription());
