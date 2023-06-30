-- CreateTable
CREATE TABLE "Ability" (
    "hrid" TEXT NOT NULL PRIMARY KEY,
    "displayName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AbilityRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ts" DATETIME NOT NULL,
    "abilityHrid" TEXT NOT NULL,
    "abilityXp" INTEGER NOT NULL,
    "abilityLevel" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "AbilityRecord_abilityHrid_fkey" FOREIGN KEY ("abilityHrid") REFERENCES "Ability" ("hrid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AbilityRecord_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
