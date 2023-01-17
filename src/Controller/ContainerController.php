<?php

namespace App\Controller;

use App\Repository\CompositionRepository;
use App\Repository\ContainerRepository;
use App\Repository\CreatorRepository;
use App\Service\SerializationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContainerController extends AbstractController
{
    /**
     * @Route("/api/container/{value}", name="container_index", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function index($value,Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
        , SerializationService $serializationService): JsonResponse
    {
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    dump($containerRepository->finByName($value));
                    return new JsonResponse($serializationService->serialize($containerRepository->finByName($value),'researchFormCompContainer:read'));
                    break;
                case 'POST':
                    // Crea una nuova composizione
                    dump('sei in post aggiungi una o più');
                    break;
                case 'PUT':
                    dump('sei nel PUT modifica una');
                    // Aggiorna una composizione esistente
                    break;
                case 'DELETE':
                    dump('elimina una o forse più vediamo');
                    // Elimina una composizione
                    break;
            }
            //return new JsonResponse (['prova'=>'ciao']);


    }
}
