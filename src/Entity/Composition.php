<?php

namespace App\Entity;

use App\Repository\CompositionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompositionRepository::class)]
class Composition
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'compositions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Creator $creator = null;

    #[ORM\ManyToOne(inversedBy: 'compositions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Container $container = null;

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

    public function getContainer(): ?Container
    {
        return $this->container;
    }

    public function setContainer(?Container $container): self
    {
        $this->container = $container;

        return $this;
    }
}
