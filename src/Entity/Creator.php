<?php

namespace App\Entity;

use App\Repository\CreatorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use MongoDB\BSON\Binary;
use phpDocumentor\Reflection\File;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CreatorRepository::class)]
class Creator
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['compositionsList:read','containerList:read','creatorList:read','groupList:read',
        'researchFormCompContainer:read','researchFormContAuthor:read',
        'researchFormCreatorGroup:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['compositionsList:read','containerList:read','creatorList:read','groupList:read',
        'researchFormCompCreator:read','researchFormContAuthor:read',
        'researchFormCreatorGroup:read'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'creatorsSubNation')]
    private ?SubNation $subNation = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $surname = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;



    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    /**
     * @Assert\DateTime
     * @var string A "Y-m-d H:i:s" formatted value
     */
    private ?\DateTimeInterface $dateBirth = null;

    #[ORM\Column(nullable: true)]
    private ?int $CompNumber = null;

    #[ORM\Column(nullable: true)]
    private ?int $ContNumber = null;

    #[ORM\ManyToOne(inversedBy: 'cratorsNation')]
    private ?Nation $nation = null;

    #[ORM\OneToMany(mappedBy: 'creator', targetEntity: AssociationConta::class)]
    private Collection $associationCont;

    #[ORM\OneToMany(mappedBy: 'creator', targetEntity: BuildingGroupCreator::class)]
    private Collection $associationGroup;

    #[ORM\Column]
    private ?bool $isAssociated = null;

    #[ORM\Column(nullable: true)]
    private ?int $nPublished = null;

    #[ORM\Column(nullable: true)]
    private ?int $nCollaborated = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    private $photo = null;

    public function __construct()
    {
        $this->associationCont = new ArrayCollection();
        $this->associationGroup = new ArrayCollection();
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

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): self
    {
        $this->surname = $surname;

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

    public function getDateBirth(): ?\DateTimeInterface
    {
        return $this->dateBirth;

    }

    public function setDateBirth(\DateTimeInterface $dateBirth): self
    {
        $this->dateBirth = $dateBirth;

        return $this;
    }

    public function getCompNumber(): ?int
    {
        return $this->CompNumber;
    }

    public function setCompNumber(?int $CompNumber): self
    {
        $this->CompNumber = $CompNumber;

        return $this;
    }

    public function getContNumber(): ?int
    {
        return $this->ContNumber;
    }

    public function setContNumber(?int $ContNumber): self
    {
        $this->ContNumber = $ContNumber;

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

    /**
     * @return Collection<int, BuildingGroupCreator>
     */
    public function getAssociationGroup(): Collection
    {
        return $this->associationGroup;
    }

    public function addAssociationGroup(BuildingGroupCreator $associationGroup): self
    {
        if (!$this->associationGroup->contains($associationGroup)) {
            $this->associationGroup->add($associationGroup);
            $associationGroup->setCreator($this);
        }

        return $this;
    }

    public function removeAssociationGroup(BuildingGroupCreator $associationGroup): self
    {
        if ($this->associationGroup->removeElement($associationGroup)) {
            // set the owning side to null (unless already changed)
            if ($associationGroup->getCreator() === $this) {
                $associationGroup->setCreator(null);
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

    public function getNPublished(): ?int
    {
        return $this->nPublished;
    }

    public function setNPublished(?int $nPublished): self
    {
        $this->nPublished = $nPublished;

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
