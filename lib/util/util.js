/*
 * utility api
 * @module   util/util
 * @author   genify(caijf@corp.netease.com)
 */
var util = require('util');
/**
 * generator number between min and max
 * @param  {Number} min - min value, contain this value
 * @param  {Number} max - max value, not contain this value
 * @return {Number} random value
 */
exports.rand = function(min,max){
    return Math.floor(Math.random()*(max-min)+min);
};
/**
 * generator an increment number
 * @return {Number} increment number
 */
exports.increment = (function(){
    var seed = +new Date;
    return function(){
        return seed++;
    };
})();
/**
 * merge all object
 * @param  {Object} arg - object to be merged
 * @return {Object} union properties with all object
 */
exports.merge = function(){
    var ret = {},
        args = [].slice.call(arguments,0);
    args.forEach(function(item){
        var keys = Object.keys(item||{});
        keys.forEach(function(key){
            ret[key] = item[key];
        });
    });
    return ret;
};
/**
 * fetch value from config with template
 * @param  {Object} template - object template
 * @param  {Object} config   - value config
 * @return {Object} object after merge
 */
exports.fetch = function(template,config){
    config = config||{};
    template = template||{};
    var ret = {},
        keys = Object.keys(template);
    keys.forEach(function(key){
        var value = config[key];
        ret[key] = value==null?template[key]:value;
    });
    return ret;
};
/**
 * formatted time string
 * @param  {String} format - time format
 * @param  {Date}   time   - time object
 * @return {String} time string after formatted
 */
exports.getFormatTime = (function(){
    var _doFormat = function(number){
        if (number<10){
            return '0'+number;
        }
        return number;
    };
    var _doFormatMill = function(number){
        if (number<10){
            return '00'+number;
        }
        if (number<100){
            return '0'+number;
        }
        return number;
    }
    return function(format,time){
        time = time||new Date();
        return util.format(
            format,time.getFullYear(),
            _doFormat(time.getMonth()+1),
            _doFormat(time.getDate()),
            _doFormat(time.getHours()),
            _doFormat(time.getMinutes()),
            _doFormat(time.getSeconds()),
            _doFormatMill(time.getMilliseconds())
        );
    };
})();
/**
 * whether function parameter
 * @param  {Variable} func - function object
 * @return {Boolean}  whether function type
 */
exports.isFunction = function(func){
    return Object.prototype.toString.call(func).toLowerCase()=='[object function]';
};
/**
 * generate rand string
 * @param  {Number} length - string length
 * @return {String} rand string
 */
exports.randString = (function(){
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz ';
    return function(length){
        length = length||10;
        var ret = [];
        for(var i=0,it;i<length;++i){
            it = Math.floor(Math.random()*chars.length);
            ret.push(chars.charAt(it));
        }
        return ret.join('');
    };
})();