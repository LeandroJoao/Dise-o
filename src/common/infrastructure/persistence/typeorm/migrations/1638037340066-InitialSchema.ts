import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1638037340066 implements MigrationInterface {
    name = 'InitialSchema1638037340066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Chat\` (\`timestamp\` varchar(30) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`father_id\` bigint UNSIGNED NULL, \`specialist_id\` bigint UNSIGNED NULL, UNIQUE INDEX \`UQ_Chat_id\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fathers\` (\`firstName\` varchar(75) NOT NULL, \`lastName\` varchar(75) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`password\` varchar(15) NOT NULL, \`UQ_fathers_email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`specialist\` (\`firstName\` varchar(75) NOT NULL, \`lastName\` varchar(75) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`password\` varchar(15) NOT NULL, \`CNum\` int NOT NULL, UNIQUE INDEX \`UQ_specialists_email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Chat\` DROP COLUMN \`specialist_id\``);
        await queryRunner.query(`ALTER TABLE \`Chat\` ADD \`specialist_id\` bigint UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`Chat\` ADD \`message\` varchar(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Chat\` ADD \`from\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Chat\` ADD \`to\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Chat\` DROP COLUMN \`to\``);
        await queryRunner.query(`ALTER TABLE \`Chat\` DROP COLUMN \`from\``);
        await queryRunner.query(`ALTER TABLE \`Chat\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`Chat\` DROP COLUMN \`specialist_id\``);
        await queryRunner.query(`ALTER TABLE \`Chat\` ADD \`specialist_id\` bigint UNSIGNED NULL`);
        await queryRunner.query(`DROP INDEX \`UQ_specialist_email\` ON \`specialist\``);
        await queryRunner.query(`DROP TABLE \`specialist\``);
        await queryRunner.query(`DROP INDEX \`UQ_specialist_email\` ON \`fathers\``);
        await queryRunner.query(`DROP TABLE \`specialist\``);
        await queryRunner.query(`DROP INDEX \`UQ_Chat_id\` ON \`Chat\``);
        await queryRunner.query(`DROP TABLE \`Chat\``);
    }

}
