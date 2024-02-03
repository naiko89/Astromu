<?php

namespace App\Entity;

use App\Repository\CompositionPiecesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompositionPiecesRepository::class)]
class CompositionPieces
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $text = null;

    #[ORM\Column(length: 5)]
    private ?string $sectionType = null;

    #[ORM\ManyToOne(inversedBy: 'peaces')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Composition $composition = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $hashes = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getSectionType(): ?string
    {
        return $this->sectionType;
    }

    public function setSectionType(string $sectionType): self
    {
        $this->sectionType = $sectionType;

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

    public function getHashes(): ?string
    {
        return $this->hashes;
    }

    public function setHashes(?string $hashes): self
    {
        $this->hashes = $hashes;

        return $this;
    }
}
