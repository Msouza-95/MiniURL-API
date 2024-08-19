-- DropForeignKey
ALTER TABLE "urls" DROP CONSTRAINT "urls_user_id_fkey";

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
