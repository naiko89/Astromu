<?php

namespace App\Entity;

use App\Repository\DictionaryRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DictionaryRepository::class)]
class Dictionary
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $string = null;

    #[ORM\Column]
    private ?bool $hightFreq = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $declination = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $sillabation = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getString(): ?string
    {
        return $this->string;
    }

    public function setString(string $string): self
    {
        $this->string = $string;

        return $this;
    }

    public function isHightFreq(): ?bool
    {
        return $this->hightFreq;
    }

    public function setHightFreq(bool $hightFreq): self
    {
        $this->hightFreq = $hightFreq;

        return $this;
    }

    public function getDeclination(): ?string
    {
        return $this->declination;
    }

    public function setDeclination(?string $declination): self
    {
        $this->declination = $declination;

        return $this;
    }

    public function getSillabation(): ?string
    {
        return $this->sillabation;
    }

    public function setSillabation(?string $sillabation): self
    {
        $this->sillabation = $sillabation;

        return $this;
    }
}
