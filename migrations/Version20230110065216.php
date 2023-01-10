<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230110065216 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE composition ADD creator_id INT NOT NULL');
        $this->addSql('ALTER TABLE composition ADD CONSTRAINT FK_C7F434761220EA6 FOREIGN KEY (creator_id) REFERENCES creator (id)');
        $this->addSql('CREATE INDEX IDX_C7F434761220EA6 ON composition (creator_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE composition DROP FOREIGN KEY FK_C7F434761220EA6');
        $this->addSql('DROP INDEX IDX_C7F434761220EA6 ON composition');
        $this->addSql('ALTER TABLE composition DROP creator_id');
    }
}
