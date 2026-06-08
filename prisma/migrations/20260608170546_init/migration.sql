-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cordsx" DOUBLE PRECISION NOT NULL,
    "cordsy" DOUBLE PRECISION NOT NULL,
    "imgId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gamesession" (
    "id" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),
    "imgId" INTEGER NOT NULL,

    CONSTRAINT "Gamesession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chfound" (
    "id" SERIAL NOT NULL,
    "chId" INTEGER NOT NULL,
    "gmId" TEXT NOT NULL,

    CONSTRAINT "Chfound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "timescore" INTEGER NOT NULL,
    "gmId" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_path_key" ON "Image"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Character_imgId_name_key" ON "Character"("imgId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Chfound_chId_gmId_key" ON "Chfound"("chId", "gmId");

-- CreateIndex
CREATE UNIQUE INDEX "Score_gmId_key" ON "Score"("gmId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gamesession" ADD CONSTRAINT "Gamesession_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chfound" ADD CONSTRAINT "Chfound_chId_fkey" FOREIGN KEY ("chId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chfound" ADD CONSTRAINT "Chfound_gmId_fkey" FOREIGN KEY ("gmId") REFERENCES "Gamesession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_gmId_fkey" FOREIGN KEY ("gmId") REFERENCES "Gamesession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
