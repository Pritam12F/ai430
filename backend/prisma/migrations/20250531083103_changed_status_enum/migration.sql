/*
  Warnings:

  - The values [IN_PROGRESS] on the enum `CampaignStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CampaignStatus_new" AS ENUM ('UNSCHEDULED', 'SCHEDULED', 'COMPLETED');
ALTER TABLE "Campaign" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Campaign" ALTER COLUMN "status" TYPE "CampaignStatus_new" USING ("status"::text::"CampaignStatus_new");
ALTER TYPE "CampaignStatus" RENAME TO "CampaignStatus_old";
ALTER TYPE "CampaignStatus_new" RENAME TO "CampaignStatus";
DROP TYPE "CampaignStatus_old";
ALTER TABLE "Campaign" ALTER COLUMN "status" SET DEFAULT 'UNSCHEDULED';
COMMIT;

-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "status" SET DEFAULT 'UNSCHEDULED';
