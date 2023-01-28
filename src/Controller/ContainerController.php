<?php

namespace App\Controller;

use App\Entity\Container;
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
     * @Route("/api/container", name="container_index", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function index(Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
        , SerializationService $serializationService): JsonResponse
    {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                $text=$request->query->get('text');
                if($text === null || $text === ''){
                    return new JsonResponse($serializationService->serialize(
                        $containerRepository->findBy([],['name' => 'ASC'],30),'containerList:read')
                    );
                }
                else{
                    return new JsonResponse($serializationService->serialize(
                        $containerRepository->finByName($text.'%'),'containerList:read')
                    );
                }
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
                $containerRepository->remove($containerRepository->findOneBy(['id' => $request->query->get('id')]), true);
                return new JsonResponse([true]);
                // Elimina una composizione
                break;
        }
        return new JsonResponse (['errore']);


    }

    /**
     * @Route("/api/container/form", name="container_form", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function researchForForm(Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
        , SerializationService $serializationService): JsonResponse
    {
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    $text = $request->query->get('text');
                    dump($creatorRepository->finByName($text));
                    return new JsonResponse($serializationService->serialize($creatorRepository->finByName($text),'researchFormContCreator:read'));
                    break;
                case 'POST':
                    $container = new Container();
                    dump($request->query->get('container'));
                    $creator= $creatorRepository->findOneBy(['id' => $request->query->get('creatorId')]);
                    $container->setName($request->query->get('container'))
                        ->setCreator($creator);
                    $containerRepository->save($container, true);
                    return new JsonResponse([true]);
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
            return new JsonResponse (['errore']);


    }




}
