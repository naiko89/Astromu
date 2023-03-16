<?php

namespace App\Entity;

use App\Repository\BuildingGroupCreatorRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BuildingGroupCreatorRepository::class)]
class BuildingGroupCreator
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dataStart = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateOff = null;

    #[ORM\ManyToOne(inversedBy: 'associationGroup')]
    private ?Group $team = null;

    #[ORM\ManyToOne(inversedBy: 'associationCreator')]
    private ?Creator $creator = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDataStart(): ?\DateTimeInterface
    {
        return $this->dataStart;
    }

    public function setDataStart(?\DateTimeInterface $dataStart): self
    {
        $this->dataStart = $dataStart;

        return $this;
    }

    public function getDateOff(): ?\DateTimeInterface
    {
        return $this->dateOff;
    }

    public function setDateOff(?\DateTimeInterface $dateOff): self
    {
        $this->dateOff = $dateOff;

        return $this;
    }

    public function getTeam(): ?Group
    {
        return $this->team;
    }

    public function setTeam(?Group $team): self
    {
        $this->team = $team;

        return $this;
    }

    public function getCreator(): ?Creator
    {
        return $this->creator;
    }

    public function setCreator(?Creator $creator): self
    {
        $this->creator = $creator;

        return $this;
    }
}
