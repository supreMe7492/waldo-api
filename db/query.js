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

async function selectfoundCharacter(chId, gmId) {
  return prisma.chfound.findFirst({
    where: {
      gmId,
      chId: parseInt(chId),
    },
  });
}

async function selectGameImg(gmId) {
  return prisma.gamesession.findFirst({
    where: {
      id: gmId,
    },
  });
}

async function selecAllFound(gmId) {
  return prisma.chfound.findMany({
    where: {
      gmId,
    },
  });
}

async function insertEndTime(gmId) {
  return prisma.gamesession.update({
    where: {
      id: gmId,
    },
    data: {
      ended_at: new Date(),
    },
  });
}

module.exports = {
  selectImgPath,
  selectImgCharacters,
  insertGame,
  insertFound,
  selectCharacter,
  selectfoundCharacter,
  selectGameImg,
  selecAllFound,
  insertEndTime,
};
