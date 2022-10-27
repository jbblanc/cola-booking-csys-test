import {MigrationInterface, QueryRunner} from "typeorm";

export class Room1636484349934 implements MigrationInterface {
    name = 'Room1636484349934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "room" (
                "createdOn" TIMESTAMP NOT NULL DEFAULT now(),
                "lastModifiedOn" TIMESTAMP DEFAULT now(),
                "status" smallint NOT NULL,
                "id" character varying(36) NOT NULL,
                "code" character varying(20),
                "companyId" character varying(50) NOT NULL,
                "floor" character varying(20),
                CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "room"
        `);
    }

}
