const { prisma } = require("../lib/prisma");

async function selectImg(id) {
  return prisma.image.findFirst({
    where: {
      id,
    },
  });
}

module.exports = { selectImg };
