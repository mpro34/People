const expect = require('expect');

// import isRealString
const {isRealString} = require('./validation');
// isRealString
describe('isRealString tests', () => {
  //should reject non-string values
  it('should reject non-string values', () => {
    let name = 36;
    let room = { text: 'some value' };
    expect(isRealString(name)).toBe(false);
    expect(isRealString(room)).toBe(false);
  });
  //should reject strings with only spaces
  it('should reject strings with only spaces', () => {
    let name = "     ";
    expect(isRealString(name)).toBe(false);
  });
  //should allow strings with non space characters
  it('should allow strings with non space characters', () => {
    let name = "ChrisWhit";
    expect(isRealString(name)).toBe(true);
  });
});
