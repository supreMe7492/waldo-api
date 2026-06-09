const { prisma } = require("../lib/prisma");

async function main() {
  const img1 = await prisma.image.create({
    data: { path: "/images/waldo1.jpg" },
  });
  const img2 = await prisma.image.create({
    data: { path: "/images/waldo2.jpg" },
  });
  const img3 = await prisma.image.create({
    data: { path: "/images/waldo3.jpg" },
  });

  const character = await prisma.character.createMany({
    data: [
      {
        name: "FallenMan",
        cordsx: 0.323,
        cordsy: 0.338,
        imgId: img1.id,
      },
      {
        name: "Yeti",
        cordsx: 0.933,
        cordsy: 0.115,
        imgId: img1.id,
      },
      {
        name: "TreeMan",
        cordsx: 0.638,
        cordsy: 0.485,
        imgId: img1.id,
      },
      {
        name: "EscapeRunner",
        cordsx: 0.907,
        cordsy: 0.634,
        imgId: img2.id,
      },
      {
        name: "BuriedMan",
        cordsx: 0.196,
        cordsy: 0.581,
        imgId: img2.id,
      },
      {
        name: "TireGuy",
        cordsx: 0.432,
        cordsy: 0.12,
        imgId: img2.id,
      },
      {
        name: "WindowCleaner",
        cordsx: 0.043,
        cordsy: 0.399,
        imgId: img3.id,
      },
      {
        name: "StairSlider",
        cordsx: 0.343,
        cordsy: 0.526,
        imgId: img3.id,
      },
      {
        name: "CrocMan",
        cordsx: 0.726,
        cordsy: 0.7,
        imgId: img3.id,
      },
    ],
  });
}
main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
