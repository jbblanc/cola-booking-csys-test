import {MigrationInterface, QueryRunner} from "typeorm";

export class ReservationAndAccount1636634090837 implements MigrationInterface {
    name = 'ReservationAndAccount1636634090837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "reservation" (
                "createdOn" TIMESTAMP NOT NULL DEFAULT now(),
                "lastModifiedOn" TIMESTAMP DEFAULT now(),
                "status" smallint NOT NULL,
                "id" character varying(36) NOT NULL,
                "timeSlot" TIMESTAMP NOT NULL,
                "durationInMin" integer NOT NULL,
                "roomId" character varying(50) NOT NULL,
                "roomDetails" text,
                "ownerAccountId" character varying(50) NOT NULL,
                "ownerDetails" text,
                "cancelledOn" TIMESTAMP,
                CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "account"
            ADD "companyId" character varying(100)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "account" DROP COLUMN "companyId"
        `);
        await queryRunner.query(`
            DROP TABLE "reservation"
        `);
    }

}
