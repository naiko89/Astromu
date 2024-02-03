<?php

namespace App\Entity;

use App\Repository\ContainerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ContainerRepository::class)]
class Container
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['compositionsList:read','containerList:read', 'researchFormCompContainer:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['compositionsList:read','containerList:read','researchFormCompContainer:read'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $date_publish = null;

    #[ORM\Column(nullable: true)]
    private ?int $comp_number = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $genre = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $label = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $prize_temp = null;

    #[ORM\Column]
    private ?bool $isAssociated = null;

    #[ORM\OneToMany(mappedBy: 'container', targetEntity: AssociationConta::class)]
    private Collection $associationCont;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    private $photo = null;

    public function __construct()
    {}

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

    public function getDatePublish(): ?\DateTimeInterface
    {
        return $this->date_publish;
    }

    public function setDatePublish(\DateTimeInterface $date_publish): self
    {
        $this->date_publish = $date_publish;

        return $this;
    }

    public function getCompNumber(): ?int
    {
        return $this->comp_number;
    }

    public function setCompNumber(?int $comp_number): self
    {
        $this->comp_number = $comp_number;

        return $this;
    }

    public function getGenre(): ?string
    {
        return $this->genre;
    }

    public function setGenre(?string $genre): self
    {
        $this->genre = $genre;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(?string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrizeTemp(): ?string
    {
        return $this->prize_temp;
    }

    public function setPrizeTemp(?string $prize_temp): self
    {
        $this->prize_temp = $prize_temp;

        return $this;
    }

    public function isIsAssociated(): ?bool
    {
        return $this->isAssociated;
    }

    public function setIsAssociated(bool $isAssociated): self
    {
        $this->isAssociated = $isAssociated;

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
            $associationCont->setCreator($this);
        }

        return $this;
    }

    public function removeAssociationCont(AssociationConta $associationCont): self
    {
        if ($this->associationCont->removeElement($associationCont)) {
            // set the owning side to null (unless already changed)
            if ($associationCont->getCreator() === $this) {
                $associationCont->setCreator(null);
            }
        }

        return $this;
    }

    public function getPhoto()
    {
        return $this->photo;
    }

    public function setPhoto($photo): self
    {
        $this->photo = $photo;

        return $this;
    }
}
