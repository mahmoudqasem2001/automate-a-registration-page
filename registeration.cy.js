/// <reference types="cypress" />
import {
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
} from '../support/registration_helper';


Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Registeration page', () => {

  before('go to sign-in page', () => {
    visitURL('http://automationpractice.com/index.php')
    click(locators.sign_in_btn)
  })

  it('Registration with invalid Email', () => {
    //--------Email without "@" char-----------//
    type(locators.email, 'sampleUser4gmail.com')
    click(locators.submitEmail_btn)
    checkEmailMessageError();
    //--------Email without dot --------------//
    type(locators.email, 'sampleUser4@gmailcom')
    checkEmailMessageError();
    click(locators.submitEmail_btn)
    //----------Email without name------//
    type(locators.email, '@gmail.com')
    checkEmailMessageError();
    click(locators.submitEmail_btn)
  })

  it('Registration with valid Email', () => {
    type(locators.email, 'sampleUser7@gmail.com')
    click(locators.submitEmail_btn)
    checkURL('http://automationpractice.com/index.php?controller=authentication&back=my-account#account-creation')
  })

  it('Verify Clicking on required fields without filling them', () => {
    click(locators.firstName)
    click('body')
    checkRedColorError(locators.firstName)


    click(locators.lastName)
    click('body')
    checkRedColorError(locators.lastName)

    click(locators.password)
    click('body')
    checkRedColorError(locators.password)

  })

  it('Registration with invalid phone number ', () => {
    type(locators.mobile_phone, 'abcd')
    click(locators.submitAccount_btn)
    checkIfErrorShown()
    checkErrorTypeVisable(locators.phone_number)
  })

  it('Registration with invalid password', () => {
    type(locators.password, '123')
    click(locators.submitAccount_btn)
    checkIfErrorShown()
    checkErrorTypeVisable(locators.password)

    type(locators.password, '123445678910111211314151617181920212223')
    click(locators.submitAccount_btn)
    checkIfErrorShown()
    checkErrorTypeVisable(locators.password)
  })

  it('Registration with invalid postal code', () => {
    type(locators.postalCode, '1234567')
    click(locators.submitAccount_btn)
    checkIfErrorShown()
    checkErrorTypeVisable(locators.postalCode)
  })

  it('Registration without filling required fields', () => {
    click(locators.submitAccount_btn)
    checkIfErrorShown()
  })

  it('Registration without filling required fields and filling optional fields', () => {
    fillOptionalFields(
      '15',
      '5',
      '1999',
      'Exalt',
      'no other description',
      '0595129072')
    click(locators.submitAccount_btn)
    checkIfErrorShown()
  })

  it('Registration with filling required fields', () => {
    fillRequiredFields(
      'testUser',
      'lastTestUser',
      'sampleUser7@gmail.com',
      'test12345',
      'NewYork',
      'panama',
      21,
      '12345',
      21,
      '0599344870',
      'milan'
      )
    click(locators.submitAccount_btn)
    checkURL('http://automationpractice.com/index.php?controller=my-account')
    })

})