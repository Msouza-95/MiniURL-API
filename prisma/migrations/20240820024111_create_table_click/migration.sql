-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL,
    "url_id" TEXT,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE SET NULL ON UPDATE CASCADE;
