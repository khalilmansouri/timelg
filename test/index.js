/**
 * Created by miserylee on 16/8/31.
 */

require('../');
const assert = require('assert');

describe('time', function () {
  it('today beginning', function () {
    const todayBeginning = 'today'.beginning;
    assert(todayBeginning instanceof Date, 'must be an instance of Date');
    assert(todayBeginning.getTime() === new Date(new Date().toDateString()).getTime(), 'time is wrong');
  });
  it('today ending', function () {
    const todayEnding = 'today'.ending;
    assert(todayEnding instanceof Date, 'must be an instance of Date');
    assert(todayEnding.getTime() === new Date(new Date().toDateString()).getTime() + 24 * 36e5 - 1, 'time is wrong');
  });
  it('the beginning of now', function () {
    const time = new Date().beginning;
    assert(time instanceof Date, 'must be an instance of Date');
    assert(time.getTime() === new Date(new Date().toDateString()).getTime(), 'time is wrong');
  });
  it('the ending of now', function () {
    const time = new Date().ending;
    assert(time instanceof Date, 'must be an instance of Date');
    assert(time.getTime() === new Date(new Date().toDateString()).getTime() + 24 * 36e5 - 1, 'time is wrong');
  });
});

describe('offset', function () {
  const now = new Date();
  it('after xx', function () {
    assert(typeof '3 hours'.after === 'function', 'must be a function');
    const offset = '3 hours'.after(now);
    assert(offset instanceof Date, 'must be an instance of Date');
    assert(offset.getTime() === now.getTime() + 3 * 36e5, 'time is wrong');
  });
  it('before xx', function () {
    assert(typeof '3 hours'.before === 'function', 'must be a function');
    const offset = '3 hours'.before(now);
    assert(offset instanceof Date, 'must be an instance of Date');
    assert(offset.getTime() === now.getTime() - 3 * 36e5, 'time is wrong');
  });
});

describe('exact time', function () {
  it('12:00 at today', function () {
    const time = '12:00'.at('today');
    assert(time instanceof Date, 'should be an instance of Date');
    assert(time.getTime() === new Date(new Date().toDateString() + ' 12:00').getTime(), 'time is wrong');
  });
  it('23:59 at today', function () {
    const time = '23:59'.at('today');
    assert(time instanceof Date, 'should be an instance of Date');
    assert(time.getTime() === new Date(new Date().toDateString() + ' 23:59').getTime(), 'time is wrong');
  });
  it('00:00 at today', function () {
    const time = '00:00'.at('today');
    assert(time instanceof Date, 'should be an instance of Date');
    assert(time.getTime() === new Date(new Date().toDateString() + ' 00:00').getTime(), 'time is wrong');
  });
  it('24:00 at today should be wrong', function () {
    try {
      '24:00'.at('today');
    } catch (err) {
      assert(err, 'should be wrong');
    }
  });
  it('12:60 at today should be wrong', function () {
    try {
      '12:60'.at('today');
    } catch (err) {
      assert(err, 'should be wrong');
    }
  });
  it('12:34:56.789 at today', function () {
    const time = '12:34:56.789'.at('today');
    assert(time instanceof Date, 'should be an instance of Date');
    assert(time.getTime() === new Date(new Date().toDateString() + ' 12:34:56.789').getTime(), 'time is wrong');
  })
});

describe('expire', function () {
  const now = new Date();
  it('should have expired', function () {
    assert(now.is.over('today'.beginning), 'not expired');
  });
  it('should not have expired', function () {
    assert(!now.is.over('today'.ending), 'already expired');
  });
  it('2 days after now is over tomorrow ending', function () {
    assert('2 days'.after(now).is.over('1 day'.after('today'.ending)), 'maybe not');
  });
});

describe('format', function () {
  it('format should be right', function () {
    const timeString = '2016-09-01 12:00:00';
    const time = new Date(timeString);
    assert(time.format('yyyy-MM-dd hh:mm:ss') === timeString, 'format is wrong');
  });
});

describe('transform', function () {
  it('24 * 3600 * 1000 ms is 1 day', function () {
    const ms = 24 * 3600 * 1000;
    const day = ms.msTo.day;
    assert(day === 1, 'it\'s wrong');
  });
  it('3600 * 1000 ms is 1 hour', function () {
    const ms = 3600 * 1000;
    const hour = ms.msTo.hour;
    assert(hour === 1, 'it\'s wrong');
  });
  it('60 * 1000 ms is 1 minute', function () {
    const ms = 60 * 1000;
    const min = ms.msTo.minute;
    assert(min === 1, 'it\'s wrong');
  });
  it('1000 ms is 1 second', function () {
    const ms = 1000;
    const sec = ms.msTo.second;
    assert(sec === 1, 'it\'s wrong');
  });
  it('1 year should be 365.25 day', function () {
    assert('1 year'.to.day === 365.25, 'Oh no!');
  });
  it('1 day should be 24 hour', function () {
    assert('1 day'.to.hour === 24, 'Oh no!');
  });
  it('1 hour should be 60 minutes', function () {
    assert('1 hour'.to.minute === 60, 'Oh no!');
  });
  it('1 minute should be 60 seconds', function () {
    assert('1 minute'.to.second === 60, 'Oh no!');
  });
  it('1 second should be 1000 milliseconds', function () {
    assert('1 second'.to.ms === 1000, 'Oh no!');
  });
});