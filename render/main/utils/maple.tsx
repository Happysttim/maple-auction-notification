export type AuctionRecord = {
    nSN: number,
    message: string,
    date: string,
    characterName: string,
    worldId: number,
    characterId: number,
    pushType: number,
    itemName: string,
    itemId: number,
    count: number,
    price: number,
    new?: boolean
};

export const dateFormat = (s: string): Date => {
    const date = s.split(' ');
    const time = date[2].split(':');

    if(date[1] == '오후') {
        const hour = Number.parseInt(time[0]);
        time[0] = (hour < 12 ? hour + 12 : hour).toString();
    }

    return new Date(`${date[0]} ${time[0]}:${time[1]}`);
};

const maple = {

    worldToName(id: number): string {
        switch(id) {
            case 1:
                return '베라';
            case 2:
                return '스카니아';
            case 3:
                return '루나';
            case 4:
                return '제니스';
            case 5:
                return '크로아';
            case 6:
                return '유니온';
            case 7:
                return '엘리시움';
            case 8:
                return '이노시스';
            case 9:
                return '레드';
            case 10:
                return '오로라';
            case 11:
                return '아케인';
            case 12:
                return '노바';
        }

        return '';
    },

    toItemIcon(id: number): string {
        const itemDetailTypes: Int8Array = new Int8Array([10, 5, 15, 2, 11, 7, 14, 1]);
        const result: Array<string> = [];
        let digits = 100000000;
        for(let i = 0; i < 8; i++) {
            result.push('A');
            const div = id / digits;
            const increment = div ^ itemDetailTypes[i];

            id %= digits;
            result[i] = String.fromCharCode(result[i].charCodeAt(0) + increment);
            digits /= 10;
        }

        return result.join('') + '.png';
    }
};

export default maple;