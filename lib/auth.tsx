import prisma from "./prisma.js";

type AuthFunction = (
  [string | string[], string | string[]]
)

export async function Auth(req:AuthFunction) {
  try{
      const [key, id] = req;
      const user = await prisma.User.findUnique({
        where: { id },
      });

      if (user.id === id && user.s_key === key) {
        return(true);
      }else{
        return(false);
    }
    } catch (error) {
      console.error(error);
  }
}
