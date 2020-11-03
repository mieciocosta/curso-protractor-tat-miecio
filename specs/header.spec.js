const helper = require('protractor-helper')

const pageSorter = require('../utils/pageSorter')

const pages = [
  require('../page-objects/home'),
  require('../page-objects/destination'),
  require('../page-objects/editDestination'),
  require('../page-objects/tag')
]

describe('Dados que estou em uma página aleatória no app', () => {
  let randomPage

  beforeEach(() => {
    randomPage = new pages[pageSorter()]()
    randomPage.visit()
  })

  it('Então eu vejo o anchor no cabeçalho da página', () => {
    helper.waitForElementVisibility(randomPage.header.anchorToHome)
  })
})
