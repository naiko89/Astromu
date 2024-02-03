<?php

namespace App\Entity;

use App\Repository\VisitesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VisitesRepository::class)]
class Visites
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 15)]
    private ?string $ip = null;

    #[ORM\Column(length: 510, nullable: true)]
    private ?string $system = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $connection = null;

    #[ORM\Column]
    private ?bool $login = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $Date = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIp(): ?string
    {
        return $this->ip;
    }

    public function setIp(string $ip): static
    {
        $this->ip = $ip;

        return $this;
    }

    public function getSystem(): ?string
    {
        return $this->system;
    }

    public function setSystem(?string $system): static
    {
        $this->system = $system;

        return $this;
    }

    public function getConnection(): ?string
    {
        return $this->connection;
    }

    public function setConnection(?string $connection): static
    {
        $this->connection = $connection;

        return $this;
    }

    public function isLogin(): ?bool
    {
        return $this->login;
    }

    public function setLogin(bool $login): static
    {
        $this->login = $login;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->Date;
    }

    public function setDate(\DateTimeInterface $Date): static
    {
        $this->Date = $Date;

        return $this;
    }

}
