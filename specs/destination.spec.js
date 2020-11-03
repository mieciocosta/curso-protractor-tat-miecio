const helper = require('protractor-helper')

const Destination = require('../page-objects/destination')

describe('Dado que estou em uma página de destino aleatória', () => {
  let destination

  beforeEach(() => {
    destination = new Destination()
    destination.visit()
  })

  it('Em seguida, veja uma imagem, um título, um parágrafo e uma âncora', () => {
    helper.waitForElementVisibility(destination.self.image)
    helper.waitForElementVisibility(destination.self.heading)
    helper.waitForElementVisibility(destination.self.paragraph)
    helper.waitForElementVisibility(destination.self.anchor)
  })
})
