import fs from 'fs';
import path from 'node:path';

export type PushType = {
    isPush: boolean,
    type: number,
}

export const getConfig = (): PushType => {
    if(!fs.existsSync(path.join(__dirname + '/config.json'))) {
        fs.writeFileSync(path.join(__dirname + '/config.json'), JSON.stringify({
            isPush: true,
            type: 0
        } as PushType));
    }
    const pushType = JSON.parse(fs.readFileSync(path.join(__dirname + '/config.json')).toString()) as PushType;
    return pushType;
};

export const saveConfig = (config: PushType): PushType => {
    fs.writeFileSync(path.join(__dirname + '/config.json'), JSON.stringify(config));

    return config;
};