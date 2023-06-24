/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itemHrid` on the `Record` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hrid" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "enhancementLevel" INTEGER
);
INSERT INTO "new_Item" ("displayName", "enhancementLevel", "hrid", "id") SELECT "displayName", "enhancementLevel", "hrid", "id" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ts" DATETIME NOT NULL,
    "num" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "Record_id_fkey" FOREIGN KEY ("id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("id", "num", "playerId", "ts") SELECT "id", "num", "playerId", "ts" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
