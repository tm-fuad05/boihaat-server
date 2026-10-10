-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
