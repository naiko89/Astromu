<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230110065350 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE composition ADD container_id INT NOT NULL');
        $this->addSql('ALTER TABLE composition ADD CONSTRAINT FK_C7F4347BC21F742 FOREIGN KEY (container_id) REFERENCES container (id)');
        $this->addSql('CREATE INDEX IDX_C7F4347BC21F742 ON composition (container_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE composition DROP FOREIGN KEY FK_C7F4347BC21F742');
        $this->addSql('DROP INDEX IDX_C7F4347BC21F742 ON composition');
        $this->addSql('ALTER TABLE composition DROP container_id');
    }
}
