// ==UserScript==
// @name         AADL3 Injector
// @namespace    https://aadl3inscription2024.dz/
// @version      0.4
// @description  Remplit automatiquement le formulaire avec des boutons pour chaque personne
// @author       Houssam 2024
// @match        https://aadl3inscription2024.dz/*
// @match        https://houham.netlify.app/aadl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aadl.com.dz
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    const bootstrapCDN = document.createElement('link');
    bootstrapCDN.rel = 'stylesheet';
    bootstrapCDN.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
    document.head.appendChild(bootstrapCDN)

    // Modifier ICI
    const people = [
        { name: 'Hamid', wilaya: '17', nin: '123456789012345678', nss: '1234567890123',num:'0330307070' }, //17 c alger c le 17ieme element dans la listeBox il faut ajouter 1 au num de la wilaya
        { name: 'fateh', wilaya: '19', nin: '987654321098765432', nss: '3210987654321',num:'0770707070' },
        { name: 'Houssam', wilaya: '6', nin: '987654321098765432', nss: '3210987654321',num:'0550507070'}, //6 c batna
        { name: 'haroun', wilaya: '2', nin: '987654321098765432', nss: '3210987654321',num:'0660607070' },
        // Ajoutez d'autres personnes ici
    ];

   function createButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'fixed';
        buttonContainer.style.top = '10px';
        buttonContainer.style.right = '10px';
        buttonContainer.style.zIndex = '1000';
        buttonContainer.style.backgroundColor = 'white';
        buttonContainer.style.padding = '10px';
        buttonContainer.style.border = '1px solid black';
        buttonContainer.classList.add('p-2', 'bg-light', 'border', 'rounded');

        people.forEach(person => {
            const button = document.createElement('button');
            button.textContent = person.name;
            button.classList.add('btn', 'btn-primary', 'btn-block', 'mb-2');
            button.addEventListener('click', () => fillForm(person));
            buttonContainer.appendChild(button);
        });

        document.body.appendChild(buttonContainer);
    }


    function fillForm(person) {

        waitForElement('#A17', function(element) {
            element.value = person.wilaya;
            element.dispatchEvent(new Event('change'));
        });

        waitForElement('#A22', function(element) {
            element.value = person.nin;
        });

        waitForElement('#A27', function(element) {
            element.value = person.nss;
        });
        waitForElement('#A13', function(element) {
            element.value = person.num;
        });
    }

    function waitForElement(selector, callback) {
        var element = document.querySelector(selector);
        if(element) {
            callback(element);
        } else {
            setTimeout(function() {
                waitForElement(selector, callback);
            }, 100);
        }
    }

    document.addEventListener('contextmenu', function(event) {
        event.stopPropagation();
    }, true);

    document.addEventListener('copy', function(event) {
        event.stopPropagation();
    }, true);

    document.addEventListener('cut', function(event) {
        event.stopPropagation();
    }, true);

    document.addEventListener('paste', function(event) {
        event.stopPropagation();
    }, true);

    window.addEventListener('load', createButtons);
})();
