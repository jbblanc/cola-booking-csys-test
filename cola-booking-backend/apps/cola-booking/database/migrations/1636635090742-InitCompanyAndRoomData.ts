import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCompanyAndRoomData1636635090742 implements MigrationInterface {
  name = 'InitCompanyAndRoomData1636635090742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "company" ("createdOn", "lastModifiedOn", status, id, name) 
        VALUES (now(), now(), 1, '69cd39b3-0ec6-418c-a89a-1485fe300f4c', 'Pepsi')
        `);
    await queryRunner.query(`
        INSERT INTO "company" ("createdOn", "lastModifiedOn", status, id, name) 
        VALUES (now(), now(), 1, '01a233e2-81db-4410-8878-4facdd4977e9', 'Coke')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '265c54a1-be8b-460f-a933-e0d4bfe0f5b7', 'C01', (SELECT id from company where name = 'Coke'), '4')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '77896d54-cf74-4766-88a0-c1b9770457e3', 'C02', (SELECT id from company where name = 'Coke'), '4')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '1be35b26-472c-4835-a713-08176d54e017', 'C03', (SELECT id from company where name = 'Coke'), '3')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, 'fa82afb1-8427-4046-8a16-681509826b27', 'C04', (SELECT id from company where name = 'Coke'), '3')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, 'de7b070e-ae9f-4061-a14d-621d21ea1fb9', 'C05', (SELECT id from company where name = 'Coke'), '2')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '6eb5d5dd-0179-4e87-8996-cfcfb4dd86a0', 'C06', (SELECT id from company where name = 'Coke'), '2')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '258f0a6a-d100-4cdd-91b4-4569563ccc03', 'C07', (SELECT id from company where name = 'Coke'), '6')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '653fabe3-d18d-4ef1-83e1-20e5b0176a40', 'C08', (SELECT id from company where name = 'Coke'), '6')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '2d83331a-b09d-438e-9590-9ccfbea4c38c', 'C09', (SELECT id from company where name = 'Coke'), '7')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '27ca0c12-a873-4100-b954-712175c52d88', 'C10', (SELECT id from company where name = 'Coke'), '7')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, 'aee412f5-38bd-4e9c-ba22-f98271e48a95', 'P01', (SELECT id from company where name = 'Pepsi'), '5')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, 'e2918d04-b371-419b-94a1-32ef793b7f93', 'P02', (SELECT id from company where name = 'Pepsi'), '5')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, 'c825e264-81c8-4c13-aa47-8dfb8ef3cf2a', 'P03', (SELECT id from company where name = 'Pepsi'), '6')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '6caa16bb-6d67-4db6-966e-6d4aa72d1fc1', 'P04', (SELECT id from company where name = 'Pepsi'), '6')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '2140d92f-74c1-4e44-8248-5a863ff64024', 'P05', (SELECT id from company where name = 'Pepsi'), '2')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '56250630-f482-4d83-9806-56bbc61f9f99', 'P06', (SELECT id from company where name = 'Pepsi'), '2')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, 'bb121eb1-fd16-4e81-b547-ad329ab5e68b', 'P07', (SELECT id from company where name = 'Pepsi'), '8')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '2185a19b-2e19-49ed-a77a-1f6b1949d194', 'P08', (SELECT id from company where name = 'Pepsi'), '8')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, 'cfd79cc3-e49f-49bc-a196-66771c5ab109', 'P09', (SELECT id from company where name = 'Pepsi'), '3')
        `);
    await queryRunner.query(`
        INSERT INTO "room" ("createdOn", "lastModifiedOn", status, id, code, "companyId", floor) 
        VALUES (now(), now(), 1, '4cd5c41d-6770-4820-ad85-255bd1dea4ea', 'P10', (SELECT id from company where name = 'Pepsi'), '3')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "company"
        `);
    await queryRunner.query(`
        DELETE FROM "room"
    `);
  }
}
