import { test } from '../fixtures/base'
import { getLoginData, getLastLoginData } from '../utils/excel-reader'

const loginData = getLoginData();
const invalidLoginData = getLastLoginData();


test.describe('Authentication module script', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('TC-AUTH-001 Navigation to authentication and verification', async ({ loginPage }) => {
        // await loginPage.goto();
        await loginPage.assertLoginPageVisible();
    })

    test('TC-AUTH-002 Verify Sign Up Link navigating to signup page' , async ({ loginPage }) => {
        await loginPage.clickSignUpLink();
        await loginPage.assertSignUpPageVisible();
    })

    test('TC-AUTH-003 Verify forget password link navigating to forget password page' , async ({ loginPage}) => {
        await loginPage.clickForgetPasswordLink();
        await loginPage.assertForgotPasswordPageVisible();
    })

    test('TC-AUTH-004 login with invalid credentials', async ({ loginPage }) => {
    await loginPage.enterEmail(String(invalidLoginData.email));
    await loginPage.enterPassword(String(invalidLoginData.password));
    await loginPage.waitForSpinnerToClear();
    await loginPage.clickLoginButton();

    // assertion for invalid login goes here
});


    test('TC-AUTH-005 login with valid credentials', async ({ loginPage }) => {
        await loginPage.enterEmail(String(loginData.email));
        await loginPage.enterPassword(String(loginData.password));
        await loginPage.waitForSpinnerToClear();
        await loginPage.clickLoginButton();
    })
})