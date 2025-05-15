import { Platform } from '../types.ts';


export const getIdAndPlatformFromLink = (link: string): { id: string, platform: Platform } => {
    if (!link.startsWith('http')) return;
    
    const [platform] = link.split('/')[2].match(/work|robota/) ?? [null];
    
    if (!platform) throw new Error('Unknown platform');
    
    const matcher = platform === 'robota' ? /vacancy(\d+)/ : /jobs\/(\d+)/;
    const [_, idMatch] = link.match(matcher) ?? [null, null];
    
    if (!idMatch) throw new Error('Unknown vacancy link');
    
    return idMatch && { id: idMatch, platform: platform as Platform };
};