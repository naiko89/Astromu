<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230301133518 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE container ADD photo VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE creator ADD n_published INT DEFAULT NULL, ADD n_collaborated INT DEFAULT NULL');
        $this->addSql('ALTER TABLE `group` ADD n_collaborated INT DEFAULT NULL, ADD description LONGTEXT DEFAULT NULL, ADD photo VARCHAR(255) DEFAULT NULL, CHANGE npublished n_published INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE container DROP photo');
        $this->addSql('ALTER TABLE creator DROP n_published, DROP n_collaborated');
        $this->addSql('ALTER TABLE `group` ADD npublished INT DEFAULT NULL, DROP n_published, DROP n_collaborated, DROP description, DROP photo');
    }
}
