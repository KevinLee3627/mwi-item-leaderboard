/*
  Warnings:

  - You are about to alter the column `abilityXp` on the `AbilityRecord` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AbilityRecord" (
    "ts" DATETIME NOT NULL,
    "abilityHrid" TEXT NOT NULL,
    "abilityXp" REAL NOT NULL,
    "abilityLevel" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    PRIMARY KEY ("abilityHrid", "playerId"),
    CONSTRAINT "AbilityRecord_abilityHrid_fkey" FOREIGN KEY ("abilityHrid") REFERENCES "Ability" ("hrid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AbilityRecord_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AbilityRecord" ("abilityHrid", "abilityLevel", "abilityXp", "playerId", "ts") SELECT "abilityHrid", "abilityLevel", "abilityXp", "playerId", "ts" FROM "AbilityRecord";
DROP TABLE "AbilityRecord";
ALTER TABLE "new_AbilityRecord" RENAME TO "AbilityRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
