const listHelper = require('../util/list_helper')

test('dummy returns one',() => {
    expect(listHelper.dummy([])).toBe(1)
})