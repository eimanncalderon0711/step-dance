/*
  Warnings:

  - You are about to drop the column `userName` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startTime` on the `schedule_slots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `schedule_slots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "userName",
ADD COLUMN     "fullName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedule_slots" DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;
