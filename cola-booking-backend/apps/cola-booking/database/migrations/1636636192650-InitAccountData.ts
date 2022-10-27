import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitAccountData1636636192650 implements MigrationInterface {
  name = 'InitAccountData1636636192650';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "account" ("createdOn", "lastModifiedOn", status, id, roles, "hasAcceptedTerms", "hasConsentedDataProcessing", "lastName", "firstName", email, gender, "avatarUrl", "jobPosition", "credentialsPassword", "credentialsSalt", "companyId") 
    VALUES (now(), now(), 1, 'c6f5e29e-8f82-4d56-aaa4-30fe3d16ff65', '1', true, true, 'Moore', 'Angus', 'employee_b@pepsi.com', 'Not Mentioned', 'https://i.pravatar.cc/150?img=12', 'Account Manager', '$2b$10$R5b18CaIPg0em.2txJJTAuOavEtyvAnjOvKeX6F7LeuH5o8BZh7a.', '$2b$10$R5b18CaIPg0em.2txJJTAu', (SELECT id from company where name = 'Pepsi'));
        `);
    await queryRunner.query(`
    INSERT INTO "account" ("createdOn", "lastModifiedOn", status, id, roles, "hasAcceptedTerms", "hasConsentedDataProcessing", "lastName", "firstName", email, gender, "avatarUrl", "jobPosition", "credentialsPassword", "credentialsSalt", "companyId") 
    VALUES (now(), now(), 1, 'f97a7c4e-8a58-4158-a7a1-33bece94b18e', '1', true, true, 'Langworth', 'Vinnie', 'employee_a@coke.com', 'Not Mentioned', 'https://i.pravatar.cc/150?img=45', 'Head of Supply Chain', '$2b$10$R8XwWegyIqWJ8TndaeCQp.sFTk3sKBc9TCTv1s4bmtebjGTiKiK..', '$2b$10$R8XwWegyIqWJ8TndaeCQp.', (SELECT id from company where name = 'Coke'));
        `);
    await queryRunner.query(`
    INSERT INTO "account" ("createdOn", "lastModifiedOn", status, id, roles, "hasAcceptedTerms", "hasConsentedDataProcessing", "lastName", "firstName", email, gender, "avatarUrl", "jobPosition", "credentialsPassword", "credentialsSalt", "companyId") 
    VALUES (now(), now(), 1, '08691e56-eb2c-4ada-b79e-5370a11986cc', '3', true, true, 'Runolfsdottir', 'Kolby', 'admin@colacorp.com', 'Not Mentioned', 'https://i.pravatar.cc/150?img=7', 'Engineering Manager', '$2b$10$vx1lJEcmvGKukjNtZZr6QuD2vHJEP8WXm72hg.GMISnKIbEkong6W', '$2b$10$vx1lJEcmvGKukjNtZZr6Qu', (SELECT id from company where name = 'Pepsi'));
        `);
    await queryRunner.query(`
    INSERT INTO "account" ("createdOn", "lastModifiedOn", status, id, roles, "hasAcceptedTerms", "hasConsentedDataProcessing", "lastName", "firstName", email, gender, "avatarUrl", "jobPosition", "credentialsPassword", "credentialsSalt", "companyId") 
    VALUES (now(), now(), 1, '6294d540-d52a-4586-bb50-0fb7e37c4e5e', '1', true, true, 'Connelly', 'Harmony', 'employee_b@coke.com', 'Not Mentioned', 'https://i.pravatar.cc/150?img=35', 'Sales Assistant', '$2b$10$GJUd6C0njXdRLVyoHlyExuLZhd8tNHnI9WRLyWE/Nr7lG0QCMG496', '$2b$10$GJUd6C0njXdRLVyoHlyExu', (SELECT id from company where name = 'Coke'));
        `);
    await queryRunner.query(`
    INSERT INTO "account" ("createdOn", "lastModifiedOn", status, id, roles, "hasAcceptedTerms", "hasConsentedDataProcessing", "lastName", "firstName", email, gender, "avatarUrl", "jobPosition", "credentialsPassword", "credentialsSalt", "companyId") 
    VALUES (now(), now(), 1, '398fb2b6-0c87-4534-80da-758aaecc7423', '1', true, true, 'Homenick', 'Barry', 'employee_a@pepsi.com', 'Not Mentioned', 'https://i.pravatar.cc/150?img=8', 'Sales Assistant', '$2b$10$bIflsQuroKVif6FFuxPJE.jiTkVcXyUGyyTpG2Nz.YJvB9X4rjK46', '$2b$10$bIflsQuroKVif6FFuxPJE.', (SELECT id from company where name = 'Pepsi'));
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "account"
        `);
  }
}
