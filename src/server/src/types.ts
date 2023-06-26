import { type Player, type Record } from '@prisma/client';

export interface GetItemLeaderboardReturn extends Omit<Record, 'ts'> {
  player: Player;
  ts: string;
}
