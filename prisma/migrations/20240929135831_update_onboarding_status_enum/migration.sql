-- CreateEnum
CREATE TYPE "FirstPrepStatus" AS ENUM ('YES', 'MIDWAY', 'NOTSTARTED', 'DECLINED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "first_prep" "FirstPrepStatus" NOT NULL DEFAULT 'NOTSTARTED';
