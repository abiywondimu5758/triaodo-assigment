/*
  Warnings:

  - Made the column `managing_department_id` on table `Department` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "managing_department_id" SET NOT NULL;
