<?php

namespace App\Entity;

use App\Repository\AssociationCompoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    #[ORM\ManyToOne(inversedBy: 'assoChain')]
    private ?AssociationConta $associationConta = null;

    #[ORM\ManyToOne(inversedBy: 'assoChain')]
    private ?Composition $composition = null;

    public function __construct()
    {
    }

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

    public function getAssociationConta(): ?AssociationConta
    {
        return $this->associationConta;
    }

    public function setAssociationConta(?AssociationConta $associationConta): self
    {
        $this->associationConta = $associationConta;

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
