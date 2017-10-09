const setAmountDue = Symbol('setAmountDue');

export class SplitEvenlyCalculator
{
    public amount : number;

    private participants : Participant[];

    constructor(amount : number)
    {
        this.amount = amount;
        this.participants = [];
    }

    addParticipant() : Participant
    {
        const participant = new Participant();
        this.participants.push(participant);

        return participant;
    }

    recalculate() : void
    {
        const participantCount = this.participants.length;
        const amountDue = this.amount / participantCount;

        for ( let participant of this.participants )
        {
            (participant as any)[setAmountDue](amountDue);
        }
    }
}

class Participant
{
    private _amountDue : number;

    [setAmountDue](amountDue : number)
    {
        this._amountDue = amountDue;
    }

    get amountDue() : number
    {
        return this._amountDue;
    }
}
