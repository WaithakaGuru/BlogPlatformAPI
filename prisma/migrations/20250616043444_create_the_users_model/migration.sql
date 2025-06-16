-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "First_Name" TEXT NOT NULL,
    "Last_Name" TEXT NOT NULL,
    "Email_Address" TEXT NOT NULL,
    "Username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_Email_Address_key" ON "users"("Email_Address");
