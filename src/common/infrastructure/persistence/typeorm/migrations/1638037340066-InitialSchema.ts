import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1638037340066 implements MigrationInterface {
    name = 'InitialSchema1638037340066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Feedback\` (\`timestamp\` varchar(30) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`mother_id\` bigint UNSIGNED NULL, \`specialist_id\` bigint UNSIGNED NULL, UNIQUE INDEX \`UQ_Feedback_id\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mothers\` (\`name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`password\` varchar(15) NOT NULL, \`age\` int NOT NULL, UNIQUE INDEX \`UQ_mothers_email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`specialist\` (\`name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`actual_charge\` varchar(75) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`password\` varchar(15) NOT NULL, \`age\` int NOT NULL, UNIQUE INDEX \`UQ_obstetricians_email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP COLUMN \`specialist_id\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD \`specialist_id\` bigint UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD \`message\` varchar(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD \`from\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD \`to\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP COLUMN \`to\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP COLUMN \`from\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP COLUMN \`specialist_id\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD \`specialist_id\` bigint UNSIGNED NULL`);
        await queryRunner.query(`DROP INDEX \`UQ_specialist_email\` ON \`specialist\``);
        await queryRunner.query(`DROP TABLE \`specialist\``);
        await queryRunner.query(`DROP INDEX \`UQ_specialist_email\` ON \`fathers\``);
        await queryRunner.query(`DROP TABLE \`specialist\``);
        await queryRunner.query(`DROP INDEX \`UQ_Feedback_id\` ON \`Feedback\``);
        await queryRunner.query(`DROP TABLE \`Feedback\``);
    }

}
