const maple = {

    worldToId(world: string): number {
        switch(world) {
            case "예티X핑크빈":
                return -1928176899;
            case "노바":
                return 1456540;
            case "레드":
                return 1506772;
            case "루나":
                return 1512624;
            case "버닝":
                return 1541849;
            case "베라":
                return 1543900;
            case "버닝2":
                return 47797369;
            case "버닝3":
                return 47797370;
            case "버닝4":
                return 47797371;
            case "아케인":
                return 50224316;
            case "오로라":
                return 50255812;
            case "유니온":
                return 50457472;
            case "제니스":
                return 50698744;
            case "크로아":
                return 52788692;
            case "예티X핑크빈2":
                return 356058325;
            case "스카니아":
                return 1536686028;
            case "엘리시움":
                return 1556130104;
            case "이노시스":
                return 1566384844;
        }

        return 65535;
    },

    worldToName(id: number): string {
        switch(id) {
            case 1566384844:
                return "이노시스";
            case 1556130104:
                return "엘리시움";
            case 1536686028:
                return "스카니아";
            case 356058325:
                return "예티X핑크빈2";
            case 52788692:
                return "크로아";
            case 50698744:
                return "제니스";
            case 50457472:
                return "유니온";
            case 50255812:
                return "오로라";
            case 50224316:
                return "아케인";
            case 47797371:
                return "버닝4";
            case 47797370:
                return "버닝3";
            case 47797369:
                return "버닝2";
            case 1543900:
                return "베라";
            case 1541849:
                return "버닝";
            case 1512624:
                return "루나";
            case 1506772:
                return "레드";
            case 1456540:
                return "노바";
            case -1928176899:
                return "예티X핑크빈";
        }

        return id.toString();
    },

    toItemIcon(id: number): string {
        const itemDetailTypes: Int8Array = new Int8Array([10, 5, 15, 2, 11, 7, 14, 1]);
        let result: Array<String> = new Array();
        let digits = 100000000;
        for(let i = 0; i < 8; i++) {
            result.push('A');
            const div = id / digits;
            const increment = div ^ itemDetailTypes[i];

            id %= digits;
            result[i] = String.fromCharCode(result[i].charCodeAt(0) + increment);
            digits /= 10;
        }

        return result.join('') + ".png";
    }
}

export default maple;