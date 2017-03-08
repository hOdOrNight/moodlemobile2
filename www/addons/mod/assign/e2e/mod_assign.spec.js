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

describe('User can manage course assign', function() {
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.sleep(10000);
    
    /*
    it('View course assign windows', function (done) {
        return MM.loginAsStudent().then(function () {
            browser.sleep(15000); 
            return MM.clickOnInSideMenu('My courses');
        }).then(function () {
            browser.sleep(5000); 
            return MM.clickOn('Activity examples');
        }).then(function () {
            browser.sleep(5000); 
            return MM.clickOn('Assignments');
        }).then(function () {
            browser.sleep(5000); 
            return MM.clickOn('Online Text Assignment');
        }).then(function () {
            done();
        });
    });*/

    it('View course assign windows', function (done) {
        return MM.loginAsTeacher().then(function () {
            return MM.clickOnInSideMenu('My courses');
        }).then(function () {
            return MM.clickOn('Psychology in Cinema');
        }).then(function () {
            return MM.clickOn('Analysis');
        }).then(function () {
            return MM.clickOn('From Concept to Reality: Trauma and Film');
        }).then(function() {
            expect(MM.getView().getText()).toMatch('The screening of trauma transcends the narrative');
        }).then(function() {
            done();
        });
    });
    /*
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
        }).then(function() {
            expect(MM.getView().getText()).toMatch('The screening of trauma transcends the narrative');
        }).then(function () {
            return MM.goBack();
        }).then(function() {
            done();
        });
    });

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
        }).then(function() {
            expect(MM.getView().getText()).toMatch('The screening of trauma transcends the narrative');
        }).then(function() {
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
        }).then(function() {
            return MM.clickOn('Add submission');
        }).then(function() {
            expect(MM.getView().getText()).toMatch('The screening of trauma transcends the narrative');
            expect(MM.getView().getText()).toMatch('ExampleEssay.pdf');
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
            return $('.secondary-buttons').click();
        }).then(function() {
            expect(MM.getView().getText()).toMatch('The screening of trauma transcends the narrative');
        }).then(function () {
            done();
        });
    });
    */
});

