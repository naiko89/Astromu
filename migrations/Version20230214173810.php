<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230214173810 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE association_compo ADD association_conta_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE association_compo ADD CONSTRAINT FK_BEE0D2F45443F83A FOREIGN KEY (association_conta_id) REFERENCES association_conta (id)');
        $this->addSql('CREATE INDEX IDX_BEE0D2F45443F83A ON association_compo (association_conta_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE association_compo DROP FOREIGN KEY FK_BEE0D2F45443F83A');
        $this->addSql('DROP INDEX IDX_BEE0D2F45443F83A ON association_compo');
        $this->addSql('ALTER TABLE association_compo DROP association_conta_id');
    }
}
