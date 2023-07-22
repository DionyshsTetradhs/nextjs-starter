import prisma from "./prisma.js";

export async function Auth(req:string[]) {
  try{
      const [key, id] = req;
      const user = await prisma.User.findUnique({
        where: { id },
      });

      if (user.id === id && user.s_key === key) {
        return(true);
      }
    } catch (error) {
      console.error(error);
      return(false);
  }
}
