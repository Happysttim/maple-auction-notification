const DateCalculator = {

    diffYear: (source: Date, target: Date): number => {
        return Math.abs(source.getFullYear() - target.getFullYear());
    },

    diffMonth: (source: Date, target: Date): number => {
        return Math.abs((source.getFullYear() * 12 + source.getUTCMonth()) - (target.getFullYear() * 12 + target.getUTCMonth()));
    },

    diffWeek: (source: Date, target: Date): number => {
        return Math.abs((source.getTime() - target.getTime()) / (1000 * 60 * 60 * 24 * 7));
    },

    diffDay: (source: Date, target: Date): number => {
        return Math.abs((source.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    },

    diffHours: (source: Date, target: Date): number => {
        return Math.abs((source.getTime() - target.getTime()) / (1000 * 60 * 60));
    },

    diffMinutes: (source: Date, target: Date): number => {
        return Math.abs((source.getTime() - target.getTime()) / (1000 * 60));
    },

    diffSeconds: (source: Date, target: Date): number => {
        return Math.abs((source.getTime() - target.getTime()) / 1000);
    },

};

export default DateCalculator;