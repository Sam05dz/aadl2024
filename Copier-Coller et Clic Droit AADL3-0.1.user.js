// ==UserScript==
// @name         Copier-Coller et Clic Droit AADL3
// @namespace    https://aadl.com.dz/
// @version      0.1
// @description  Activer copier-coller et clic droit sur le site AADL
// @author       Houssam
// @match        *://aadl3inscription2024.dz/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aadl.com.dz
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('contextmenu', function(e) {
        e.stopPropagation();
    }, true);

    document.addEventListener('copy', function(e) {
        e.stopPropagation();
    }, true);

    document.addEventListener('cut', function(e) {
        e.stopPropagation();
    }, true);

    document.addEventListener('paste', function(e) {
        e.stopPropagation();
    }, true);

    document.addEventListener('selectstart', function(e) {
        e.stopPropagation();
    }, true);

    var styles = [
        'user-select',
        'pointer-events',
        'webkit-user-select',
        'moz-user-select',
        'ms-user-select'
    ];

    function enableSelectAndCopy(node) {
        for (var i = 0; i < styles.length; i++) {
            node.style[styles[i]] = 'auto';
        }
    }

    function walkNodes(node) {
        enableSelectAndCopy(node);
        for (var child = node.firstChild; child; child = child.nextSibling) {
            walkNodes(child);
        }
    }

    walkNodes(document.body);
})();
