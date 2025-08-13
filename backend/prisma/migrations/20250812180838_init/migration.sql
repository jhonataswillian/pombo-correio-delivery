-- CreateTable
CREATE TABLE "pigeons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "photoUrl" TEXT,
    "averageSpeed" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "letters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'QUEUED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "senderId" TEXT NOT NULL,
    "pigeonId" TEXT NOT NULL,
    CONSTRAINT "letters_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "letters_pigeonId_fkey" FOREIGN KEY ("pigeonId") REFERENCES "pigeons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "pigeons_nickname_key" ON "pigeons"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");
