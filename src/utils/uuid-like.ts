const UuidLike = {

    createUUID2: (): string => {
        return UuidLike.createUUID().split('-').splice(3).join('');
    },

    createUUID: (): string => {
        const candidate = '1234567890abcdef';
        let result = '';

        for(let i = 0; i < 36; i++) {
            if(i == 8 || i == 13 || i == 18 || i == 23) {
                result += '-';
            } else {
                result += candidate.charAt(Math.random() * candidate.length);
            }
        }

        return result;
    }

}

export default UuidLike;