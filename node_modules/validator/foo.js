var v = require('./')
  , Validator = v.Validator
  , check = v.check;

Validator.prototype.error = function (msg) {
    return false;
};

console.log(check("short").len(6, 64));
console.log(check("long").len(1, 2));

