/*
  Warnings:

  - The primary key for the `Record` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itemId` on the `Record` table. All the data in the column will be lost.
  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `itemEnhancementLevel` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemHrid` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Made the column `enhancementLevel` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "ts" DATETIME NOT NULL,
    "num" INTEGER NOT NULL,
    "itemHrid" TEXT NOT NULL,
    "itemEnhancementLevel" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    PRIMARY KEY ("itemHrid", "itemEnhancementLevel", "playerId"),
    CONSTRAINT "Record_itemHrid_itemEnhancementLevel_fkey" FOREIGN KEY ("itemHrid", "itemEnhancementLevel") REFERENCES "Item" ("hrid", "enhancementLevel") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("num", "playerId", "ts") SELECT "num", "playerId", "ts" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
CREATE TABLE "new_Item" (
    "hrid" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "enhancementLevel" INTEGER NOT NULL,

    PRIMARY KEY ("hrid", "enhancementLevel")
);
INSERT INTO "new_Item" ("displayName", "enhancementLevel", "hrid") SELECT "displayName", "enhancementLevel", "hrid" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
