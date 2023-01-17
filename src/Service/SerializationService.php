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

    public function serialize($data, $group) {
        $data = $this->serializer->normalize($data, null, ['groups' => $group]);
        return $this->serializer->serialize($data, 'json');
    }
}