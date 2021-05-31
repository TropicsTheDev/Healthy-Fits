import "dotenv/config";
import { createAuth } from "@keystone-next/auth";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { User } from "./schema/User";
import { Product } from "./schema/Product";
import { ProductImage } from "./schema/ProductImage";
import { CartItem } from "./schema/CartItem";
import { extendGraphqlSchema } from "./mutations/index";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import { insertSeedData } from "./seed-data";
import { sendPasswordResetEmail } from "./utils/mail";

const databaseURL =
  process.env.DATABASE_URL || "mongodbL//localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET || "",
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      // TODO Add data seeding here
      async onConnect(keystone) {
        console.log("Connected to the database!");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
      ProductImage,
      CartItem,
    }),
    extendGraphqlSchema,
    ui: {
      // TODO Change this for roles
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    // TODO Add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      User: "id",
    }),
  })
);
