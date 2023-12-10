import { registerSchema } from "@/schemas/auth";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";

export const authRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      greeting: `Hello`,
    };
  }),
  registerWithEmailAndPassword: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      let user = await db.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        const newUser = await db.user.create({
          data: {
            email: input.email,
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const hash = await bcrypt.hash(input.password as string, 12);

        await db.account.create({
          data: {
            userId: newUser.id,
            type: "credentials",
            provider: "email",
            password: hash,
          },
        });
      } else {
        const account = await db.account.findFirst({
          where: {
            type: "credentials",
            provider: "email",
            userId: user.id,
          },
        });

        if (account) {
          return false;
        }

        const hash = await bcrypt.hash(input.password, 12);

        await db.account.create({
          data: {
            userId: user.id,
            type: "credentials",
            provider: "email",
            password: hash,
          },
        });
      }

      user = await db.user.findFirst({
        where: {
          email: input.email,
        },
      });

      return true;
    }),
});
