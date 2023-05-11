"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a bitfield
 * using a Javascript number
 * i.e. 2   -> 10
 *      32  -> 100000
 *      512 -> 1000000000
 *      etc...
 */
var Bitfield = /** @class */ (function () {
    /**
     * @param {number} flag - The flag to start out with
     */
    function Bitfield(flag) {
        if (flag === void 0) { flag = 0; }
        // All bits are false to start with
        this.bits = flag;
    }
    /**
     * Checks the flag to make sure it isn't out
     * of bounds, checks if it is indeed a number,
     * checks if it is within a valid range (2^0 to 2^53),
     * checks to see if it is an integer and not a float
     * @param {number} flag - The flag to bounds check
     * @returns {void}
     */
    Bitfield.prototype.checkFlagBounds = function (flag) {
        if (Number.isNaN(flag)) {
            throw new Error("That is not a number! Please use an integer");
        }
        // if the number isn't an integer, throw an error
        if (!Number.isInteger(flag)) {
            throw new Error("Please use integers only.");
        }
        if (flag < 1) {
            throw new Error("Number has to be in the range of (2^0) to (2^53 - 1)");
        }
        // if the passed in number
        // is too big throw an error
        if (!Number.isSafeInteger(flag)) {
            throw new Error("That number is too large. Javascript numbers only accept numbers up to 2^53 - 1");
        }
    };
    /**
     * Returns true or false depending on if the given flag is set
     * @param {number} flag - The flag to search for
     * @returns {boolean}
     */
    Bitfield.prototype.get = function (flag) {
        this.checkFlagBounds(flag);
        // this turns a number into a boolean
        // !16 = false, !!16 = true
        return !!(this.bits & flag);
    };
    /**
     * Turns on bits given a flag
     * @param {number} flag - The flag that is going to be set in the bitfield
     * @returns {void}
     */
    Bitfield.prototype.set = function (flag) {
        this.checkFlagBounds(flag);
        this.bits |= flag;
    };
    /**
     * @param flag - The flag or bits to delete
     * @returns {void}
     */
    Bitfield.prototype.delete = function (flag) {
        this.checkFlagBounds(flag);
        this.bits &= ~flag;
    };
    /**
     * Prints the bits to the screen
     * @returns {void}
     */
    Bitfield.prototype.print = function () {
        console.log(this.bits.toString(2), "Binary representation of ".concat(this.bits));
    };
    return Bitfield;
}());
exports.default = Bitfield;
// Motivation: A lightweight state management
// Example use case of a Bitfield
var DARK_MODE = 1;
var MOBILE_MENU = 2;
var MODAL_OPEN = 4;
var USER_LOGGED_IN = 8;
var ERROR = 16;
//
// ..... anything else you can think of
// Javascript stores up to 2^53 precision for integers
// so 54 bits or 54 toggles for state
var b = new Bitfield();
// You can set each bit individually
/*
b.set(DARK_MODE);
b.set(MODAL_OPEN);
b.set(MOBILE_MENU);
b.set(USER_LOGGED_IN);
b.set(ERROR);
*/
// or all at the same time
b.set(DARK_MODE | MODAL_OPEN | MOBILE_MENU | USER_LOGGED_IN | ERROR);
b.print();
// Same with deleting
b.delete(DARK_MODE | MODAL_OPEN | MOBILE_MENU | USER_LOGGED_IN | ERROR);
b.print();
