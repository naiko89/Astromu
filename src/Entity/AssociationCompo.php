<?php

namespace App\Entity;

use App\Repository\AssociationCompoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AssociationCompoRepository::class)]
class AssociationCompo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['groupList:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['groupList:read'])]
    private ?bool $creation = null;

    #[ORM\ManyToOne(inversedBy: 'associationComp')]
    private ?Creator $creator = null;

    #[ORM\ManyToOne(inversedBy: 'associationComp')]
    private ?Group $team = null;

    #[ORM\ManyToOne(inversedBy: 'associationComp')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Composition $composition = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isCreation(): ?bool
    {
        return $this->creation;
    }

    public function setCreation(bool $creation): self
    {
        $this->creation = $creation;

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

    public function getTeam(): ?Group
    {
        return $this->team;
    }

    public function setTeam(?Group $team): self
    {
        $this->team = $team;

        return $this;
    }

    public function getComposition(): ?Composition
    {
        return $this->composition;
    }

    public function setComposition(?Composition $composition): self
    {
        $this->composition = $composition;

        return $this;
    }
}
