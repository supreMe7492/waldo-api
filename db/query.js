const { prisma } = require("../lib/prisma");

async function selectImgPath(id) {
  return prisma.image.findFirst({
    where: {
      id: parseInt(id),
    },
  });
}

async function selectImgCharacters(imgId) {
  return prisma.character.findMany({
    where: {
      imgId: parseInt(imgId),
    },
  });
}

module.exports = { selectImgPath, selectImgCharacters };
