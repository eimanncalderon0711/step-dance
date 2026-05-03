-- DropForeignKey
ALTER TABLE "schedule_slots" DROP CONSTRAINT "schedule_slots_dayId_fkey";

-- AddForeignKey
ALTER TABLE "schedule_slots" ADD CONSTRAINT "schedule_slots_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "schedule_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;
