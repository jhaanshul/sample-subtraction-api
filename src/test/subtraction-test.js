const expect = require('chai').expect;
const subtraction = require('../models/subtraction');

describe('subtraction.js tests', () => {
    describe('subtraction.generateQuestions() Test', () => {
        it('result should contain 3 questions', () => {
            const result = subtraction.generateQuestions({numberOfQuestions: 3, minuedDigits: 4, subtrahendDigits: 3, isBorrow: 1});
            expect(result.length).to.equal(3);
        });
        it('digits in minuend and subtrahend should be correct', () => {
            const result = subtraction.generateQuestions({numberOfQuestions: 1, minuedDigits: 4, subtrahendDigits: 3, isBorrow: 1});
            expect(result.length).to.equal(1);
            const r = result[0];
            const minuend = r.minuend;
            const subtrahend = r.subtrahend;
            expect(minuend.toString().length).to.equal(4);
            expect(subtrahend.toString().length).to.equal(3);
        });
        it('borrowing should be present if specified', () => {
            const result = subtraction.generateQuestions({numberOfQuestions: 1, minuedDigits: 4, subtrahendDigits: 3, isBorrow: 1});
            expect(result.length).to.equal(1);
            let max = result[0].minuend;
            let min = result[0].subtrahend;
            let isPossible = false;
            while(max && min){
                if((max % 10) < (min % 10)) {
                    isPossible = true;
                    break;
                }
                max = Math.floor(max/10);
                min = Math.floor(min/10);
            }
            expect(isPossible).to.equal(true);   
        });
        it('borrowing should not be present if not specified', () => {
            const result = subtraction.generateQuestions({numberOfQuestions: 1, minuedDigits: 4, subtrahendDigits: 3, isBorrow: 0});
            expect(result.length).to.equal(1);
            let max = result[0].minuend;
            let min = result[0].subtrahend;
            let isPossible = false;
            while(max && min){
                if((max % 10) < (min % 10)) {
                    isPossible = true;
                    break;
                }
                max = Math.floor(max/10);
                min = Math.floor(min/10);
            }
            expect(isPossible).to.equal(false);   
        });
    });

    describe('subtraction.randomNumberPair() Test', () => {
        it('result should contain two numbers each of two digits', () => {
            const result = subtraction.randNumberPair(2);
            expect(Object.keys(result).length).to.equal(2);
            const min = result.min;
            const max = result.max;
            const minlen = min.toString().length;
            const maxlen = max.toString().length;
            expect(minlen).to.equal(2);
            expect(maxlen).to.equal(2);
        })
    });

    describe('subtraction.isBorrowingPossible() Test', () => {
        it('result should return true when borrowing is there', () => {
            const result = subtraction.isBorrowingPossible(67, 58);
            expect(result).to.equal(true);
        })
        it('result should return false when borrowing is not there', () => {
            const result = subtraction.isBorrowingPossible(67, 55);
            console.log(result);
            expect(result).to.equal(false);
        })
    });
});
