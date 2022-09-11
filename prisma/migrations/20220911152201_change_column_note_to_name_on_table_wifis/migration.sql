/*
  Warnings:

  - You are about to drop the column `note` on the `wifis` table. All the data in the column will be lost.
  - Added the required column `name` to the `wifis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wifis" DROP COLUMN "note",
ADD COLUMN     "name" TEXT NOT NULL;
