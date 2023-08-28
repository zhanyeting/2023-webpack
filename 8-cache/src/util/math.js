export function add (x, y) {
    return x + y;
}

export function minus(x, y) {
    return x - y; 
}

export function print (x, y) {
    return `${x} + ${y} = ${add(x, y)}`
}

export function RGBToHex(rgb) {
    var regexp = /[0-9]{0,3}/g;
    var re = rgb.match(regexp); //利用正则表达式去掉多余的部分，将rgb中的数字提取
    var hexColor = '#';
    var hex = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ];
    for (var i = 0; i < re.length; i++) {
        var r = null,
            c = re[i],
            l = c
        var hexAr = []
        while (c > 16) {
            r = c % 16
            c = (c / 16) >> 0
            hexAr.push(hex[r])
        }
        hexAr.push(hex[c])
        if (l < 16 && l != '') {
            hexAr.push(0)
        }
        hexColor += hexAr.reverse().join('')
    }
    //alert(hexColor)
    return hexColor
 }
 // RGBToHex('rgb(227, 62, 51)')    //"#E33E33"

 /*
*16进制颜色转为RGB格式 
*直接定义在String.prototype属性上
*/
export function HexToRgb ( sColor ) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#'
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor
                    .slice(i, i + 1)
                    .concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        //处理六位的颜色值
        var sColorChange = []
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        return 'rgb(' + sColorChange.join(', ') + ')'
    } else {
        return sColor
    }
}

//HexToRgb("#FFF")   // "rgb(255, 255, 255)"


 export function uuid() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;    // d是随机种子
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

/*
    指定长度和基数
*/
export function uuid3(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

export function formatDateTime() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return y + m + d + h + minute + second;
}


export function add2 (x, y) {
    return x + y;
}

export function minus2(x, y) {
    return x - y; 
}

export function print2 (x, y) {
    return `${x} + ${y} = ${add(x, y)}`
}

export function RGBToHex2(rgb) {
    var regexp = /[0-9]{0,3}/g;
    var re = rgb.match(regexp); //利用正则表达式去掉多余的部分，将rgb中的数字提取
    var hexColor = '#';
    var hex = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ];
    for (var i = 0; i < re.length; i++) {
        var r = null,
            c = re[i],
            l = c
        var hexAr = []
        while (c > 16) {
            r = c % 16
            c = (c / 16) >> 0
            hexAr.push(hex[r])
        }
        hexAr.push(hex[c])
        if (l < 16 && l != '') {
            hexAr.push(0)
        }
        hexColor += hexAr.reverse().join('')
    }
    //alert(hexColor)
    return hexColor
 }
 // RGBToHex('rgb(227, 62, 51)')    //"#E33E33"

 /*
*16进制颜色转为RGB格式 
*直接定义在String.prototype属性上
*/
export function HexToRgb2 ( sColor ) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#'
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor
                    .slice(i, i + 1)
                    .concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        //处理六位的颜色值
        var sColorChange = []
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        return 'rgb(' + sColorChange.join(', ') + ')'
    } else {
        return sColor
    }
}

//HexToRgb("#FFF")   // "rgb(255, 255, 255)"


 export function uuid2() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;    // d是随机种子
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

/*
    指定长度和基数
*/
export function uuid32(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

export function formatDateTime2() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return y + m + d + h + minute + second;
}


export function add3 (x, y) {
    return x + y;
}

export function minus3(x, y) {
    return x - y; 
}

export function print3 (x, y) {
    return `${x} + ${y} = ${add(x, y)}`
}

export function RGBToHex3(rgb) {
    var regexp = /[0-9]{0,3}/g;
    var re = rgb.match(regexp); //利用正则表达式去掉多余的部分，将rgb中的数字提取
    var hexColor = '#';
    var hex = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ];
    for (var i = 0; i < re.length; i++) {
        var r = null,
            c = re[i],
            l = c
        var hexAr = []
        while (c > 16) {
            r = c % 16
            c = (c / 16) >> 0
            hexAr.push(hex[r])
        }
        hexAr.push(hex[c])
        if (l < 16 && l != '') {
            hexAr.push(0)
        }
        hexColor += hexAr.reverse().join('')
    }
    //alert(hexColor)
    return hexColor
 }
 // RGBToHex('rgb(227, 62, 51)')    //"#E33E33"

 /*
*16进制颜色转为RGB格式 
*直接定义在String.prototype属性上
*/
export function HexToRgb3 ( sColor ) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#'
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor
                    .slice(i, i + 1)
                    .concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        //处理六位的颜色值
        var sColorChange = []
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        return 'rgb(' + sColorChange.join(', ') + ')'
    } else {
        return sColor
    }
}

//HexToRgb("#FFF")   // "rgb(255, 255, 255)"


 export function uuid33() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;    // d是随机种子
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

/*
    指定长度和基数
*/
export function uuid333(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

export function formatDateTime3() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return y + m + d + h + minute + second;
}