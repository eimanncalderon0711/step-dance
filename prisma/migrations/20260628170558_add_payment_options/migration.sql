-- CreateTable
CREATE TABLE "payment_options" (
    "id" SERIAL NOT NULL,
    "method" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_options_pkey" PRIMARY KEY ("id")
);
