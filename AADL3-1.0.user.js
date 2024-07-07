// ==UserScript==
// @name         AADL3
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  AADL3 INscription
// @author       Houssam
// @match        https://aadl3inscription2024.dz/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const wilayaValue = '05';
    const nidValue = '123123123123123';//nin
    const nssValue = '121212121212'; //ss
    const phoneValue = '0555555555'; //mobile

    let retryInterval = 5000;
    const maxRetryInterval = 60000;
    let attempt = 0;

    function waitForElement(selector, callback) {
        var element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else {
            setTimeout(function() {
                waitForElement(selector, callback);
            }, 500);
        }
    }

    function fillAndSubmitForm() {
        waitForElement('select[name="wilaya"]', function(wilaya) {
            waitForElement('input[name="nid"]', function(nid) {
                waitForElement('input[name="nss"]', function(nss) {
                    waitForElement('input[name="phone"]', function(phone) {
                        waitForElement('button[type="submit"]', function(submitButton) {

                            wilaya.value = wilayaValue;
                            nid.value = nidValue;
                            nss.value = nssValue;
                            phone.value = phoneValue;

                            if (wilaya.value && nid.value && nss.value && phone.value) {
                                console.log('Formulaire rempli correctement. Soumission...');
                                submitButton.click();
                                attempt = 0;
                            } else {
                                console.error('Tous les champs ne sont pas correctement remplis.');
                            }
                        });
                    });
                });
            });
        });
    }

    function retrySubmission() {
        if (attempt > 0) {
            retryInterval = Math.min(maxRetryInterval, retryInterval * 2);
        }
        setTimeout(fillAndSubmitForm, retryInterval);
        attempt++;
    }

    setInterval(retrySubmission, retryInterval);

    window.addEventListener('load', function() {
        fillAndSubmitForm();
    }, false);
})();