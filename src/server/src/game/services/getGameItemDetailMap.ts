import info from 'src/clientInfo.json';
import { type GameInfo } from 'src/clientInfoClean';

export function getGameItemDetailMap(): GameInfo['itemDetailMap'] {
  return info.itemDetailMap;
}
