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

async function insertFound(chId, gmId) {
  return prisma.chfound.create({
    data: {
      chId: parseInt(chId),
      gmId: gmId,
    },
  });
}

async function selectCharacter(id) {
  return prisma.character.findFirst({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  selectImgPath,
  selectImgCharacters,
  insertGame,
  insertFound,
  selectCharacter,
};
