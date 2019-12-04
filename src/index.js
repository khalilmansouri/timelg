const ms = require('ms');

Object.defineProperties(String.prototype, {
  'beginning': {
    get: function () {
      const now = new Date();
      if (this.valueOf() === 'today') {
        return new Date([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
      }
    }
  },
  'ending': {
    get: function () {
      const now = new Date();
      if (this.valueOf() === 'today') {
        return new Date([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/') + ' 23:59:59.999');
      }
    }
  },
  'after': {
    get: function () {
      return base => {
        if (base && !(base instanceof Date)) throw new Error(`base should be an instance of Date or null, but got ${base}`);
        const offset = ms(this.valueOf());
        return new Date(base.getTime() + offset);
      }
    }
  },
  'before': {
    get: function () {
      return base => {
        if (base && !(base instanceof Date)) throw new Error(`base should be an instance of Date or null, but got ${base}`);
        const offset = ms(this.valueOf());
        return new Date(base.getTime() - offset);
      }
    }
  },
  'at': {
    get: function () {
      return base => {
        if (!/^(0?[0-9]|1[0-9]|2[0-3]):((0?[0-9])|[1-5][0-9])(:(0?[0-9]|[1-5][0-9])(\.[0-9]{1,3})?)?$/.test(this.valueOf())) {
          throw new Error(`time should be valid and like 00:00, 00:00:00, 00:00:00.000, but got ${this.valueOf()}`);
        }
        if (base === 'today') base = new Date();
        if (base && !(base instanceof Date)) throw new Error(`base should be an instance of Date or null, but got ${base}`);
        return new Date(`${[base.getFullYear(), base.getMonth() + 1, base.getDate()].join('/')} ${this.valueOf()}`);
      }
    }
  },
  'to': {
    get: function () {
      return {
        'day': ms(this).msTo.day,
        'hour': ms(this).msTo.hour,
        'minute': ms(this).msTo.minute,
        'second': ms(this).msTo.second,
        'ms': ms(this)
      }
    }
  }
});

Object.defineProperties(Date.prototype, {
  'is': {
    get: function () {
      return {
        over: expire => {
          if (expire && !(expire instanceof Date)) throw new Error(`base should be an instance of Date or null, but got ${expire}`);
          return this.getTime() > expire.getTime();
        }
      };
    }
  },
  'unix': {
    get: function () {
      return Math.round(this.getTime() / 1000)
    }
  },
  'beginning': {
    get: function () {
      return new Date([this.getFullYear(), this.getMonth() + 1, this.getDate()].join('/'));
    }
  },
  'ending': {
    get: function () {
      return new Date([this.getFullYear(), this.getMonth() + 1, this.getDate()].join('/') + ' 23:59:59.999');
    }
  },
  'format': {
    get: function () {
      return fmt => {
        const o = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          "S": this.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
    }
  }
});

Object.defineProperties(Number.prototype, {
  'msTo': {
    get: function () {
      return {
        'day': this / 24 / 36e5,
        'hour': this / 36e5,
        'minute': this / 6e4,
        'second': this / 1e3
      }
    }
  }
});