import {Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class UtilService {



    // USER_TYPE = 'USER_TYPE';
    // constructor() {
    // }

    // USER_PROFILE = "USER_PROFILE";
    // USER_LOGIN = "USER_LOGIN";
    // DEVICE_TOKEN = "DEVICE_TOKEN";
    // ON_BOARDING = "ON_BOARDING";

    // DEFAULT_IMAGE = 'assets/img/default_profile.png';
    // DEFAULT_BANNER = 'assets/img/default_banner.png';
    // ASTRO_STATUS = 'ASTRO_STATUS';


    // printObj(obj) {
    //     console.log('obj:-' + JSON.stringify(obj));
    // }

    // isUserLoggedIn() {
    //     if (this.getItem(this.USER_LOGIN) != null && this.getItem(this.USER_LOGIN) != undefined && this.getItem(this.USER_LOGIN) == '1') {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // getAstroStatus() {
    //     if (this.getItem(this.ASTRO_STATUS) != null && this.getItem(this.ASTRO_STATUS) != undefined) {
    //         if (this.getItem(this.ASTRO_STATUS) == '1') {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     } else {
    //         return true;
    //     }
    // }

    // getUserProfile() {
    //     if (this.getItem(this.USER_PROFILE) != null && this.getItem(this.USER_PROFILE) != undefined && this.getItem(this.USER_PROFILE) != '' && this.getItem(this.USER_PROFILE) != 'null') {
    //         let profile = JSON.parse(this.getItem(this.USER_PROFILE));
    //         return profile;
    //     } else {
    //         return null;
    //     }
    // }

    // getUserID() {
    //     if (this.getItem(this.USER_PROFILE) != null && this.getItem(this.USER_PROFILE) != undefined && this.getItem(this.USER_PROFILE) != '' && this.getItem(this.USER_PROFILE) != 'null') {
    //         let profile = JSON.parse(this.getItem(this.USER_PROFILE));
    //         return profile.id;
    //     } else {
    //         return "";
    //     }
    // }

    // getUserEmail() {
    //     if (this.getItem(this.USER_PROFILE) != null && this.getItem(this.USER_PROFILE) != undefined && this.getItem(this.USER_PROFILE) != '' && this.getItem(this.USER_PROFILE) != 'null') {
    //         let profile = JSON.parse(this.getItem(this.USER_PROFILE));
    //         return profile.email;
    //     } else {
    //         return "";
    //     }
    // }


    // getItem(key) {
    //     return window.sessionStorage.getItem("ASTRO_DASH_" + key);
    // }

    // setItem(key, value) {
    //     window.sessionStorage.setItem("ASTRO_DASH_" + key, value);
    // }

    // clearALLData() {
    //     window.localStorage.clear();
    // }

    // getTimerTimeLeft(millis) {
    //     // let secs = time / 1000;
    //     // let timeleft = (secs / 60) + ':' + (secs % 60);
    //     // return timeleft;
    //     var minutes = Math.floor(millis / 60000);
    //     var seconds = ((millis % 60000) / 1000).toFixed(0);
    //     return ((Number(minutes) < 10) ? '0' : '') + minutes + ':' + ((Number(seconds) < 10) ? '0' : '') + seconds;
    // }

    // checkValue(value) {
    //     if (value != null && value != undefined && value != '') {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // secondsToHms(d) {
    //     if (d == null || d == undefined || d == 0) {
    //         return "0 sec";
    //     }
    //     d = Number(d);
    //     var h = Math.floor(d / 3600);
    //     var m = Math.floor(d % 3600 / 60);
    //     var s = Math.floor(d % 3600 % 60);
    //     let time = '';
    //     if (h > 0) {
    //         time += h + "hr ";
    //     }
    //     if (m > 0) {
    //         time += m + "min ";
    //     }
    //     if (s > 0) {
    //         time += s + "sec";
    //     }

    //     return time;
    // }

    // validateEmail(email) {
    //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    //         return true
    //     }
    //     return false
    // }

    // getCallStatus(status) {
    //     if (status == null) {
    //         return "Declined"
    //     }
    //     switch (status) {
    //         case 0:
    //             return "In Progress";
    //         case 1:
    //             return "Busy";
    //         case 2:
    //             return "No Answer";
    //         case 3:
    //             return "Cancelled";
    //         case 4:
    //             return "Failed";
    //         case 5:
    //             return "Completed";
    //     }
    // }

    // getChatStatus(status) {
    //     console.log("status:",status);
        
    //     switch (status) {
    //         case null:
    //             return "Declined";
    //         case 0:
    //             return "In Progress";
    //         case 1:
    //             return "Accepted";
    //         case 2:
    //             return "Ended";
    //         case 3:
    //             return "Declined";
    //     }
    // }

    // hms(d) {
    //     // console.log(d);
    //     d = Number(d);
    //     var h = Math.floor(d / 3600);
    //     var m = Math.floor(d % 3600 / 60);
    //     var s = Math.floor(d % 3600 % 60);

    //     return this.properFormatNumber(h) + ":" + this.properFormatNumber(m) + ":" + this.properFormatNumber(s);
    // }

    // properFormatNumber(number: number): string {
    //     let numString = '';
    //     if (number < 10) {
    //         numString = '0' + number;
    //     } else {
    //         numString = number + '';
    //     }
    //     return numString;
    // }

    // calc(num, fixed) {
    //     var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    //     return num.toString().match(re)[0];
    // }









    constructor( private apiService : ApiService) {
    }

    USER_PROFILE = 'USER_PROFILE';
    USER_LOGIN = 'USER_LOGIN';
    COGNITO_PROFILE = 'COGNITO_PROFILE';
    SEND_CONFIRMATION = 'SEND_CONFIRMATION';
    SIGNUP_USER_TYPE = 'SIGNUP_USER_TYPE';

    USER_EMAIL = 'USER_EMAIL';
    USER_PASSWORD = 'USER_PASSWORD';

    DEFAULT_IMAGE = 'assets/img/default.jpeg';

    USER_TYPE = 'USER_TYPE';


    printObj(obj) {
        console.log('obj:-' + JSON.stringify(obj));
    }

    setItem(key, value) {
        // window.localStorage.setItem("GS11ADMIN_" + key, value);
        window.sessionStorage.setItem('PW_' + key, value);
    }

    getItem(key) {
        // return window.localStorage.getItem("GS11ADMIN_" + key);
        return window.sessionStorage.getItem('PW_' + key);
    }

    setSessionItem(key, value) {
        window.sessionStorage.setItem(key, value);
    }

    getTimeLeftByTimeStamp(timeStamp) {
        const today = new Date();
        const endDate = new Date(timeStamp * 1000);
        endDate.setMinutes(endDate.getMinutes() + 330);
        // console.log(endDate)
        if (endDate.getTime() < today.getTime()) {
            return '';
        } else {
            const days = parseInt(String((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
            const hours = parseInt(String(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60 * 60) % 24));
            const minutes = parseInt(String(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60) % 60));
            const seconds = parseInt(String(Math.abs(endDate.getTime() - today.getTime()) / (1000) % 60));
            if (days != 0) {
                return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
            } else {
                if (hours != 0) {
                    return hours + 'h ' + minutes + 'm ';
                } else {
                    return minutes + 'm ' + seconds + 's';
                }
            }
        }
    }

    replaceApostrophe = (str) => {
        str = str + '';
        return str.replace(/'/g, '\\\'');
    }

    getDateTimeByTime(time): any {
        if (time == null) {
            return '';
        }
        var d = new Date(time);

        let date = this.properFormatNumber(d.getDate());
        let month = this.properFormatNumber(d.getMonth() + 1);
        let year = d.getFullYear();

        let hour = this.properFormatNumber(d.getHours());
        let min = this.properFormatNumber(d.getMinutes());
        let sec = this.properFormatNumber(d.getSeconds());

        // let finalDate = this.getDayName(day) + ' ' + date + ' ' + this.getMonthName(month) + ',' + year + ' at ' + hour + ':' + min + ':' + sec;
        // let finalDate = date + ' ' + this.getMonthName(month) + ',' + year + ' at ' + hour + ':' + min + ':' + sec;
        // let finalDate = date + ' ' + this.getMonthName(month) + ',' + year + ' at ' + hour + ':' + min;
        let finalDate = date + '/' + month + '/' + year + ' ' + hour + ':' + min;

        // let finalDate = year + '-' + month + '-' + date;
        return finalDate;
    }

    getISTDateTimeByTime(time): any {
        if (time == null) {
            return '';
        }
        var d = new Date(time);

        d.setMinutes(d.getMinutes() + 330);

        let date = this.properFormatNumber(d.getDate());
        let month = this.properFormatNumber(d.getMonth() + 1);
        let year = d.getFullYear();

        let hour = this.properFormatNumber(d.getHours());
        let min = this.properFormatNumber(d.getMinutes());
        let sec = this.properFormatNumber(d.getSeconds());

        // let finalDate = this.getDayName(day) + ' ' + date + ' ' + this.getMonthName(month) + ',' + year + ' at ' + hour + ':' + min + ':' + sec;
        // let finalDate = date + ' ' + this.getMonthName(month) + ',' + year + ' at ' + hour + ':' + min + ':' + sec;
        // let finalDate = date + ' ' + this.getMonthName(month) + ',' + year + ' at ' + hour + ':' + min;
        let finalDate = date + '/' + month + '/' + year + ' ' + hour + ':' + min;

        // let finalDate = year + '-' + month + '-' + date;
        return finalDate;
    }

    getDifferenceInHours(date1: Date, date2: Date) {
        return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60);
    }

    getDiffere(date1: Date, date2: Date) {
        return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60);
    }

    checkValue(value) {
        if (value != null && value != undefined) {
            return true;
        } else {
            return false;
        }
    }

    getMonthName(month) {
        switch (month) {
            case '01':
                return 'Jaunurary';
            case '02':
                return 'February';
            case '03':
                return 'March';
            case '04':
                return 'April';
            case '05':
                return 'May';
            case '06':
                return 'June';
            case '07':
                return 'July';
            case '08':
                return 'August';
            case '09':
                return 'September';
            case '10':
                return 'October';
            case '11':
                return 'November';
            case '12':
                return 'December';
        }
        return 'Janurary';
    }

    properFormatNumber(number: number): string {
        let numString = '';
        if (number < 10) {
            numString = '0' + number;
        } else {
            numString = number + '';
        }
        return numString;
    }

    tConvert(time) {
        var timeString = time;
        var H = +timeString.substr(0, 2);
        var h = H % 12 || 12;
        var ampm = (H < 12 || H === 24) ? 'AM' : 'PM';
        timeString = h + timeString.substr(2, 3) + ampm;

        return timeString;
    }

    getUserID() {
        if (this.getItem(this.USER_PROFILE) != null && this.getItem(this.USER_PROFILE) != undefined && this.getItem(this.USER_PROFILE) != '' && this.getItem(this.USER_PROFILE) != 'null') {
            let profile = JSON.parse(this.getItem(this.USER_PROFILE));
            return profile.id;
        } else {
            return '';
        }
    }

    getFixed2Charges(charge: number) {
        try {
            let value = charge.toFixed(2);
            return value;
        } catch (e) {
            return charge.toFixed(2);
        }
    }

    getUserProfile() {
        if (this.getItem(this.USER_PROFILE) != null && this.getItem(this.USER_PROFILE) != undefined && this.getItem(this.USER_PROFILE) != '' && this.getItem(this.USER_PROFILE) != 'null') {
            let profile = JSON.parse(this.getItem(this.USER_PROFILE));
            return profile;
        } else {
            return null;
        }
    }

    getTimerTimeLeft(millis) {
        // let secs = time / 1000;
        // let timeleft = (secs / 60) + ':' + (secs % 60);
        // return timeleft;
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return ((Number(minutes) < 10) ? '0' : '') + minutes + ':' + ((Number(seconds) < 10) ? '0' : '') + seconds;
    }

    getUserEmail() {
        if (this.getItem(this.USER_PROFILE) != null && this.getItem(this.USER_PROFILE) != undefined && this.getItem(this.USER_PROFILE) != '' && this.getItem(this.USER_PROFILE) != 'null') {
            let profile = JSON.parse(this.getItem(this.USER_PROFILE));
            return profile.email;
        } else {
            return '';
        }
    }

    getUserType() {
        if (this.getItem(this.USER_PROFILE) != null && this.getItem(this.USER_PROFILE) != undefined && this.getItem(this.USER_PROFILE) != '' && this.getItem(this.USER_PROFILE) != 'null') {
            let profile = JSON.parse(this.getItem(this.USER_PROFILE));
            return profile.type;
        } else {
            return '';
        }
    }

    isUserLoggedIn() {
        if (this.getItem(this.USER_LOGIN) == '1') {
            return true;
        } else {
            return false;
        }
    }

    clearALLData() {
        window.localStorage.clear();
    }

    printKeyValuePairs(url: string, postdata) {
        console.log('url:-' + url);
        console.log('--------------FORM DATA---------------');
        let data = '';
        postdata.forEach((value, key) => {
            // console.log(key + ':' + value)
            data += key + ':' + value + '\n';
        });
        console.log(data);
        console.log('--------------FORM DATA---------------');
    }

    printUrlPostData(url: string, postdata) {
        console.log('url:-' + url);
        console.log('postData:-' + JSON.stringify(postdata, null, 4));

    }

    validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        }
        return false
    }

    calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    toRad(Value) {
        return Value * Math.PI / 180;
    }

    private subject = new Subject<any>();

    sendClickEvent() {
        this.subject.next('any');
    }

    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    sharedData: string;

    getTodayDate(): any {
        var d = new Date();

        let date = this.properFormatNumber(d.getDate());
        let month = this.properFormatNumber(d.getMonth() + 1);
        let year = d.getFullYear();

        let finalDate = year + '-' + month + '-' + date;
        // let finalDate = '2021-11-08';

        return finalDate;
    }

    getDateInHMS(startingDate) {
        const today = new Date();
        const endDate = new Date(startingDate);
        if (endDate.getTime() < today.getTime()) {
            return '';
        } else {
            const days = parseInt(String((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
            const hours = parseInt(String(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60 * 60) % 24));
            const minutes = parseInt(String(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60) % 60));
            const seconds = parseInt(String(Math.abs(endDate.getTime() - today.getTime()) / (1000) % 60));
            if (days != 0) {
                return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
            } else {
                return hours + 'h ' + minutes + 'm ' + seconds + 's';
            }
        }
    }

    secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay;
    }

    secToHms(d) {
        if (d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);

            var hDisplay = h > 0 ? h + (h == 1 ? 'h ' : 'h ') : '';
            var mDisplay = m > 0 ? m + (m == 1 ? 'm ' : 'm ') : '';
            var sDisplay = s > 0 ? s + (s == 1 ? 's' : 's') : '';
            return hDisplay + mDisplay + sDisplay;
        } else {
            return "-"
        }
    }

    getSecsToMins(secs) {
        return (secs / 60).toFixed(0)
    }

    differenceBetweenTwoDates(dt1) {
        const date1 = new Date(dt1);
        const date2 = new Date();
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // console.log(diffTime + ' milliseconds');
        // console.log(diffDays + ' days');

        return diffDays;
    }

    trimWS(str) {
        return str.trim().replace(/\s+/g, ' ');
    }

    getDifferenceInMins(date1, date2) {
        if (date1 != null && date2 != null && date1 != '' && date2 != '') {
            var startTime = new Date(date1);
            var endTime = new Date(date2);
            var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            var resultInMinutes = Math.round(difference / 60000);
            return resultInMinutes + " mins";
        } else {
            return '';
        }
    }

    getNumberInTwoDecimal(value) {
        if (value == 0) {
            return "0.00";
        }
        value = value.toFixed(2);
        return value;
    }

    getItemIndexName(index) {
        switch (index) {
            case 1:
                return "First Item";
            case 2:
                return "Second Item";
            case 3:
                return "Third Item";
            case 4:
                return "Fourth Item";
            case 5:
                return "Fifth Item";
            case 6:
                return "Sixth Item";
            case 7:
                return "Seventh Item";
            case 8:
                return "Eighth Item";
            case 9:
                return "Nineth Item";
            case 10:
                return "Tenth Item";
            case 11:
                return "Eleven Item";
            case 12:
                return "Twelve Item";
            case 13:
                return "Thirteen Item";
            case 14:
                return "Fourteen Item";
            case 15:
                return "Fifteen Item";
            case 16:
                return "Sixteen Item";
            case 17:
                return "Seventeen Item";
            case 18:
                return "Eighteen Item";
            case 19:
                return "nineteen Item";
            case 20:
                return "Twenty Item";
        }
    }

    getBannerCDNImage(imageId) {
        return 'https://imagedelivery.net/chq6mcQ8M-TUrRoP1IIiIA/' + imageId + '/xl';
    }

    getFilenameFromUrl(url) {
        const pathname = new URL(url).pathname;
        const index = pathname.lastIndexOf('/');
        return pathname.substring(index + 1) // if index === -1 then index+1 will be 0
    }

}
