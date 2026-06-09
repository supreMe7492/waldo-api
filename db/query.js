const { prisma } = require("../lib/prisma");

async function selectImgPath(id) {
  return prisma.image.findFirst({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = { selectImgPath };
