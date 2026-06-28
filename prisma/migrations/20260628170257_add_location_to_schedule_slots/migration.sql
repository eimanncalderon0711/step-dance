/*
  Warnings:

  - Added the required column `location` to the `schedule_slots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedule_slots" ADD COLUMN     "location" TEXT NOT NULL;
