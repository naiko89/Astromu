<?php

namespace App\Entity;

use App\Repository\CompositionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Serializer\Annotation\Groups;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompositionRepository::class)]
class Composition
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('compositionsList:read')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('compositionsList:read')]
    private ?string $name = null;

    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $duration = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $base_text = null;

    #[ORM\ManyToOne(inversedBy: 'compositions')]
    private ?Group $team = null;

    #[ORM\OneToMany(mappedBy: 'composition', targetEntity: AssociationCompo::class, orphanRemoval: true)]
    private Collection $assocaitionComp;

    #[ORM\OneToMany(mappedBy: 'composition', targetEntity: AssociationConta::class)]
    private Collection $associationCont;


    public function __construct()
    {
        $this->assocaitionComp = new ArrayCollection();
        $this->associationCont = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDuration(): ?\DateTimeInterface
    {
        return $this->duration;
    }

    public function setDuration(?\DateTimeInterface $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getBaseText(): ?string
    {
        return $this->base_text;
    }

    public function setBaseText(?string $base_text): self
    {
        $this->base_text = $base_text;

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

    /**
     * @return Collection<int, AssociationCompo>
     */
    public function getAssocaitionComp(): Collection
    {
        return $this->assocaitionComp;
    }

    public function addAssocaitionComp(AssociationCompo $assocaitionComp): self
    {
        if (!$this->assocaitionComp->contains($assocaitionComp)) {
            $this->assocaitionComp->add($assocaitionComp);
            $assocaitionComp->setComposition($this);
        }

        return $this;
    }

    public function removeAssocaitionComp(AssociationCompo $assocaitionComp): self
    {
        if ($this->assocaitionComp->removeElement($assocaitionComp)) {
            // set the owning side to null (unless already changed)
            if ($assocaitionComp->getComposition() === $this) {
                $assocaitionComp->setComposition(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, AssociationConta>
     */
    public function getAssociationCont(): Collection
    {
        return $this->associationCont;
    }

    public function addAssociationCont(AssociationConta $associationCont): self
    {
        if (!$this->associationCont->contains($associationCont)) {
            $this->associationCont->add($associationCont);
            $associationCont->setComposition($this);
        }

        return $this;
    }

    public function removeAssociationCont(AssociationConta $associationCont): self
    {
        if ($this->associationCont->removeElement($associationCont)) {
            // set the owning side to null (unless already changed)
            if ($associationCont->getComposition() === $this) {
                $associationCont->setComposition(null);
            }
        }

        return $this;
    }
}
