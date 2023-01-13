<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use App\Repository\CompositionRepository;
use App\Repository\ContainerRepository;
use App\Repository\CreatorRepository;

use App\Service\SerializationService;



class CompositionsController extends AbstractController
{
    /**
     * @Route("/api/compositions/{value}", name="compositions_index", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function index($value,Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
        , SerializationService $serializationService)
    {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                dump($compositionRepository->finByName($value));
                return new JsonResponse($serializationService->serialize($compositionRepository->finByName($value)));
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
