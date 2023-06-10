describe('takepedido', () => {
  beforeEach(() => {
    cy.visit('/fooddemo/')
  })
  it('home page can be opened', () => {
    cy.contains('IMPERIAL APA')
  })
  it('product can be access', () => {
    cy.contains('IMPERIAL APA').click()
  })
  it('2 products can be added to the cart', () => {
    cy.contains('IMPERIAL APA').click()
    cy.contains('+').click()
    cy.contains('Agregar').click()
  })
  it('visit my cart', () => {
    cy.contains('IMPERIAL APA').click()
    cy.contains('+').click()
    cy.contains('Agregar').click()
    cy.contains('Ver mi pedido').click()
  })
  it('coupon can be clicked', () => {
    cy.contains('IMPERIAL APA').click()
    cy.contains('+').click()
    cy.contains('Agregar').click()
    cy.contains('Ver mi pedido').click()
    cy.contains('Ingresar cupón de descuento').click()
  })
  it('coupon can be entered', () => {
    cy.contains('IMPERIAL APA').click()
    cy.contains('+').click()
    cy.contains('+').click()
    cy.contains('+').click()
    cy.contains('Agregar').click()
    cy.contains('Ver mi pedido').click()
    cy.contains('Ingresar cupón de descuento').click()
    cy.get('#code').type('test-123')
    cy.get('#add-coupon').click()
  })
  it('go to checkout and complete data customer', () => {
    cy.contains('IMPERIAL APA').click()
    cy.contains('+').click()
    cy.contains('+').click()
    cy.contains('+').click()
    cy.contains('Agregar').click()
    cy.contains('Ver mi pedido').click()
    cy.contains('Ingresar cupón de descuento').click()
    cy.get('#code').type('test-123')
    cy.get('#add-coupon').click()
    cy.contains('Continuar').click()
  })
  it('order can be setted', () => {
    cy.contains('IMPERIAL APA').click()
    cy.contains('+').click()
    cy.contains('+').click()
    cy.contains('+').click()
    cy.contains('Agregar').click()
    cy.contains('Ver mi pedido').click()
    cy.contains('Ingresar cupón de descuento').click()
    cy.get('#code').type('test-123')
    cy.get('#add-coupon').click()
    cy.contains('Continuar').click()
    cy.get('#name').type('sebas')
    cy.get('#phone').type('5491153273953')
    cy.get('#delivery').click()
    cy.get('#cash').click()
    cy.contains('Enviar pedido por Whatsapp').click()
  })
})

export {}