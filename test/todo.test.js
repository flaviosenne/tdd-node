const { describe, it, beforeEach, afterEach} = require('mocha')
const { expect } = require('chai')
const { createSandbox}= require('sinon')
const Todo = require('../src/todo')

describe('todo', () => {
    let sandbox
    beforeEach(() => {
        sandbox = createSandbox()
    })
    afterEach(() => {
        sandbox.restore()
    })


    describe('#isValid', () => {
        it('shoud return invalid when creating an object without text', () => {
            const data = {
                text: '',
                when: new Date("2020-04-13")
            }

            const todo = new Todo(data)
            const result = todo.isValid()
            expect(result).to.be.not.ok

        })
        it('shoud return invalid when creating an object using the "when" property invalid', () => {
            const data = {
                text: 'Hello',
                when: new Date("20-04-13")
            }

            const todo = new Todo(data)
            const result = todo.isValid()
            expect(result).to.be.not.ok

        })
        it('shoud have "id", "text", "when" and "status" properties after creating object', () => {
            const data = {
                text: 'Hello',
                when: new Date("2020-04-13")
            }

            const expectedId = '00001'

            const uuid = require('uuid')
            const fakeUUID = sandbox.fake.returns(expectedId)
            sandbox.replace(uuid, "v4", fakeUUID)

            const todo = new Todo(data)
            
            const expectedItem = {
                text: data.text,
                when: data.when,
                status: "",
                id: expectedId
            }
            const result = todo.isValid()
            expect(result).to.be.ok
            
            expect(uuid.v4.calledOnce).to.be.ok
            expect(todo).to.be.deep.equal(expectedItem)
        })
    })
})