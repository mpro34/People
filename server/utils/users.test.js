const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Arnold',
      room: 'React Course'
    },{
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'chris',
      room: 'The Office Fans'
    };
    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    let userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });
  it('should return names for react course', () => {
    let userList = users.getUserList('React Course');
    expect(userList).toEqual(['Arnold']);
  });

  it('should remove a user', () => {
    let user = users.removeUser('3');
    expect(user.id).toEqual("3");
    expect(users.users.length).toBe(2);
  });
  it('should not remove a user', () => {
    let user = users.removeUser('16');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    let user = users.getUser('1');
    expect(user).toEqual({ id: '1', name: 'Mike', room: 'Node Course' });
  });
  it('should not find user', () => {
    let user = users.getUser('25');
    expect(user).toNotExist();
  });
});
