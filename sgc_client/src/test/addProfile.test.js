import { Selector } from 'testcafe';

fixture`Create profile request`
    .page`http://localhost:3000`;


test('Add profile permission', async t => {

    const email = 'admin@gmail.com';
    const password = '123';

    const emailInput = Selector('#defaultLoginFormEmail');
    const emailInputExists = emailInput.exists;

    const passwordInput = Selector('#defaultLoginFormPassword');
    const passwordInputExists = passwordInput.exists;


    const profileName = 'Prueba';
    const descriptionProfile = 'Perfil de prueba';

    const profileNameInput = Selector('#name-profile-input');
    const profileNameInputExists = profileNameInput.exists;

    const descriptionProfileInput = Selector('#description-profile-input');
    const descriptionProfileInputExists = descriptionProfileInput.exists;

    await t

        .expect(emailInputExists).ok()
        .typeText(emailInput, email)
        .expect(emailInput.value).eql(email)

        .expect(passwordInputExists).ok()
        .typeText(passwordInput, password)
        .expect(passwordInput.value).eql(password)

        .click('#btn-login')
        .click('#GestionPerfiles')
        .click('#add-profile-btn')

        .expect(profileNameInputExists).ok()
        .typeText(profileNameInput, profileName)
        .expect(profileNameInput.value).eql(profileName)

        .expect(descriptionProfileInputExists).ok()
        .typeText(descriptionProfileInput, descriptionProfile)
        .expect(descriptionProfileInput.value).eql(descriptionProfile)


        .click('#submit-new-profile-btn')
    
      
});