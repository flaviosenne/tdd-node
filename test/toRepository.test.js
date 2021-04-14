const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const TodoRepository = require('../src/todoRepository')
const { createSandbox } = require('sinon')

describe('todoRepository', () => {
    let todoRepository
    let sandbox

    before(() => {
        todoRepository = new TodoRepository()
        sandbox = createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('methods signature', () => {

        it('shoud call find from lokijs', () => {
            const mockDatabase = [
                {
                    name: 'oládoido',
                    age: 21,
                    meta: { revision: 0, created: 1618354111965, version: 0 },
                    '$loki': 1
                }
            ]

            const functionName = "find"
            const expectedReturn = mockDatabase
            sandbox.stub(
                todoRepository.schedule,
                functionName
            ).returns(expectedReturn)

            const result = todoRepository.list()
            expect(result).to.be.deep.equal(expectedReturn)
            expect(todoRepository.schedule[functionName].calledOnce).to.be.ok

        })

        it('shoud call insertOne from lokijs', () => {
            const functionName = "insertOne"
            const expectedReturn = true

            sandbox.stub(
                todoRepository.schedule,
                functionName
            ).returns(expectedReturn)
            
            const data = { name: 'Joao' }

            const result = todoRepository.create(data)

            expect(result).to.be.ok
            expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok
        })
    })
})



