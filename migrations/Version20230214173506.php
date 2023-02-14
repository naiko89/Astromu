<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230214173506 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE association_conta ADD association_compo_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE association_conta ADD CONSTRAINT FK_3F7284AEC7885B67 FOREIGN KEY (association_compo_id) REFERENCES association_compo (id)');
        $this->addSql('CREATE INDEX IDX_3F7284AEC7885B67 ON association_conta (association_compo_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE association_conta DROP FOREIGN KEY FK_3F7284AEC7885B67');
        $this->addSql('DROP INDEX IDX_3F7284AEC7885B67 ON association_conta');
        $this->addSql('ALTER TABLE association_conta DROP association_compo_id');
    }
}
