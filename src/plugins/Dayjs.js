import Vue from 'vue';
import dayjs from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween')
var relativeTime = require('dayjs/plugin/relativeTime')

require('dayjs/locale/fr')
dayjs.extend(isBetween)
dayjs.extend(relativeTime)

dayjs.locale('fr')
Object.defineProperties(Vue.prototype, {
    $date: {
        get() {
            return dayjs
        }
    }
});