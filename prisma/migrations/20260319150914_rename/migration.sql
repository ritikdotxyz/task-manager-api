/*
  Warnings:

  - You are about to drop the column `Status` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "Status",
ADD COLUMN     "status" "taskStatus" NOT NULL DEFAULT 'PENDING';
