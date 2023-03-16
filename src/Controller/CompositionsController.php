<?php

namespace App\Controller;

use App\Entity\AssociationCompo;
use App\Entity\Composition;
use App\Entity\Container;
use App\Entity\Creator;

use App\Repository\AssociationCompoRepository;
use App\Repository\AssociationContaRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use App\Repository\CompositionRepository;
use App\Repository\ContainerRepository;
use App\Repository\CreatorRepository;

use App\Service\SerializationService;
use Vanderlee\Syllable\Syllable;


class CompositionsController extends AbstractController
{
    /**
     * @Route("/api/compositions", name="compositions_index", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function index(Request $request,
                          CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository,
                          SerializationService $serializationService, AssociationCompoRepository $associationCompoRepository): JsonResponse
    {
        $method = $request->getMethod();



        switch ($method) {
            case 'GET':
                $text=$request->query->get('text');
                if($text === null || $text === ''){
                    return new JsonResponse($serializationService->serialize(
                        $compositionRepository->findBy(['isAssociated'=>true],['name' => 'ASC'],30),'compositionsList:read')
                    );
                }
                else{
                    return new JsonResponse($serializationService->serialize(
                        $compositionRepository->findByName($text.'%'),'compositionsList:read')
                    );
                }
                break;
            case 'POST':
                /*$composition = new Composition();
                $container = $containerRepository->findOneBy(['id' => $request->query->get('containerId')]);
                $creator= $creatorRepository->findOneBy(['id' => $request->query->get('creatorId')]);
                $composition->setName($request->query->get('composition'))
                    ->setContainer($container)
                    ->setCreator($creator);
                $compositionRepository->save($composition, true);
                */
                return new JsonResponse([true]);
                break;
            case 'PUT':
                dump('sei nel PUT modifica una');
                // Aggiorna una composizione esistente
                break;
            case 'DELETE':
                $composition = $compositionRepository->findOneBy(['id' => $request->query->get('id')]);
                $composition->setIsAssociated(false);
                $compositionRepository->save($composition, true);
                $associationsCompositionArray=$associationCompoRepository->findBy(['composition'=> $composition->getId()]);
                foreach ($associationsCompositionArray as $associationComposition){
                    $associationCompoRepository->remove($associationComposition, true);
                }
                return new JsonResponse([true]);
                break;
        }
        return new JsonResponse (['error']);

    }

    /**
     * @Route("/api/compositions/form", name="compositions_form", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function researchForForm(Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
        , SerializationService $serializationService, AssociationContaRepository $associationContaRepository, AssociationCompoRepository $associationCompoRepository): JsonResponse
    {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                $text=$request->query->get('text');
                dump($containerRepository->findByName($text));
                return new JsonResponse($serializationService->serialize($containerRepository->findByName($text),'researchFormCompContainer:read'));
                break;
            case 'POST'://-->questa query adrà ad associare la composition ai container ed ai rispettivi creator...praticamete setto i creatori della composition nelle associazioni
                $composition = new Composition();
                $composition->setName($request->query->get('composition'))->setIsAssociated(true); //dump($request->query->get('composition').'----'. $request->query->get('containerId'));
                $compositionRepository->save($composition);
                $assoContainer = $associationContaRepository->findBy(['container' => $request->query->get('containerId')]);
                foreach ($assoContainer as $itemEntity) {
                    $assoChain = new AssociationCompo();
                    $assoChain->setAssociationConta($itemEntity)->setCreation(true)->setComposition($composition);
                    $associationCompoRepository->save($assoChain, true);
                }
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
        return new JsonResponse (['errore']);


    }

    /**
     * @Route("/api/composition/editor/fistanaly", name="composition_editor_first_analy", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function researchForEditor(Request $request, CompositionRepository $compositionRepository): JsonResponse
    {
        $text = $request->query->get('text');
        $verse = preg_split('/\r\n|\r|\n/', $text);

        dump($verse);

        $syllable = new Syllable('it');
        dump(str_replace("&shy;", "-",$syllable->hyphenateText($text)));





        return new JsonResponse(true);

    }
}

