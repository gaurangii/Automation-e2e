import { test, expect } from '../fixtures/base'
import { LoginPage } from '../pages/login-page'
// import { env } from 'process'
import { getLoginData } from '../utils/excel-reader'

const loginData = getLoginData();



test.describe('Authentication module script', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('TC-AUTH-001 Navigation to authentication and verification', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.assertLoginPageVisible();
    })

    test('TC-AUTH-002 login with valid credentials', async ({ loginPage }) => {
        await loginPage.enterEmail(String(loginData.email));
        await loginPage.enterPassword(String(loginData.password));
        await loginPage.clickLoginButton();
    })
})