const helper = require('protractor-helper')

const Home = require('../page-objects/home')

describe('Given I\'m at the homepage', () => {
  let homepage

  beforeAll(() => {
    homepage = new Home()
    homepage.visit()
  })

  describe('And there are five tags  in the data base', () => {
    it('Then they all render as cards', () => {
      helper.waitForElementVisibility(homepage.tags.cards.last())

      expect(homepage.tags.cards.count()).toBe(5)
    })

    describe('When i look the first card in isolation', () => {
      it('Then i see an image, a heading, an a anchor', () => {
        helper.waitForElementVisibility(homepage.tags.imageOfFirstCard)
        helper.waitForElementVisibility(homepage.tags.headingOfFirstCard)
        helper.waitForElementVisibility(homepage.tags.anchorOfFirstCard)
      })
    })
  })
})
