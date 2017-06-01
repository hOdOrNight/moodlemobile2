// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


var waitForCondition = require('./plugins/wait_for_transitions.js').waitForCondition;

var MM = {},
    currentNavBar = '.nav-bar-block[nav-bar="active"]',
    currentView = 'ion-view[nav-view="active"]';
var EC = protractor.ExpectedConditions;

/**
 * Finds and click on a target using text.
 *
 * We do not use by.linkText() because it does not find the elements not directly visible.
 *
 * @param  {String} text Text contained in the node.
 * @param  {Element} container The container in which the node should be found.
 * @return {Promise}
 */
MM.clickOn = function (text, container) {
    browser.sleep(10000).then(function() {
        var locator = by.xpath('(//a | //button | //*[contains(concat(" ",normalize-space(@class)," ")," item ")])[contains(.,"' + text + '") or contains(@aria-label,"' + text + '")]');

        if (container) {
            browser.wait(EC.presenceOf(container), 10000).then(function() {
                node = container.element(locator);
                return MM.clickOnElement(node);
            });
        } else {
            node = element(locator);
            return MM.clickOnElement(node);
        }

        //browser.wait(EC.elementToBeClickable(node), 10000).then(function() {
        
        //});
    });
};

/**
 * Click on a element.
 *
 * This will scroll the view if required. This is buggy, not scrolling after entire page is rendered
 *
 * @param  {Element} el
 * @return {Promise}
 */
MM.clickOnElement = function (el) {
    browser.sleep(2000);
    browser.wait(EC.presenceOf(el), 15000).then(function() {
        return browser.wait(EC.elementToBeClickable(el), 15000);
    }).then(function() {
        return browser.executeScript('arguments[0].scrollIntoView(true)', el.getWebElement());
    });

    return el.click();
};

/**
 * Go to bottom of page and Click on a element.
 *
 * This will scroll the view if required.
 *
 * @param  {Element} text
 * @return {Promise}
 */
MM.goToBottomAndClick = function (text) {
    browser.sleep(5000); // this is must, due to slow page rendering issues. Need to contact protractor team.
    var locator = by.xpath('(//a | //button | //*[contains(concat(" ",normalize-space(@class)," ")," item ")])[contains(.,"' + text + '") or contains(@aria-label,"' + text + '")]');
    browser.wait(EC.presenceOf(element(locator)), 5000).then(function() {
        return element(locator);
    }).then(function(node) {
        return browser.executeScript('arguments[0].scrollIntoView(false)', node.getWebElement());
    }).then(function() {
        return browser.wait(EC.elementToBeClickable(node), 15000);
    }).then(function() {
        return node.click();
    });
};

/**
 * Click on a link in the side menu.
 *
 * @param  {String} text The link name
 * @return {Promise}
 */
MM.clickOnInSideMenu = function (text) {
    var menuBtn = $(currentNavBar + ' [menu-toggle="left"]:not(.hide)');
    return browser.wait(EC.elementToBeClickable(menuBtn), 5000)
    .then(function () {
        var menu =  $('ion-side-menu[side="left"]');
        return browser.wait(EC.elementToBeClickable(menu), 5000);      
    }).then(function() {
        var menu =  $('ion-side-menu[side="left"]');
        return MM.clickOn(text, menu);
    });
};

/**
 * Return the active header bar.
 *
 * @return {Element}
 */
MM.getNavBar = function () {
    return $(currentNavBar);
};

/**
 * Return the active view.
 *
 * @return {Element}
 */
MM.getView = function () {
    waitForCondition();
    browser.wait(EC.visibilityOf($(currentView)), 20000)
    .then(function() {
        browser.sleep(3000); //for contents to render
        return $(currentView);
    });
};

/**
 * Navigate back.
 *
 * @return {Promise}
 */
MM.goBack = function () {
    var backBtn = $(currentNavBar + ' .back-button');
    waitForCondition();
    browser.wait(EC.visibilityOf(backBtn), 15000).then(function() {
        return backBtn.isPresent().then(function (present) {
            if (present) {
                return backBtn.isDisplayed().then(function (displayed) {
                    if (displayed) {
                        return backBtn.click();
                    }
                    throw new Error('Could not find back button.');
                });
            }
            throw new Error('Could not find the back button.');
        });
    });
};

/**
 * Login as a user.
 *
 * @param {String} username The login
 * @param {String} password The password
 * @return {Promise}
 */
MM.loginAs = function (username, password) {

    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.wait(EC.visibilityOf(element(by.model('siteurl'))), 15000);
    browser.sleep(5000);
    element(by.model('siteurl'))
        .sendKeys(SITEURL);
    browser.wait(EC.elementToBeClickable($('[ng-click="connect(siteurl)"]')), 15000);
    return $('[ng-click="connect(siteurl)"]').click()
            .then(function() {
            return browser.wait(EC.visibilityOf($('[ng-click="login()"]')), 15000);
            }).then(function() {
            element(by.model('credentials.username'))
                .sendKeys(username);
            element(by.model('credentials.password'))
                .sendKeys(password);
            return browser.sleep(5000);
            }).then(function() {
            return browser.wait(EC.elementToBeClickable($('[ng-click="login()"]')), 15000);
            }).then(function() {
                return $('[ng-click="login()"]').click();
            });

};

/**
 * Login as admin.
 *
 * @return {Promise}
 */
MM.loginAsAdmin = function () {
    return MM.loginAs(USERS.ADMIN.LOGIN, USERS.ADMIN.PASSWORD);
};

/**
 * Login as student.
 *
 * @return {Promise}
 */
MM.loginAsStudent = function () {
    return MM.loginAs(USERS.STUDENT.LOGIN, USERS.STUDENT.PASSWORD);
};


/**
 * Login as teacher.
 *
 * @return {Promise}
 */
MM.loginAsTeacher = function () {
    return MM.loginAs(USERS.TEACHER.LOGIN, USERS.TEACHER.PASSWORD);
};

/**
 * Logout (change site).
 *
 * @return {Promise}
 */
MM.logout = function () {
    return MM.clickOnInSideMenu('Change site');
};

/**
 * Open the side menu from anywhere.
 *
 * @return {Promise}
 */
MM.openSideMenu = function () {
    var menuBtn = $(currentNavBar + ' [menu-toggle="left"]:not(.hide)');
    
    

    function navigateBack() {
        return MM.goBack().then(function () {
            return openMenu();
        });
    }

    function openMenu() {
        return menuBtn.isPresent().then(function (present) {
            if (present) {
                return menuBtn.isDisplayed().then(function (displayed) {
                    if (displayed) {
                        return menuBtn.click();
                    }
                    return navigateBack();
                });
            }
            return navigateBack();
        });
    }
    //browser.wait(EC.elementToBeClickable(menuBtn), 15000).then(function() {
    browser.sleep(10000).then(function() {
        return openMenu();
    });
    
    //});
};

global.MM = global.MM || MM;
