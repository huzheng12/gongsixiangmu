import zh_CN from '../Language/zh_CN';
import en_US from '../Language/en_US.js';


const lang = function() {
    switch (localStorage.getItem('language')) {
        case 'en':
        return en_US;
        case 'zh':
        return zh_CN;
        default:
        return zh_CN;
    }
}

export default lang




// import lang from '@/utils/language';
