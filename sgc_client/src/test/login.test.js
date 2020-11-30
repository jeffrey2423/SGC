import { Selector } from 'testcafe';
    
fixture `Login request`
    .page `http://localhost:3000`;


test('Submit a login request', async t => {
    const email = 'admin@gmail.com';
    const password = '123';

    const emailInput = Selector('#defaultLoginFormEmail');
    const emailInputExists = emailInput.exists;

    const passwordInput = Selector('#defaultLoginFormPassword');
    const passwordInputExists = passwordInput.exists;
    await t

        .expect(emailInputExists).ok()
        .typeText(emailInput, email)
        .expect(emailInput.value).eql(email)

        .expect(passwordInputExists).ok()
        .typeText(passwordInput, password)
        .expect(passwordInput.value).eql(password)

        .click('#btn-login')
});