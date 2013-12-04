/*
* JavaScript TimeSpan Library
*
* Copyright (c) 2010 Michael Stum, Charlie Robbins
* 
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//
// ### Time constants
//
var msecPerSecond = 1000,
    msecPerMinute = 60000,
    msecPerHour = 3600000,
    msecPerDay = 86400000;

var timeSpanWithDays = /^(\d+):(\d+):(\d+):(\d+)(\.\d+)?/,
    timeSpanNoDays = /^(\d+):(\d+):(\d+)(\.\d+)?/;

//
// ### Helper functions
//
var isNumeric = function (input) {
  return input && !isNaN(parseFloat(input)) && isFinite(input);
};

exports.getVersion = function () {
  return '2.0.0';
};

exports.fromMilliseconds = function (milliseconds) {
  return new TimeSpan(milliseconds, 0, 0, 0, 0);
}

exports.fromSeconds = function (seconds) {
  return new TimeSpan(0, seconds, 0, 0, 0);
};

exports.fromMinutes = function (minutes) {
  return new TimeSpan(0, 0, minutes, 0, 0);
};

exports.fromHours = function (hours) {
  return new TimeSpan(0, 0, 0, hours, 0);
};

exports.fromDays = function (days) {
  return new TimeSpan(0, 0, 0, 0, days);
};

exports.parse = function (str) {
  var match, milliseconds;
  
  function parseMilliseconds (value) {
    return value ? parseFloat('0' + value) * 1000 : 0;
  }
  
  // If we match against a full TimeSpan: 
  //   [days]:[hours]:[minutes]:[seconds].[milliseconds]?
  if ((match = str.match(timeSpanWithDays))) {
    return new TimeSpan(parseMilliseconds(match[5]), match[4], match[3], match[2], match[1]);
  }
  
  // If we match against a partial TimeSpan:
  //   [hours]:[minutes]:[seconds].[milliseconds]?
  if ((match = str.match(timeSpanNoDays))) {
    return new TimeSpan(parseMilliseconds(match[4]), match[3], match[2], match[1], 0);
  }
  
  return null;
};

exports.test = function (str) {
  return timeSpanWithDays.test(str) || timeSpanNoDays.test(str);
};

exports.clone = function (timeSpan) {
  if (!(timeSpan instanceof TimeSpan)) return;
  return exports.fromMilliseconds(timeSpan.totalMilliseconds());
};

exports.fromDates = function (firstDate, secondDate, forcePositive) {
  var differenceMsecs = secondDate.valueOf() - firstDate.valueOf();
  if (forcePositive) differenceMsecs = Math.abs(differenceMsecs);

  return new TimeSpan(differenceMsecs, 0, 0, 0, 0);
};

exports.TimeSpan = TimeSpan;

// Constructor function, all parameters are optional
var TimeSpan = function (milliseconds, seconds, minutes, hours, days) {
  this.msecs = 0;
  
  // Constructor Logic
  if (isNumeric(days)) {
    this.msecs += (days * msecPerDay);
  }
  
  if (isNumeric(hours)) {
    this.msecs += (hours * msecPerHour);
  }
  
  if (isNumeric(minutes)) {
    this.msecs += (minutes * msecPerMinute);
  }
  
  if (isNumeric(seconds)) {
    this.msecs += (seconds * msecPerSecond);
  }
  
  if (isNumeric(milliseconds)) {
    this.msecs += milliseconds;
  }
};

TimeSpan.prototype.addMilliseconds = function (milliseconds) {
  if (!isNumeric(milliseconds)) return;
  this.msecs += milliseconds;
};

TimeSpan.prototype.addSeconds = function (seconds) {
  if (!isNumeric(seconds)) return;
  this.msecs += (seconds * msecPerSecond);
};

TimeSpan.prototype.addMinutes = function (minutes) {
  if (!isNumeric(minutes)) return;
  this.msecs += (minutes * msecPerMinute);
};

TimeSpan.prototype.addHours = function (hours) {
  if (!isNumeric(hours)) return;
  this.msecs += (hours * msecPerHour);
};

TimeSpan.prototype.addDays = function (days) {
  if (!isNumeric(days)) return;
  this.msecs += (days * msecPerDay);
};

TimeSpan.prototype.subtractMilliseconds = function (milliseconds) {
  if (!isNumeric(milliseconds)) return;
  this.msecs -= milliseconds;
};

TimeSpan.prototype.subtractSeconds = function (seconds) {
  if (!isNumeric(seconds)) return;
  this.msecs -= (seconds * msecPerSecond);
};

TimeSpan.prototype.subtractMinutes = function (minutes) {
  if (!isNumeric(minutes)) return;
  this.msecs -= (minutes * msecPerMinute);
};

TimeSpan.prototype.subtractHours = function (hours) {
  if (!isNumeric(hours)) return;
  this.msecs -= (hours * msecPerHour);
};

TimeSpan.prototype.subtractDays = function (days) {
  if (!isNumeric(days)) return;
  this.msecs -= (days * msecPerDay);
};

TimeSpan.prototype.add = function (timeSpan) {
  if (!(timeSpan instanceof TimeSpan)) return;
  this.msecs += timeSpan.totalMilliseconds();
};

TimeSpan.prototype.subtract = function (timeSpan) {
  if (!(timeSpan instanceof TimeSpan)) return;
  this.msecs -= timeSpan.totalMilliseconds();
};

TimeSpan.prototype.equals = function (timeSpan) {
  if (!(timeSpan instanceof TimeSpan)) return;
  return this.msecs === timeSpan.totalMilliseconds();
};

// Getters
TimeSpan.prototype.totalMilliseconds = function (roundDown) {
  var result = this.msecs;
  if (roundDown === true) result = Math.floor(result);
  return result;
};

TimeSpan.prototype.totalSeconds = function (roundDown) {
  var result = this.msecs / msecPerSecond;
  if (roundDown === true) result = Math.floor(result);
  return result;
};

TimeSpan.prototype.totalMinutes = function (roundDown) {
  var result = this.msecs / msecPerMinute;
  if (roundDown === true) result = Math.floor(result);
  return result;
};

TimeSpan.prototype.totalHours = function (roundDown) {
  var result = this.msecs / msecPerHour;
  if (roundDown === true) result = Math.floor(result);
  return result;
};

TimeSpan.prototype.totalDays = function (roundDown) {
  var result = this.msecs / msecPerDay;
  if (roundDown === true) result = Math.floor(result);
  return result;
};

TimeSpan.prototype.toString = function () {
  return [
    this.days,
    this.hours,
    this.minutes,
    this.seconds + '.' + this.milliseconds
  ].join(':')
};

TimeSpan.prototype.__defineGetter__('milliseconds', function () {
  return this.msecs % 1000;
});

TimeSpan.prototype.__defineGetter__('seconds', function () {
  return Math.floor(this.msecs / msecPerSecond) % 60;
});

TimeSpan.prototype.__defineGetter__('minutes', function () {
  return Math.floor(this.msecs / msecPerMinute) % 60;
});

TimeSpan.prototype.__defineGetter__('hours', function () {
  return Math.floor(this.msecs / msecPerHour) % 24;
});

TimeSpan.prototype.__defineGetter__('days', function () {
  return Math.floor(this.msecs / msecPerDay);
});
