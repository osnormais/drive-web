export class Range {



    private start: number;
    private end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    public getStart(): number {
        return this.start;
    }

    public getEnd(): number {
        return this.end;
    }

    public toString(): string {
        return `${this.start}-${this.end}`;
    }

}

export default class RangeManager {

    private pendingRanges: Range[];

    constructor(total: number) {
        this.pendingRanges = [new Range(0, total - 1)];
    }

    public markAsCompleted(start: number, end: number): void {
        const nextRanges: Range[] = [];

        for (const range of this.pendingRanges) {

            if (end < range.getStart() || start > range.getEnd()) {
                nextRanges.push(range);
                continue;
            }

            if (start > range.getStart()) {
                nextRanges.push(new Range(range.getStart(), start - 1));
            }

            if (end < range.getEnd()) {
                nextRanges.push(new Range(end + 1, range.getEnd()));
            }

        }

        this.pendingRanges = nextRanges;
    }

    public getNextBatch(count: number): Range[] {
        const batch: Range[] = [];
        let remaining = count;

        for (const range of this.pendingRanges) {
            if (remaining <= 0) break;

            const rangeSize = range.getEnd() - range.getStart() + 1;

            if (rangeSize <= remaining) {
                batch.push(new Range(range.getStart(), range.getEnd()));
                remaining -= rangeSize;
            } else {
                batch.push(new Range(range.getStart(), range.getStart() + remaining - 1));
                remaining = 0;
            }
        }

        return batch;
    }

    public hasPending(): boolean {
        return this.pendingRanges.length > 0;
    }

}
