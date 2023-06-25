import { type Player, type Record } from '@prisma/client';

export interface GetItemLeaderboardReturn extends Record {
  player: Player;
}
