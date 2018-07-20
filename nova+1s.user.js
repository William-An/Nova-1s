// ==UserScript==
// @name         Nova +1s
// @namespace    https://github.com/William-An/Nova-1s
// @version      1.0.4
// @description  Build for auto Xu
// @author       WilliamMTK
// @updateURL    https://github.com/William-An/Nova-1s/raw/master/nova%2B1s.user.js
// @downloadURL  https://github.com/William-An/Nova-1s/raw/master/nova%2B1s.user.js
// @supportURL   https://github.com/William-An/Nova-1s/issues
// @include      https://*
// @match https://*
// @connect xn--gfw-l68djrna64ei8mgrx0peuw7arpqnu1bi48d.xn--mmp-p18dn3y51wo4hc35ejee.com
// @run-at document-end
// @grant GM_xmlhttpRequest
// @grant GM_log
// @grant GM_setValue
// @grant GM_getValue
// @note Remove Auth Module
// ==/UserScript==

function xu(){
    GM_log('Nova +1s: ','+1s begins');
    var lastDate = GM_getValue('lastXu', (new Date()).getDate()-1); // Users use this script at least once a month
    var currentDate = (new Date()).getDate();
    GM_log('Nova +1s: ', 'Last +1s: ', lastDate);
    GM_log('Nova +1s: ', 'Current Date: ', currentDate);
    if(currentDate == lastDate){
        GM_log('Nova +1s: ', 'You cannot Xu right now');
        return;
    }
    var xuOptions = {};
    xuOptions.method = 'POST';
    xuOptions.url = 'https://xn--gfw-l68djrna64ei8mgrx0peuw7arpqnu1bi48d.xn--mmp-p18dn3y51wo4hc35ejee.com/user/checkin';
    // OnError?
    xuOptions.onload = function(response){
        var r = JSON.parse(response.responseText);
        GM_setValue('lastXu', currentDate);
        alert(r.msg);
    };
    GM_xmlhttpRequest(xuOptions);
}

/*function login(){
    GM_log('Nova +1s: ', 'Login begins');
    var lastDay = GM_getValue('lastLogin', (new Date()).getDay());
    var currentDay = (new Date()).getDay();
    GM_log('Nova +1s: ', 'Last Login: ', lastDay);
    GM_log('Nova +1s: ', 'Current Login: ', currentDay);
    if(currentDay != lastDay){
        GM_log('Nova +1s: ', 'You don\'t need to login right now');
        return;
    }
    var loginOptions = {};
    var username = GM_getValue('username', null);
    var password = GM_getValue('password', null);
    var loginFlag = GM_getValue('loginFlag', false);
    if (loginFlag === false||username === null || password === null){
        username = prompt('Please enter your Nova username for auto login', username);
        GM_setValue('username', username);
        password = prompt('Please enter your Nova password for auto login', password);
        GM_setValue('password', password);
    }
    loginOptions.method = 'POST';
    loginOptions.headers = {
        Accept: 'application/json, text/javascript, *//*; q=0.01',
        Referer: 'https://xn--gfw-l68djrna64ei8mgrx0peuw7arpqnu1bi48d.xn--mmp-p18dn3y51wo4hc35ejee.com/auth/login'
    }
    loginOptions.url = 'https://xn--gfw-l68djrna64ei8mgrx0peuw7arpqnu1bi48d.xn--mmp-p18dn3y51wo4hc35ejee.com/auth/login';
    loginOptions.data = `email=${username}&passwd=${password}&code=&remember_me=week`;
    // OnError?
    loginOptions.onload = function(response){
        var r = response;
        GM_log(r);
        var finalUrl = r.finalUrl;
        if(finalUrl != 'https://xn--gfw-l68djrna64ei8mgrx0peuw7arpqnu1bi48d.xn--mmp-p18dn3y51wo4hc35ejee.com/user'){
            GM_log('Nova +1s: ', 'Unable to Xu, Please enter your credentials again or check your internet');
        }else{
            GM_setValue('lastLogin', currentDay-1);
            GM_setValue('loginFlag', true);
            GM_log('Nova +1s: ', 'Successfully Login!');
        }
    };
    GM_xmlhttpRequest(loginOptions);
}*/

(function() {
    'use strict';
    try{
        // login();
        xu();
    }catch(err){
        GM_log(err);
    }
})();