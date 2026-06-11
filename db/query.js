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

async function insertGame(imgId) {
  const gameSess = await prisma.gamesession.create({
    data: {
      imgId: parseInt(imgId),
    },
  });

  return gameSess;
}

module.exports = { selectImgPath, selectImgCharacters, insertGame };
