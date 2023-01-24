<?php

namespace App\Controller;

use App\Entity\Composition;
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
     * @Route("/api/compositions", name="compositions_index", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function index(Request $request,
                          CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository,
                          SerializationService $serializationService): JsonResponse
    {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                $text=$request->query->get('text');
                dump($text);
                if($text === null || $text === ''){
                    return new JsonResponse($serializationService->serialize(
                        $compositionRepository->findBy([],['name' => 'ASC'],30),'compositionsList:read')
                    );
                }
                else{
                    return new JsonResponse($serializationService->serialize(
                        $compositionRepository->finByName($text),'compositionsList:read')
                    );
                }
                break;
            case 'POST':
                $composition = new Composition();
                $composition->setName($request->query->get('composition'));
                $composition->setCreator($creatorRepository->findOneBy(['name' => $request->query->get('creator')]));
                $composition->setContainer($containerRepository->findOneBy(['name' => $request->query->get('container')]));
                $compositionRepository->save($composition, true);
                return new JsonResponse([true]);
                break;
            case 'PUT':
                dump('sei nel PUT modifica una');
                // Aggiorna una composizione esistente
                break;
            case 'DELETE':
                $compositionRepository->remove($compositionRepository->findOneBy(['id' => $request->query->get('id')]), true);
                return new JsonResponse([true]);
                // Elimina una composizione
                break;
        }
        //return new JsonResponse (['prova'=>'ciao']);

    }
}
