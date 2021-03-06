# Migration `20200627161430-init`

This migration has been generated by Shawn Daichendt at 6/27/2020, 4:14:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "hello-prisma"."Post" (
"authorId" integer  NOT NULL ,"content" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" SERIAL,"published" boolean  NOT NULL DEFAULT false,"title" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "hello-prisma"."Profile" (
"bio" text   ,"id" SERIAL,"userId" integer  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "hello-prisma"."User" (
"email" text  NOT NULL ,"id" SERIAL,"name" text   ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "Profile.userId" ON "hello-prisma"."Profile"("userId")

CREATE UNIQUE INDEX "User.email" ON "hello-prisma"."User"("email")

ALTER TABLE "hello-prisma"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "hello-prisma"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "hello-prisma"."Profile" ADD FOREIGN KEY ("userId")REFERENCES "hello-prisma"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200627161430-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,34 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Post {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  title     String
+  content   String?
+  published Boolean  @default(false)
+  author    User     @relation(fields: [authorId], references: [id])
+  authorId  Int
+}
+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  user   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
+model User {
+  id      Int      @default(autoincrement()) @id
+  email   String   @unique
+  name    String?
+  posts   Post[]
+  profile Profile?
+}
```


