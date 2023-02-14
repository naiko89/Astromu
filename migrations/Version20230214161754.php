<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230214161754 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE association_compo ADD container_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE association_compo ADD CONSTRAINT FK_BEE0D2F4BC21F742 FOREIGN KEY (container_id) REFERENCES container (id)');
        $this->addSql('CREATE INDEX IDX_BEE0D2F4BC21F742 ON association_compo (container_id)');
        $this->addSql('ALTER TABLE composition ADD is_associated TINYINT(1) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE association_compo DROP FOREIGN KEY FK_BEE0D2F4BC21F742');
        $this->addSql('DROP INDEX IDX_BEE0D2F4BC21F742 ON association_compo');
        $this->addSql('ALTER TABLE association_compo DROP container_id');
        $this->addSql('ALTER TABLE composition DROP is_associated');
    }
}
