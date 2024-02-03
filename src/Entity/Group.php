<?php

namespace App\Entity;

use App\Repository\GroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: GroupRepository::class)]
#[ORM\Table(name: '`group`')]
class Group
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['groupList:read','researchFormContAuthor:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['groupList:read','researchFormContAuthor:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $mtype = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dataOn = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dataOff = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $labels = null;

    #[ORM\Column(nullable: true)]
    private ?int $nPublished = null;

    #[ORM\ManyToOne(inversedBy: 'groups')]
    private ?Nation $nation = null;

    #[ORM\ManyToOne(inversedBy: 'groupsSubNation')]
    private ?SubNation $subNation = null;

    #[ORM\OneToMany(mappedBy: 'team', targetEntity: AssociationCompo::class)]
    private Collection $associationComp;

    #[ORM\OneToMany(mappedBy: 'team', targetEntity: AssociationConta::class)]
    private Collection $associationCont;

    #[ORM\OneToMany(mappedBy: 'team', targetEntity: BuildingGroupCreator::class)]
    private Collection $associationCreator;

    #[ORM\Column]
    private ?bool $isAssociated = null;

    #[ORM\Column(nullable: true)]
    private ?int $nCollaborated = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    private $photo = null;

    public function __construct()
    {
        $this->compositions = new ArrayCollection();
        $this->associationCont = new ArrayCollection();
        $this->associationCreator = new ArrayCollection();
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

    public function getMtype(): ?string
    {
        return $this->mtype;
    }

    public function setMtype(?string $mtype): self
    {
        $this->mtype = $mtype;

        return $this;
    }

    public function getDataOn(): ?\DateTimeInterface
    {
        return $this->dataOn;
    }

    public function setDataOn(\DateTimeInterface $dataOn): self
    {
        $this->dataOn = $dataOn;

        return $this;
    }

    public function getDataOff(): ?\DateTimeInterface
    {
        return $this->dataOff;
    }

    public function setDataOff(?\DateTimeInterface $dataOff): self
    {
        $this->dataOff = $dataOff;

        return $this;
    }

    public function getLabels(): ?string
    {
        return $this->labels;
    }

    public function setLabels(?string $labels): self
    {
        $this->labels = $labels;

        return $this;
    }

    public function getNPublished(): ?int
    {
        return $this->nPublished;
    }

    public function setNPublished(?int $nPublished): self
    {
        $this->nPublished = $nPublished;

        return $this;
    }

    public function getNation(): ?Nation
    {
        return $this->nation;
    }

    public function setNation(?Nation $nation): self
    {
        $this->nation = $nation;

        return $this;
    }

    public function getSubNation(): ?SubNation
    {
        return $this->subNation;
    }

    public function setSubNation(?SubNation $subNation): self
    {
        $this->subNation = $subNation;

        return $this;
    }

    /**
     * @return Collection<int, AssociationCompo>
     */
    public function getAssociationComp(): Collection
    {
        return $this->associationComp;
    }

    public function addAssociationComp(AssociationCompo $associationComp): self
    {
        if (!$this->associationComp->contains($associationComp)) {
            $this->associationComp->add($associationComp);
            $associationComp->setTeam($this);
        }

        return $this;
    }

    public function removeAssociationComp(AssociationCompo $associationComp): self
    {
        if ($this->associationComp->removeElement($associationComp)) {
            // set the owning side to null (unless already changed)
            if ($associationComp->getTeam() === $this) {
                $associationComp->setTeam(null);
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
            $associationCont->setTeam($this);
        }

        return $this;
    }

    public function removeAssociationCont(AssociationConta $associationCont): self
    {
        if ($this->associationCont->removeElement($associationCont)) {
            // set the owning side to null (unless already changed)
            if ($associationCont->getTeam() === $this) {
                $associationCont->setTeam(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, BuildingGroupCreator>
     */
    public function getAssociationCreator(): Collection
    {
        return $this->associationCreator;
    }

    public function addAssociationCreator(BuildingGroupCreator $associationCreator): self
    {
        if (!$this->associationCreator->contains($associationCreator)) {
            $this->associationCreator->add($associationCreator);
            $associationCreator->setTeam($this);
        }

        return $this;
    }

    public function removeAssociationCreator(BuildingGroupCreator $associationCreator): self
    {
        if ($this->associationCreator->removeElement($associationCreator)) {
            // set the owning side to null (unless already changed)
            if ($associationCreator->getTeam() === $this) {
                $associationCreator->setTeam(null);
            }
        }

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

    public function getNCollaborated(): ?int
    {
        return $this->nCollaborated;
    }

    public function setNCollaborated(?int $nCollaborated): self
    {
        $this->nCollaborated = $nCollaborated;

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
