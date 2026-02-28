-- AlterTable (safe for existing rows)
ALTER TABLE "Appointment"
ADD COLUMN IF NOT EXISTS "reminderSentAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "serviceType" TEXT;

UPDATE "Appointment"
SET "serviceType" = 'Belirtilmedi'
WHERE "serviceType" IS NULL;

ALTER TABLE "Appointment"
ALTER COLUMN "serviceType" SET DEFAULT 'Belirtilmedi',
ALTER COLUMN "serviceType" SET NOT NULL;
