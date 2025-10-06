/*
  Warnings:

  - A unique constraint covering the columns `[user_id,slug]` on the table `landing_pages` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."landing_pages_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "landing_pages_user_id_slug_key" ON "landing_pages"("user_id", "slug");
