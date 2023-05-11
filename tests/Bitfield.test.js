const Bitfield = require("../Bitfield.js").default;
require("jest");

describe("Bitfield", () => {
  describe("Bad input", () => {
    let b = null;
    beforeAll(() => {
      b = new Bitfield();
    })
    afterAll(() => {
      b = null;
    })

    it("Should throw when strings are inputted", () => {
      expect(() => { b.set("squirrel") }).toThrow(new Error("Please use integers only."));
      expect(() => { b.set("80") }).toThrow(new Error("Please use integers only."));
      expect(() => { b.set("") }).toThrow(new Error("Please use integers only."));
    })
    it("Should throw when input is not a number at all.", () => {
      expect(() => { b.set({}) }).toThrow(new Error("Please use integers only."));
      expect(() => { b.set(NaN) }).toThrow(new Error("That is not a number! Please use an integer"));
    })
    it("Should throw when the number passed in is less than 1.", () => {
      expect(() => { b.set(-1) }).toThrow(new Error("Number has to be in the range of (2^0) to (2^53 - 1)"));
      expect(() => { b.set(Number.MIN_SAFE_INTEGER) }).toThrow(new Error("Number has to be in the range of (2^0) to (2^53 - 1)"));
    })
    it("Should throw when the number passed in is too large.", () => {
      expect(() => { b.set(Number.MAX_SAFE_INTEGER + 1) }).toThrow(new Error("That number is too large. Javascript numbers only accept numbers up to 2^53 - 1"));
      expect(() => { b.set(Number.MAX_SAFE_INTEGER + 1) }).toThrow(new Error("That number is too large. Javascript numbers only accept numbers up to 2^53 - 1"));
    })
  });


  describe("Constructor", () => {
    let defaultCstor = null;
    let flagCstor = null;
    let initialFlag = 1024;
    beforeAll(() => {
      defaultCstor = new Bitfield();
      flagCstor = new Bitfield(initialFlag);
    })
    afterAll(() => {
      defaultCstor = null;
      flagCstor = null;
    })

    it("Should set all bits to 0 initially.", () => {
      // Test all of the bits
      let bits = defaultCstor.get(Number.MAX_SAFE_INTEGER);
      expect(bits).toBe(false);


      bits = flagCstor.get(initialFlag);
      expect(bits).toBe(true);
    })
  })

  describe("Setter", () => {
    let b = null;
    let flag = 52;
    beforeAll(() => {
      b = new Bitfield();
    })
    afterAll(() => {
      b = null;
    })

    it("Should set the bitfield to the desired flag", () => {
      b.set(flag);
      expect(b.get(flag)).toBe(true);
      // All of these values should be true, as we're 
      // just checking to see if one of the bits is set
      expect(b.get(48)).toBe(true);
      expect(b.get(32)).toBe(true);
      expect(b.get(20)).toBe(true);
      expect(b.get(4)).toBe(true);
    })

    it("Should work on edge cases", () => {
      b.set(Number.MAX_SAFE_INTEGER);
      expect(b.get(Number.MAX_SAFE_INTEGER)).toBe(true);
      expect(b.get(1)).toBe(true);
    })
  })

  describe("Delete", () => {
    let b = null;
    let flag = 69;

    beforeAll(() => {
      b = new Bitfield();
    })
    afterAll(() => {
      b = null;
    })

    it("Should delete the flag", () => {
      b.set(flag);
      b.delete(flag);
      expect(b.get(flag)).toBe(false);

      // It shouldn't delete bits above the flag
      b.set(2);
      b.delete(1);
      expect(b.get(2)).toBe(true);
      // It shouldn't matter how many times we try to delete
      b.delete(1);
      expect(b.get(1)).toBe(false);
    })
  })
})
