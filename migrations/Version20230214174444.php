<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230214174444 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE association_compo DROP FOREIGN KEY FK_BEE0D2F4296CD8AE');
        $this->addSql('ALTER TABLE association_compo DROP FOREIGN KEY FK_BEE0D2F487A2E12');
        $this->addSql('ALTER TABLE association_compo DROP FOREIGN KEY FK_BEE0D2F4BC21F742');
        $this->addSql('ALTER TABLE association_compo DROP FOREIGN KEY FK_BEE0D2F461220EA6');
        $this->addSql('DROP INDEX IDX_BEE0D2F4BC21F742 ON association_compo');
        $this->addSql('DROP INDEX IDX_BEE0D2F461220EA6 ON association_compo');
        $this->addSql('DROP INDEX IDX_BEE0D2F4296CD8AE ON association_compo');
        $this->addSql('DROP INDEX IDX_BEE0D2F487A2E12 ON association_compo');
        $this->addSql('ALTER TABLE association_compo DROP creator_id, DROP team_id, DROP composition_id, DROP container_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE association_compo ADD creator_id INT DEFAULT NULL, ADD team_id INT DEFAULT NULL, ADD composition_id INT NOT NULL, ADD container_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE association_compo ADD CONSTRAINT FK_BEE0D2F4296CD8AE FOREIGN KEY (team_id) REFERENCES `group` (id)');
        $this->addSql('ALTER TABLE association_compo ADD CONSTRAINT FK_BEE0D2F487A2E12 FOREIGN KEY (composition_id) REFERENCES composition (id)');
        $this->addSql('ALTER TABLE association_compo ADD CONSTRAINT FK_BEE0D2F4BC21F742 FOREIGN KEY (container_id) REFERENCES container (id)');
        $this->addSql('ALTER TABLE association_compo ADD CONSTRAINT FK_BEE0D2F461220EA6 FOREIGN KEY (creator_id) REFERENCES creator (id)');
        $this->addSql('CREATE INDEX IDX_BEE0D2F4BC21F742 ON association_compo (container_id)');
        $this->addSql('CREATE INDEX IDX_BEE0D2F461220EA6 ON association_compo (creator_id)');
        $this->addSql('CREATE INDEX IDX_BEE0D2F4296CD8AE ON association_compo (team_id)');
        $this->addSql('CREATE INDEX IDX_BEE0D2F487A2E12 ON association_compo (composition_id)');
    }
}
