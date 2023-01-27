<?php

namespace App\Entity;

use App\Repository\ContainerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    #[ORM\ManyToOne(inversedBy: 'containers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['researchFormCompContainer:read','containerList:read','researchFormContCreator:read'])]
    private ?Creator $creator = null;

    #[ORM\OneToMany(mappedBy: 'container', targetEntity: Composition::class, orphanRemoval: true)]
    private Collection $compositions;

    public function __construct()
    {
        $this->compositions = new ArrayCollection();
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

    public function getCreator(): ?Creator
    {
        return $this->creator;
    }

    public function setCreator(?Creator $creator): self
    {
        $this->creator = $creator;

        return $this;
    }

    /**
     * @return Collection<int, Composition>
     */
    public function getCompositions(): Collection
    {
        return $this->compositions;
    }

    public function addComposition(Composition $composition): self
    {
        if (!$this->compositions->contains($composition)) {
            $this->compositions->add($composition);
            $composition->setContainer($this);
        }

        return $this;
    }

    public function removeComposition(Composition $composition): self
    {
        if ($this->compositions->removeElement($composition)) {
            // set the owning side to null (unless already changed)
            if ($composition->getContainer() === $this) {
                $composition->setContainer(null);
            }
        }

        return $this;
    }
}
