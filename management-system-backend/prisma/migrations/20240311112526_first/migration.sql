-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "managingDepartmentId" INTEGER,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);
