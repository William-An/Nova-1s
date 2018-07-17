// ==UserScript==
// @name         Nova +1s
// @namespace    https://github.com/William-An/Nova-1s
// @version      1.0.0
// @description  Build for auto Xu
// @author       WilliamMTK
// @include      https://*
// @match https://*
// @connect novalive.rip
// @run-at document-end
// @grant GM_xmlhttpRequest
// @grant GM_log
// @grant GM_setValue
// @grant GM_getValue
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
    xuOptions.url = 'https://novalive.rip/user/checkin';
    // OnError?
    xuOptions.onload = function(response){
        var r = JSON.parse(response.responseText);
        GM_setValue('lastXu', currentDate);
        alert(r.msg);
    };
    GM_xmlhttpRequest(xuOptions);
}

function login(){
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
    loginOptions.url = 'https://novalive.rip/auth/login';
    loginOptions.data = `email=${username}&passwd=${password}&code=`
    // OnError?
    loginOptions.onload = function(response){
        var r = response;
        var finalUrl = r.finalUrl;
        if(finalUrl != 'https://novalive.rip/user'){
            GM_log('Nova +1s: ', 'Unable to Xu, Please enter your credentials again or check your internet');
        }else{
            GM_setValue('lastLogin', currentDay-1);
            GM_setValue('loginFlag', true);
            GM_log('Nova +1s: ', 'Successfully Login!');
        }
    };
    GM_xmlhttpRequest(loginOptions);
}

(function() {
    'use strict';
    try{
        login();
        xu();
    }catch(err){
        GM_log(err);
    }
})();