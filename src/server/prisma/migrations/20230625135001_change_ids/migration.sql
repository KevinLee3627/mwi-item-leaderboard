/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Item` table. All the data in the column will be lost.
  - The primary key for the `Record` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Record` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "hrid" TEXT NOT NULL PRIMARY KEY,
    "displayName" TEXT NOT NULL,
    "enhancementLevel" INTEGER
);
INSERT INTO "new_Item" ("displayName", "enhancementLevel", "hrid") SELECT "displayName", "enhancementLevel", "hrid" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Record" (
    "ts" DATETIME NOT NULL,
    "num" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,

    PRIMARY KEY ("itemId", "playerId"),
    CONSTRAINT "Record_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("hrid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("itemId", "num", "playerId", "ts") SELECT "itemId", "num", "playerId", "ts" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
