import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCoreProjectWithAccountAndCompany1636467473570
  implements MigrationInterface
{
  name = 'InitCoreProjectWithAccountAndCompany1636467473570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "domain_event" (
                "createdOn" TIMESTAMP NOT NULL DEFAULT now(),
                "lastModifiedOn" TIMESTAMP DEFAULT now(),
                "status" smallint NOT NULL,
                "id" character varying(36) NOT NULL,
                "occurredOn" TIMESTAMP NOT NULL,
                "performedByAccountId" character varying(100),
                "message" character varying(200),
                "domain" character varying(50),
                "itemId" character varying(100),
                "itemType" character varying(50),
                "context" jsonb,
                CONSTRAINT "PK_f901502d0301da69fb8cebbb8f2" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."account_gender_enum" AS ENUM('Mr', 'Ms', '-', 'Not Mentioned')
        `);
    await queryRunner.query(`
            CREATE TABLE "account" (
                "createdOn" TIMESTAMP NOT NULL DEFAULT now(),
                "lastModifiedOn" TIMESTAMP DEFAULT now(),
                "status" smallint NOT NULL,
                "id" character varying(36) NOT NULL,
                "roles" text NOT NULL,
                "hasAcceptedTerms" boolean NOT NULL,
                "hasConsentedDataProcessing" boolean NOT NULL,
                "lastName" character varying(100),
                "firstName" character varying(100),
                "email" character varying(320),
                "gender" "public"."account_gender_enum" NOT NULL,
                "avatarUrl" character varying(320),
                "jobPosition" character varying(100),
                "credentialsPassword" character varying(100) NOT NULL,
                "credentialsSalt" character varying(100) NOT NULL,
                CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "company" (
                "createdOn" TIMESTAMP NOT NULL DEFAULT now(),
                "lastModifiedOn" TIMESTAMP DEFAULT now(),
                "status" smallint NOT NULL,
                "id" character varying(36) NOT NULL,
                "name" character varying(100),
                CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "company"
        `);
    await queryRunner.query(`
            DROP TABLE "account"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."account_gender_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "domain_event"
        `);
  }
}
