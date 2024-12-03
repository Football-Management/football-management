import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { execSync } from "child_process";

const prisma = new PrismaClient();

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set in environment variables.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schemaId);
  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(randomUUID());

  process.env.DATABASE_URL = databaseUrl;

  execSync("pnpm prisma migrate deploy");
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
