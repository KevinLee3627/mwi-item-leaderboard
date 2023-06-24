-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "displayName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL,
    "hrid" TEXT NOT NULL PRIMARY KEY,
    "displayName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ts" DATETIME NOT NULL,
    "num" INTEGER NOT NULL,
    "itemHrid" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "Record_itemHrid_fkey" FOREIGN KEY ("itemHrid") REFERENCES "Item" ("hrid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
