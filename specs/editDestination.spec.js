const faker = require('faker')
const { browser } = require('protractor')
const helper = require('protractor-helper')

const Destination = require('../page-objects/destination')
const EditDestination = require('../page-objects/editDestination')

describe('Dado estou em uma página de edição de destino aleatória', () => {
  let editDestination

  beforeEach(() => {
    editDestination = new EditDestination()
    editDestination.visit()
  })

  it('Então eu vejo uma imagem, um form para editar o nome e a descricao', () => {
    helper.waitForElementVisibility(editDestination.self.image)
    helper.waitForElementVisibility(editDestination.form.nameLabel)
    helper.waitForElementVisibility(editDestination.form.nameInput)
    helper.waitForElementVisibility(editDestination.form.descriptionLabel)
    helper.waitForElementVisibility(editDestination.form.descriptionInput)
    helper.waitForElementVisibility(editDestination.form.updateButton)
  })

  describe('Quando eu sumeto o form menor que o mínimo de caracteres exigido', () => {
    beforeEach(() => {
      editDestination
        .form
        .submitFormAfterClearingAndFillingItWith('Ab', 'Abcdefghi')
    })

    it('então ambos os campos de entrada são encapsulador em um .field_with_erros div', () => {
      helper.waitForElementVisibility(editDestination.form.nameInputWithError)
      helper.waitForElementVisibility(editDestination.form.descriptionInputWithError)
    })
  })

  describe('Quando submeto o form com nome e descrição com sucesso', () => {
    let destinationUrl
    const randomUuid = faker.random.uuid()
    const fiveRandomWords = faker.random.words(5)

    beforeEach(() => {
      browser.getCurrentUrl().then(url => {
        destinationUrl = url.replace('/edit', '')
      })

      editDestination
        .form
        .submitFormAfterClearingAndFillingItWith(randomUuid, fiveRandomWords)
    })

    it('Então eu redireciono para a página de detalhes destination com a informação atualizada', () => {
      const destination = new Destination()

      helper.waitForUrlToBeEqualToExpectedUrl(destinationUrl)
      helper.waitForTextToBePresentInElement(
        destination.self.heading,
        randomUuid
      )
      helper.waitForTextToBePresentInElement(
        destination.self.paragraph,
        fiveRandomWords
      )
    })
  })
})
