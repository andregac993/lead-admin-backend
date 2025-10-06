/*
  Warnings:

  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `api_keys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."api_keys" DROP CONSTRAINT "api_keys_landing_page_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."api_keys" DROP CONSTRAINT "api_keys_user_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updated_at";

-- DropTable
DROP TABLE "public"."api_keys";
