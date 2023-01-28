<?php

namespace App\Controller;

use App\Entity\Creator;
use App\Repository\CompositionRepository;
use App\Repository\ContainerRepository;
use App\Repository\CreatorRepository;
use App\Service\SerializationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CreatorController extends AbstractController
{
    /**
     * @Route("/api/creator", name="creator_index", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function index(Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
        , SerializationService $serializationService): JsonResponse
    {

            $method = $request->getMethod();
            $text = $request->query->get('text');
            switch ($method) {
                case 'GET':
                    dump('sei del get del creatore');
                    dump($serializationService->serialize($creatorRepository->finByName($text),'creatorList:read'));
                    if($text === null || $text === ''){
                        return new JsonResponse($serializationService->serialize(
                            $creatorRepository->findBy([],['name' => 'ASC'],30),'creatorList:read')
                        );
                    }
                    else{
                        return new JsonResponse($serializationService->serialize(
                            $creatorRepository->finByName($text.'%'),'creatorList:read')
                        );
                    }
                    break;
                case 'POST':
                    // Crea una nuova composizione
                    dump($text);
                    break;
                case 'PUT':
                    dump('sei nel PUT modifica una');
                    // Aggiorna una composizione esistente
                    break;
                case 'DELETE':
                    $creatorRepository->remove($creatorRepository->findOneBy(['id' => $request->query->get('id')]), true);
                    return new JsonResponse([true]);
                    break;
            }
            return new JsonResponse (['error']);


    }

    /**
     * @Route("/api/creator/form", name="creator_form", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function researchForForm(Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
        , SerializationService $serializationService): JsonResponse
    {

            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    //$text = $request->query->get('text');
                    //return new JsonResponse($serializationService->serialize($creatorRepository->finByName($text),'researchFormContCreator:read'));
                    break;
                case 'POST':
                    // Crea una nuova composizione
                    $creator = new Creator();
                    dump($request->query->get('creator'));
                    $creator->setName($request->query->get('creator'));
                    $creatorRepository->save($creator, true);
                    return new JsonResponse([true]);
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
            return new JsonResponse (['error']);


    }
}
