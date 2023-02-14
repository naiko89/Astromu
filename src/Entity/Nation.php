<?php

namespace App\Entity;

use App\Repository\NationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NationRepository::class)]
class Nation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 3)]
    private ?string $zipCode = null;

    #[ORM\OneToMany(mappedBy: 'nation', targetEntity: Creator::class)]
    private Collection $creators;

    #[ORM\OneToMany(mappedBy: 'nation', targetEntity: Group::class)]
    private Collection $groups;

    #[ORM\OneToMany(mappedBy: 'nation', targetEntity: SubNation::class)]
    private Collection $subnations;

    #[ORM\OneToMany(mappedBy: 'nation', targetEntity: Creator::class)]
    private Collection $cratorsNation;

    public function __construct()
    {
        $this->creators = new ArrayCollection();
        $this->groups = new ArrayCollection();
        $this->subnations = new ArrayCollection();
        $this->cratorsNation = new ArrayCollection();
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

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): self
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    /**
     * @return Collection<int, Creator>
     */
    public function getCreators(): Collection
    {
        return $this->creators;
    }

    public function addCreator(Creator $creator): self
    {
        if (!$this->creators->contains($creator)) {
            $this->creators->add($creator);
            $creator->setNation($this);
        }

        return $this;
    }

    public function removeCreator(Creator $creator): self
    {
        if ($this->creators->removeElement($creator)) {
            // set the owning side to null (unless already changed)
            if ($creator->getNation() === $this) {
                $creator->setNation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Group>
     */
    public function getGroups(): Collection
    {
        return $this->groups;
    }

    public function addGroup(Group $group): self
    {
        if (!$this->groups->contains($group)) {
            $this->groups->add($group);
            $group->setNation($this);
        }

        return $this;
    }

    public function removeGroup(Group $group): self
    {
        if ($this->groups->removeElement($group)) {
            // set the owning side to null (unless already changed)
            if ($group->getNation() === $this) {
                $group->setNation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, SubNation>
     */
    public function getSubnations(): Collection
    {
        return $this->subnations;
    }

    public function addSubnation(SubNation $subnation): self
    {
        if (!$this->subnations->contains($subnation)) {
            $this->subnations->add($subnation);
            $subnation->setNation($this);
        }

        return $this;
    }

    public function removeSubnation(SubNation $subnation): self
    {
        if ($this->subnations->removeElement($subnation)) {
            // set the owning side to null (unless already changed)
            if ($subnation->getNation() === $this) {
                $subnation->setNation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Creator>
     */
    public function getCratorsNation(): Collection
    {
        return $this->cratorsNation;
    }

    public function addCratorsNation(Creator $cratorsNation): self
    {
        if (!$this->cratorsNation->contains($cratorsNation)) {
            $this->cratorsNation->add($cratorsNation);
            $cratorsNation->setNation($this);
        }

        return $this;
    }

    public function removeCratorsNation(Creator $cratorsNation): self
    {
        if ($this->cratorsNation->removeElement($cratorsNation)) {
            // set the owning side to null (unless already changed)
            if ($cratorsNation->getNation() === $this) {
                $cratorsNation->setNation(null);
            }
        }

        return $this;
    }
}
