-- CreateTable
CREATE TABLE "ServiceStatus" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "lastUpdate" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);
