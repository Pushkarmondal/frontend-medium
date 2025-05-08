-- Step 1: Add the `username` column as nullable first
ALTER TABLE "user" ADD COLUMN "username" TEXT;

-- Step 2: Migrate data from `userName` to `username` (if necessary)
UPDATE "user" SET "username" = "userName";

-- Step 3: Drop the old `userName` column
ALTER TABLE "user" DROP COLUMN "userName";

-- Step 4: Set the `username` column to `NOT NULL`
ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL;
