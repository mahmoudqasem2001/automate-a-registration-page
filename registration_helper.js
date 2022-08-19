const locators = {
    signIn_page_url: 'http://automationpractice.com/index.php',
    registerPage_url: 'http://automationpractice.com/index.php?controller=authentication&back=my-account#account-creation',
    submitEmail_btn: '#SubmitCreate > span',
    sign_in_btn: '.login',
    submitAccount_btn: '#submitAccount > span',
    email: '#email_create',
    firstName: '#customer_firstname',
    lastName: '#customer_lastname',
    password: '#passwd',
    phone_number: '#phone_mobile',
    errorMessage: '.alert',
    postalCode: '#postcode',
    days: '#days',
    months: '#months',
    years: '#years',
    newsLetter_checkbox: '#newsletter',
    offer_checkbox: '#optin',
    company_name: '#company',
    otherDiscription: '#other',
    homePhone: '#phone',
    address1: '#address1',
    address2: '#address2',
    city: '#city',
    state_Id: '#id_state',
    country_Id: '#id_country',
    mobile_phone: '#phone_mobile',
    alias_address: '#alias',
}
const visitURL = (url) => {
    cy.visit(url)
}
const click = (locator) => {
    cy.get(locator)
        .click({ force: true })
}
const checkEmailMessageError = () => {
    cy.wait(10000)
    cy.get(locators.email)
        .should('have.css', 'color', 'rgb(241, 51, 64)')
    cy.get(locators.errorMessage)
        .should('be.visible', { timeout: 100000 })
    cy.get('li')
        .contains('Invalid email address')
        .should('be.visible')
}
const type = (locator, text) => {
    cy.get(locator)
        .clear({ force: true })
        .type(text)
        .should('have.value', text)
}

const checkURL = (url) => {
    cy.url({ timeout: 20000 })
        .should('eq', url)

}
const checkRedColorError = (locator) => {
    cy.get(locator)
        .should('have.css', 'color', 'rgb(241, 51, 64)')
}
const fillOptionalFields = (
    day,
    month,
    year,
    company,
    otherDiscription,
    homePhone,
) => {
    cy.get(locators.days)
        .select(day, { force: true })
        .should('have.value', day)
    cy.get(locators.months)
        .select(month, { force: true })
        .should('have.value', month)
    cy.get(locators.years)
        .select(year, { force: true })
        .should('have.value', year)
    cy.get(locators.newsLetter_checkbox)
        .check({ force: true })
        .should('be.checked')
    cy.get(locators.offer_checkbox)
        .check({ force: true })
        .should('be.checked')
    cy.get(locators.company_name)
        .clear({ force: true })
        .type(company)
        .should('have.value', company)
    cy.get(locators.otherDiscription)
        .clear({ force: true })
        .type(otherDiscription)
        .should('have.value', otherDiscription)
    cy.get(locators.homePhone)
        .clear({ force: true })
        .type(homePhone)
        .should('have.value', homePhone)

}
const checkIfErrorShown = () => {
    cy.get(locators.errorMessage)
        .should('exist')
        .should('be.visible')
}
const checkErrorTypeVisable = (locator) => {
    if (locator == "#passwd") {
        cy.get('li')
            .contains('passwd')
            .should('be.visible')
    }
    else if (locator == "#postcode") {
        cy.get('li')
            .contains("The Zip/Postal code you've entered is invalid. It must follow this format: 00000")
            .should('be.visible')
    }
    else if (locator == "#phone_mobile") {
        cy.get('li')
            .contains("phone_mobile is invalid")
            .should('be.visible')
    }
}
const fillRequiredFields = (firstName,
    lastName,
    email,
    password,
    address1,
    city,
    state_Id,
    postalCode,
    country_Id,
    mobilePhone,
    aliasAddress) => {
    cy.get(locators.firstName)
        .clear({ force: true })
        .type(firstName)
        .should('have.value', firstName)
    cy.get(locators.lastName)
        .clear({ force: true })
        .type(lastName)
        .should('have.value', lastName)
    cy.get(locators.password)
        .clear({ force: true })
        .type(password)
        .should('have.value', password)
    cy.get(locators.address1)
        .clear({ force: true })
        .type(address1)
        .should('have.value', address1)
    cy.get(locators.city)
        .clear({ force: true })
        .type(city)
        .should('have.value', city)
    cy.get(locators.state_Id)
        .select(state_Id)
        .should('have.value', `${state_Id - 1}`)
    cy.get(locators.postalCode)
        .clear({ force: true })
        .type(postalCode)
        .should('have.value', postalCode)
    cy.get(locators.country_Id)
        .should('have.value', country_Id)
    cy.get(locators.mobile_phone)
        .clear({ force: true })
        .type(mobilePhone)
        .should('have.value', mobilePhone)
    cy.get(locators.alias_address)
        .clear({ force: true })
        .type(aliasAddress)
        .should('have.value', aliasAddress)
}


export {
    locators,
    visitURL,
    click,
    type,
    checkEmailMessageError,
    checkURL,
    checkRedColorError,
    fillOptionalFields,
    checkIfErrorShown,
    checkErrorTypeVisable,
    fillRequiredFields

}

