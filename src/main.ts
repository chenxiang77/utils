
let isLockClick = false;

// 生成从minNum到maxNum的随机整数
export function randomNum(minNum: number, maxNum: number): number {
  return parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10);
}

// 判断是否为url地址
export function isUrl(str: string): boolean {
  if (!str) return false;
  const matcher = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
  return matcher.test(str);
}

// 使用 preload 预加载图片
export function preloadImage(href: string) {
  const isClient = typeof window !== 'undefined';
  if (!isClient) return;
  if (!href) return;
  if (!isUrl(href)) return;
  document.head.appendChild({
    ...document.createElement('link'),
    ...{ rel: 'preload', as: 'image', href },
  });
}

// 使用 preload 预加载视频
export function preloadVideo(href: string) {
  const isClient = typeof window !== 'undefined';
  if (!isClient) return;
  if (!href) return;
  if (!isUrl(href)) return;
  document.head.appendChild({
    ...document.createElement('link'),
    ...{ rel: 'prefetch', as: 'media', href },
  });
}

/**
 * @param {Date/Number} [ops] date to format, support Date or timestamp
 * @param {String} [format] 格式
 * @return {String} 格式化后的字符串
 * @example
 * formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")
 * formatDate(new Date().setHours(0,0,0,0),"yyyy-MM-dd hh:mm:ss")
 *
 */
export function formatDate(ops: any, format = 'yyyy-MM-dd hh:mm'): string {
  let obj = ops;
  let formatStr: string = format;
  if (/ios|ipad|iphone|Macintosh/gi.test(navigator.userAgent) && typeof obj === 'string') {
    obj = (obj || '').replace(/-/g, '/');
  }

  // 判断是否为今天
  formatStr = new Date(obj).toLocaleDateString() === new Date().toLocaleDateString() ? 'hh:mm' : formatStr;

  let date = obj || new Date();
  if (obj && obj.toString !== '[object Date]') {
    if (isNaN(obj)) {
      date = new Date(obj);
    } else {
      date = new Date();
      date.setTime(obj);
    }
    if (date.toDateString() === 'Invalid Date') {
      date = new Date();
    }
  }

  const o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
  };
  if (/(y+)/.test(formatStr)) {
    formatStr = formatStr.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length));
    }
  }
  return formatStr;
}

/**
 * 延时
 * @param millsecond 延时时间 单位毫秒
 */
export async function delay(millsecond: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, millsecond);
  });
}

/**
 * 防重复点击问题
 * @param fn
 */
export async function lock(fn: () => void) {
  let ret: any;
  if (!isLockClick) {
    isLockClick = true;
    try {
      ret = await fn();
    } catch (e) {
      console.warn('click lock error', e);
    } finally {
      // eslint-disable-next-line require-atomic-updates
      isLockClick = false;
    }
  }
  return ret;
}

/**
 * 邮箱是否合法
 * @param email 邮箱
 */
export function isValidEmail(email: string): boolean {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email);
}

// 复制到剪贴板
function save(e: any, str: string, cb: () => void) {
  e.clipboardData.setData('text/plain', str);
  e.preventDefault();
  cb();
}
export const copy2clipboard = (str: string, cb: () => void) => {
  document.addEventListener('copy', e => save(e, str, cb), {
    once: true,
  });
  document.execCommand('copy');
};

/**
 * 格式化数字小于9则前面补充0
 * @param num 
 */
export function zeroFormat(num: string | number): string {
  if (typeof num === 'string') { num = parseFloat(num); }
  return num > 9 ? String(num) : `0${String(num)}`;
}