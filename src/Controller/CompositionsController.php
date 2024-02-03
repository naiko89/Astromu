<?php

namespace App\Controller;

use App\Entity\AssociationCompo;
use App\Entity\Composition;
use App\entity\CompositionPieces;
use App\Entity\Container;
use App\Entity\Creator;

use App\Entity\Dictionary;
use App\Repository\AssociationCompoRepository;
use App\Repository\AssociationContaRepository;
use App\Repository\CompositionPiecesRepository;
use App\Repository\DictionaryRepository;
use http\Env\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use App\Repository\CompositionRepository;
use App\Repository\ContainerRepository;
use App\Repository\CreatorRepository;

use App\Service\SerializationService;


use App\Service\Analy\LevelOneEditorText;
use Symfony\Component\Serializer\Exception\ExceptionInterface;


class CompositionsController extends AbstractController
{


    /**
     * @param Request $request
     * @param CompositionRepository $compositionRepository
     * @param SerializationService $serializationService
     * @param AssociationCompoRepository $associationCompoRepository
     * @Route("/api/compositions", name="compositions_index", methods={"GET", "POST", "PUT", "DELETE"})
     * @return JsonResponse
     * @throws ExceptionInterface
     */
    public function index(Request $request,
                          CompositionRepository $compositionRepository, SerializationService $serializationService,
                          AssociationCompoRepository $associationCompoRepository): JsonResponse
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
                //dump('sei nel PUT modifica una');
                // Aggiorna una composizione esistente
                break;
            case 'DELETE':
                $composition = $compositionRepository->findOneBy(['id' => $request->query->get('id')]);
                $composition->setIsAssociated(false); ///--> or delete?
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
     * @param Request $request
     * @param CompositionRepository $compositionRepository
     * @param ContainerRepository $containerRepository
     * @param SerializationService $serializationService
     * @param AssociationContaRepository $associationContaRepository
     * @param AssociationCompoRepository $associationCompoRepository
     * @Route("/api/compositions/form", name="compositions_form", methods={"GET", "POST", "PUT", "DELETE"})
     * @return JsonResponse
     * @throws ExceptionInterface
     */


    public function queriesForForm(Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository,
                                    SerializationService $serializationService, AssociationContaRepository $associationContaRepository, AssociationCompoRepository $associationCompoRepository): JsonResponse
    {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                $text=$request->query->get('text');
                //dump($containerRepository->findByName($text));
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
                //dump('sei nel PUT modifica una');
                // Aggiorna una composizione esistente
                break;
            case 'DELETE':
                //dump('elimina una o forse più vediamo');
                // Elimina una composizione
                break;
        }
        return new JsonResponse (['errore']);


    }

    /**
     * @param Request $request
     * @param CompositionRepository $compositionRepository
     * @param LevelOneEditorText $filterEditorText
     * @param CompositionPiecesRepository $compositionPiecesRepository
     * @Route("/api/composition/editor/fistanaly", name="composition_editor_first_analy", methods={"GET", "POST", "PUT", "DELETE"})
     * @return JsonResponse
     */
    public function queriesForEditorAnaly(Request $request, CompositionRepository $compositionRepository, CompositionPiecesRepository $compositionPiecesRepository, LevelOneEditorText $filterEditorText): JsonResponse
    {
        $method = $request->getMethod();
        $data = json_decode($request->query->get('data'));

        switch ($method) {
            case 'GET':
                $pieces = $compositionPiecesRepository->findBy(['composition'=>$compositionRepository->find($data->id)]);
                foreach ($pieces as $piece){
                    $return[]= ['text'=> ['idPiece'=>$piece->getId(),'textarea'=>$piece->getText(),'select'=>$piece->getSectionType()],
                        'hashes'=>$piece->getHashes(),
                        'lvOneToggle'=>false];
                }
                return new JsonResponse(json_encode($return));
            case 'POST':
                $compositionEntity = $compositionRepository->find($data->idComp);
                $compositionPiecesEntity = new CompositionPieces();
                $compositionPiecesEntity->setText($data->pieceText)->setSectionType($data->pieceType)->setComposition($compositionEntity);
                $compositionPiecesRepository->save($compositionPiecesEntity, true);
                $filterEditorText->set($data->pieceText);

                dump($filterEditorText->get());

                return new JsonResponse(json_encode(['idPiece'=>$compositionPiecesEntity->getId(), 'hashes'=>$filterEditorText->get()]));
            case 'PUT':
                $compositionPiecesEntity=$compositionPiecesRepository->find($data->idPiece);
                $compositionPiecesEntity->setText($data->pieceText)->setSectionType($data->pieceType);
                $compositionPiecesRepository->save($compositionPiecesEntity, true);
                $filterEditorText->set($data->pieceText);

                dump($filterEditorText->get());
                return new JsonResponse(json_encode(['done'=>true,'hashes'=>$filterEditorText->get()]));
            case 'DELETE':
                $compositionPiecesEntity=$compositionPiecesRepository->find($data->idPiece);
                $compositionPiecesRepository->remove($compositionPiecesEntity, true);
                return new JsonResponse(true);
        }

        return new JsonResponse(json_encode([false]));

    }


    /**
     * @param Request $request
     * @Route("/api/composition/editor/dictionary", name="composition_editor_words", methods={"GET", "POST", "PUT", "DELETE"})
     * @param DictionaryRepository $dictionaryRepository
     * @return JsonResponse
     */
    public function handleNewWords(Request $request, DictionaryRepository $dictionaryRepository){
        $method = $request->getMethod();
        $data = json_decode($request->query->get('data'));
        $string= str_replace('#','',$data->string);
        $word = $dictionaryRepository->findOneBy(['string'=>str_replace('-','', $string)]);
        //dump($string);dump($word);dump($method);

        dump($word);
        dump($method);

        switch ($method) {
            case 'POST':
                $word->setSillabation($string);
                $word->setDeclination(json_encode($data->cases));
                break;

            case 'DELETE':
                $word->setSillabation(NULL);
                $word->setDeclination(NULL);
                break;

        }

        dump($word);

        $dictionaryRepository->save($word, true);



        return new JsonResponse(json_encode([true]));



    }
}

