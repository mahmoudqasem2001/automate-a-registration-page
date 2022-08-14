/// <reference types="cypress" />


Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Register page',()=>{

  before('visit website',()=>{
    cy.visit('http://automationpractice.com/index.php')
    cy.get('a')
      .contains('Sign in')
      .click({force:true})
  })

  it('Registration with invalid Email',()=>{ 
    cy.get('.alert').should('not.be.visible')
//--------Email without "@" char-----------//
    cy.get('#email_create').clear().type('sampleUser4gmail.com')    
    cy.get('#SubmitCreate > span').click() 
    cy.wait(15000)
    cy.get('#email_create').should('have.css','color','rgb(241, 51, 64)')
    cy.get('.alert').should('be.visible',{timeout:100000})
    cy.get('li').contains('Invalid email address').should('be.visible')
//--------Email without dot --------------//
    cy.get('#email_create').clear().type('sampleUser4@gmailcom')
    cy.get('#SubmitCreate > span').click() 
    cy.wait(15000)
    cy.get('#email_create').should('have.css','color','rgb(241, 51, 64)')
    cy.get('.alert').should('be.visible',{timeout:100000})
    cy.get('li').contains('Invalid email address').should('be.visible')
//----------Email without name------//
    cy.get('#email_create').clear().type('@gmail.com')
    cy.get('#SubmitCreate > span').click() 
    cy.wait(15000)
    cy.get('#email_create').should('have.css','color','rgb(241, 51, 64)')
    cy.get('.alert').should('be.visible',{timeout:100000})
    cy.get('li').contains('Invalid email address').should('be.visible')
  })

  it('Registration with valid Email',()=>{
    cy.get('#email_create').clear().type('sampleUser7@gmail.com')
    cy.get('#SubmitCreate > span').click() 
    cy.wait(15000)
  })
  
  it('Verify Clicking on required fields without filling them',()=>{
    cy.get('#customer_firstname').click()
    cy.get('body').click({force:true})
    cy.get('#customer_firstname').should('have.css','color','rgb(241, 51, 64)')

    cy.get('#customer_lastname').click()
    cy.get('body').click({force:true})
    cy.get('#customer_lastname').should('have.css','color','rgb(241, 51, 64)')

    cy.get('#passwd').click()
    cy.get('body').click({force:true})
    cy.get('#passwd').should('have.css','color','rgb(241, 51, 64)')
  })
  
  it('Registration with invalid phone number ',()=>{
    cy.get('#phone_mobile').type('hhhh').should('have.value','hhhh')
    cy.get('#submitAccount > span').click()
    cy.wait(10000)
    cy.get('.alert').should('exist').should('be.visible')
    cy.get('li').contains("phone_mobile is invalid").should('be.visible')

  })

  it('Registration with invalid password',()=>{
    cy.get('#passwd').type('1234').should('have.value','1234')
    cy.get('#submitAccount > span').click()
    cy.wait(10000)
    cy.get('.alert').should('exist').should('be.visible')
    cy.get('li').contains('passwd is invalid').should('be.visible')

    cy.get('#passwd').type('123445678910111211314151617181920212223').should('have.value','123445678910111211314151617181920212223')
    cy.get('#submitAccount > span').click()
    cy.wait(10000)
    cy.get('.alert').should('exist').should('be.visible')
    cy.get('li').contains('passwd is too long. Maximum length: 32').should('be.visible')

  })

  it('Registration with invalid postal code',()=>{
    cy.get('#postcode').type('123456').should('have.value','123456')
    cy.get('#submitAccount > span').click()
    cy.wait(10000)
    cy.get('.alert').should('exist').should('be.visible')
    cy.get('li').contains("The Zip/Postal code you've entered is invalid. It must follow this format: 00000").should('be.visible')

  })

  it('Registration without filling required fields',()=>{
    cy.get('#submitAccount > span').click()
    cy.wait(10000)
    cy.get('.alert').should('exist').should('be.visible')
  })

  it('Registration without filling required fields and filling optional fields',()=>{
    cy.get('#days').select('15',{force:true}).should('have.value','15')
    cy.get('#months').select('5',{force:true}).should('have.value','5')
    cy.get('#years').select('1999',{force:true}).should('have.value','1999')
    cy.get('#newsletter').check().should('be.checked')
    cy.get('#optin').check().should('be.checked')
    cy.get('#company').type('Exalt').should('have.value','Exalt')
    cy.get('#other').type('no other description').should('have.value','no other description')
    cy.get('#phone').type('0595129072').should('have.value','0595129072')
    cy.get('#submitAccount > span').click()
    cy.get('.alert').should('exist').should('be.visible')

  })

  it('Registration with filling required fields',()=>{
    cy.get('#customer_firstname').type('testUser').should('have.value','testUser')
    cy.get('#customer_lastname').type('lastTestUser').should('have.value','lastTestUser')
    cy.get('#email').should('have.value','sampleUser7@gmail.com').click().should('have.css','color','rgb(156, 155, 155)')
    cy.get('#passwd').type('test12345').should('have.value','test12345')
    cy.get('#address1').type('NewYork').should('have.value','NewYork')
    cy.get('#city').type('panama').should('have.value','panama')
    cy.get('#id_state').select(33).should('have.value','32')
    cy.get('#postcode').clear().type('12345').should('have.value','12345')
    cy.get('#id_country').should('have.value',21)
    cy.get('#phone_mobile').clear().type('0599344870').should('have.value','0599344870')
    cy.get('#alias').clear().type('milan').should('have.value','milan')
    cy.get('#submitAccount > span').click()
    cy.url({timeout: 10000}).should('eq','http://automationpractice.com/index.php?controller=my-account')
  })
  
})