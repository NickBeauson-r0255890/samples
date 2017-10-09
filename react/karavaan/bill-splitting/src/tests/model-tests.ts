import {SplitEvenlyCalculator} from './../model/expenses';
import * as Chai from 'chai';

const expect = Chai.expect;


describe('expenses', () => {
    it('single participant pays for everything', () => {
        const calc = new SplitEvenlyCalculator(100);
        const p1 = calc.addParticipant();
        calc.recalculate();

        expect(p1.amountDue).to.be.equal(100);
    });

    it('two participants each pay half', () => {
        const calc = new SplitEvenlyCalculator(100);
        const p1 = calc.addParticipant();
        const p2 = calc.addParticipant();
        calc.recalculate();

        expect(p1.amountDue).to.be.equal(50);
        expect(p2.amountDue).to.be.equal(50);
    });
});
