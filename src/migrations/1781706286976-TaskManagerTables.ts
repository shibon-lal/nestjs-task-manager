import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskManagerTables1781706286976 implements MigrationInterface {
    name = 'TaskManagerTables1781706286976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastLoginAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`disabledAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`disabledAt\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`last_login_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`disabled_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`disabled_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`deleted_at\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`disabled_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`disabled_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_login_at\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`disabledAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`disabledAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`lastLoginAt\` timestamp NULL`);
    }

}
