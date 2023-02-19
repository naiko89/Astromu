<?php

namespace App\Entity;

use App\Repository\AssociationContaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AssociationContaRepository::class)]
class AssociationConta
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $creation = null;

    #[ORM\ManyToOne(inversedBy: 'associationCont')]
    private ?Creator $creator = null;

    #[ORM\ManyToOne(inversedBy: 'associationCont')]
    private ?Group $team = null;

    #[ORM\ManyToOne(inversedBy: 'associationCont')]
    private ?Container $container = null;

    #[ORM\OneToMany(mappedBy: 'associationConta', targetEntity: AssociationCompo::class, cascade: ["remove"])]
    private Collection $assoChain;

    public function __construct()
    {
        $this->assoChain = new ArrayCollection();
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

    public function getContainer(): ?Container
    {
        return $this->container;
    }

    public function setContainer(?Container $container): self
    {
        $this->container = $container;

        return $this;
    }

    /**
     * @return Collection<int, AssociationCompo>
     */
    public function getAssoChain(): Collection
    {
        return $this->assoChain;
    }

    public function addAssoChain(AssociationCompo $assoChain): self
    {
        if (!$this->assoChain->contains($assoChain)) {
            $this->assoChain->add($assoChain);
            $assoChain->setAssociationConta($this);
        }

        return $this;
    }

    public function removeAssoChain(AssociationCompo $assoChain): self
    {
        if ($this->assoChain->removeElement($assoChain)) {
            // set the owning side to null (unless already changed)
            if ($assoChain->getAssociationConta() === $this) {
                $assoChain->setAssociationConta(null);
            }
        }

        return $this;
    }
}
