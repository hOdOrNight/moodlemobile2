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

describe('User can manage course assign', function () {

    it('View course assign windows', function (done) {
        return MM.loginAsStudent().then(function () {
            return MM.clickOnInSideMenu('My courses');
        }).then(function () {
            return MM.clickOn('Psychology in Cinema');
        }).then(function () {
            return MM.clickOn('Analysis');
        }).then(function () {
            return MM.clickOn('From Concept to Reality: Trauma and Film');
        }).then(function () {
            expect(MM.getView().getText()).toMatch('The screening of trauma transcends the narrative');
        }).then(function () {
            done();
        });
    });

    it('Click description tab', function (done) {
        return MM.loginAsStudent().then(function () {
            return MM.clickOnInSideMenu('My courses');
        }).then(function () {
            return MM.clickOn('Psychology in Cinema');
        }).then(function () {
            return MM.clickOn('Analysis');
        }).then(function () {
            return MM.clickOn('From Concept to Reality: Trauma and Film');
        }).then(function () {
            return MM.clickOn('The screening of trauma transcends the narrative');
        }).then(function () {
            expect(MM.getView().getText()).toMatch('The screening of trauma transcends the narrative');
        }).then(function () {
            return MM.goBack();
        }).then(function () {
            done();
        });
    });

    // No PDF reader available for SauceLabs emulators right now
    it('Click PDF file tab', function (done) {
        return MM.loginAsStudent().then(function () {
            return MM.clickOnInSideMenu('My courses');
        }).then(function () {
            return MM.clickOn('Psychology in Cinema');
        }).then(function () {
            return MM.clickOn('Analysis');
        }).then(function () {
            return MM.clickOn('From Concept to Reality: Trauma and Film');
        }).then(function () {
            return MM.clickOn('ExampleEssay.pdf');
        }).then(function () {
            // Check whether the click is successfull and currentView still remains same as earlier
            expect(MM.getView().getText()).toContain(' ');
        }).then(function () {
            done();
        });
    });
    it('Click Add submission button', function (done) {
        return MM.loginAsStudent().then(function () {
            return MM.clickOnInSideMenu('My courses');
        }).then(function () {
            return MM.clickOn('Psychology in Cinema');
        }).then(function () {
            return MM.clickOn('Analysis');
        }).then(function () {
            return MM.clickOn('From Concept to Reality: Trauma and Film');
        }).then(function () {
            // New function added to scroll to bottom and perform actions
            return MM.goToBottomAndClick('Add submission');
        }).then(function () {
            // Extend to check new feature in v3.1.2
            return MM.clickOn('Add file');
        }).then(function () {
            done();
        });
    });

    it('Click secondary button', function (done) {
        return MM.loginAsStudent().then(function () {
            return MM.clickOnInSideMenu('My courses');
        }).then(function () {
            return MM.clickOn('Psychology in Cinema');
        }).then(function () {
            return MM.clickOn('Analysis');
        }).then(function () {
            return MM.clickOn('From Concept to Reality: Trauma and Film');
        }).then(function () {
            browser.sleep(7500); //wait for button css to render
            return $('.secondary-buttons').click();
        }).then(function () {
            browser.sleep(5000); //wait for button css to render
            expect($('.popover-backdrop.active').isPresent()).toBeTruthy();
        }).then(function () {
            done();
        });
    });

});