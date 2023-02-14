<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230214131400 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE association_conta DROP FOREIGN KEY FK_3F7284AE87A2E12');
        $this->addSql('DROP INDEX IDX_3F7284AE87A2E12 ON association_conta');
        $this->addSql('ALTER TABLE association_conta CHANGE composition_id container_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE association_conta ADD CONSTRAINT FK_3F7284AEBC21F742 FOREIGN KEY (container_id) REFERENCES container (id)');
        $this->addSql('CREATE INDEX IDX_3F7284AEBC21F742 ON association_conta (container_id)');
        $this->addSql('ALTER TABLE container CHANGE date_publish date_publish DATE DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE container CHANGE date_publish date_publish DATE NOT NULL');
        $this->addSql('ALTER TABLE association_conta DROP FOREIGN KEY FK_3F7284AEBC21F742');
        $this->addSql('DROP INDEX IDX_3F7284AEBC21F742 ON association_conta');
        $this->addSql('ALTER TABLE association_conta CHANGE container_id composition_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE association_conta ADD CONSTRAINT FK_3F7284AE87A2E12 FOREIGN KEY (composition_id) REFERENCES composition (id)');
        $this->addSql('CREATE INDEX IDX_3F7284AE87A2E12 ON association_conta (composition_id)');
    }
}
