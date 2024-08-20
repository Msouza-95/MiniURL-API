/*
  Warnings:

  - You are about to drop the `Click` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_url_id_fkey";

-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_user_id_fkey";

-- DropTable
DROP TABLE "Click";

-- CreateTable
CREATE TABLE "clicks" (
    "id" TEXT NOT NULL,
    "url_id" TEXT,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clicks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE SET NULL ON UPDATE CASCADE;
