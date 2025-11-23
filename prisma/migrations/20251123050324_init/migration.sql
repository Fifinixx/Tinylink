/*
  Warnings:

  - You are about to drop the column `shortUrl` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Link` table. All the data in the column will be lost.
  - The `clickCount` column on the `Link` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[code]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "shortUrl",
DROP COLUMN "url",
ADD COLUMN     "code" TEXT,
ADD COLUMN     "lastVisited" TIMESTAMP(3),
ADD COLUMN     "link" TEXT NOT NULL,
DROP COLUMN "clickCount",
ADD COLUMN     "clickCount" INTEGER DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Link_code_key" ON "Link"("code");
