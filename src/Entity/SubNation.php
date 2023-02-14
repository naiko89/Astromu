<?php

namespace App\Entity;

use App\Repository\SubNationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SubNationRepository::class)]
class SubNation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'subnations')]
    private ?Nation $nation = null;

    #[ORM\OneToMany(mappedBy: 'subNation', targetEntity: Creator::class)]
    private Collection $creatorsSubNation;

    #[ORM\OneToMany(mappedBy: 'subNation', targetEntity: Group::class)]
    private Collection $groupsSubNation;


    public function __construct()
    {
        $this->creatorsSubNation = new ArrayCollection();
        $this->groupsSubNation = new ArrayCollection();
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

    /**
     * @return Collection<int, Creator>
     */
    public function getCreatorsSubNation(): Collection
    {
        return $this->creatorsSubNation;
    }

    public function addCreatorsSubNation(Creator $creatorsSubNation): self
    {
        if (!$this->creatorsSubNation->contains($creatorsSubNation)) {
            $this->creatorsSubNation->add($creatorsSubNation);
            $creatorsSubNation->setSubNation($this);
        }

        return $this;
    }

    public function removeCreatorsSubNation(Creator $creatorsSubNation): self
    {
        if ($this->creatorsSubNation->removeElement($creatorsSubNation)) {
            // set the owning side to null (unless already changed)
            if ($creatorsSubNation->getSubNation() === $this) {
                $creatorsSubNation->setSubNation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Group>
     */
    public function getGroupsSubNation(): Collection
    {
        return $this->groupsSubNation;
    }

    public function addGroupsSubNation(Group $groupsSubNation): self
    {
        if (!$this->groupsSubNation->contains($groupsSubNation)) {
            $this->groupsSubNation->add($groupsSubNation);
            $groupsSubNation->setSubNation($this);
        }

        return $this;
    }

    public function removeGroupsSubNation(Group $groupsSubNation): self
    {
        if ($this->groupsSubNation->removeElement($groupsSubNation)) {
            // set the owning side to null (unless already changed)
            if ($groupsSubNation->getSubNation() === $this) {
                $groupsSubNation->setSubNation(null);
            }
        }

        return $this;
    }
}
