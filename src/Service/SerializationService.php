<?php

namespace App\Service;

use Symfony\Component\Serializer\SerializerInterface;


class SerializationService
{
    private $serializer;

    public function __construct(SerializerInterface $serializer) {
        $this->constantsValues = ['id' => [],'nome' => []];
        $this->serializer = $serializer;
    }

    public function serialize($data) {
        $data = $this->serializer->normalize($data, null, ['groups' => 'compositionsList:read']);
        return $this->serializer->serialize($data, 'json');
    }
}