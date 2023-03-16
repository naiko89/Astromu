<?php

namespace App\Controller;

use App\Entity\AssociationConta;
use App\Entity\Container;
use App\Repository\AssociationCompoRepository;
use App\Repository\CompositionRepository;
use App\Repository\ContainerRepository;
use App\Repository\CreatorRepository;
use App\Repository\GroupRepository;
use App\Repository\AssociationContaRepository;
use App\Service\SerializationService;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class ContainerController extends AbstractController
{
    /**
     * @Route("/api/container", name="container_index", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function index(Request    $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
        , AssociationContaRepository $associationContaRepository, AssociationCompoRepository $associationCompoRepository, SerializationService $serializationService, EntityManagerInterface $entityManager): JsonResponse
    {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                $text = $request->query->get('text');
                if ($text === null || $text === '') {
                    return new JsonResponse($serializationService->serialize(
                        $containerRepository->findBy(['isAssociated' => true], ['name' => 'ASC'], 30), 'containerList:read')
                    );
                } else {
                    return new JsonResponse($serializationService->serialize(
                        $containerRepository->findByName($text . '%'), 'containerList:read')
                    );
                }
            case 'POST':
                // Crea una nuova composizione
                dump('sei in post aggiungi una o più');
                break;
            case 'PUT':
                dump('sei nel PUT modifica una');
                // Aggiorna una composizione esistente
                break;
            case 'DELETE':
                $associationsContainerCreators = $associationContaRepository->findBy(['container' => $request->query->get('id')]);
                $containerEntity = $containerRepository->find($request->query->get('id'))->setIsAssociated(false);
                $containerRepository->save($containerEntity, true);
                $assoCompModified = [];//dump($associationsContainerCreators);dump(count($associationsContainerCreators).'<---');
                foreach ($associationsContainerCreators as $associationsContainerCreator) { //-->remove container's associations
                    //--> composition in relationship with association container
                    $associationsCompositionsContainer  = $associationCompoRepository->findBy(['associationConta' =>$associationsContainerCreator->getId()]);// dump('!!!!!!!'); dump($associationsCompositionsContainer);
                      foreach ($associationsCompositionsContainer as $associationsCompositionContainer){ //-->take trace of modified compositions for check if be able to disassociate
                          $assoCompModified[] = $associationsCompositionContainer->getComposition()->getId();
                      }
                    $associationContaRepository->remove($associationsContainerCreator, true);
                }
                foreach (array_unique($assoCompModified) as $compositionModified){ //-->check the modified compositions
                    //dump('id composizione'. $compositionModified);
                    $compositionAssociations = $associationCompoRepository->findby(['composition'=> $compositionModified]);
                      if(count($compositionAssociations) === 0){ //-->condition for disassociation
                        $compositionDisass=$compositionRepository->find($compositionModified)->setIsAssociated(false);
                        $compositionRepository->save($compositionDisass, true);
                      }
                }
                return new JsonResponse([true]);
        }
                return new JsonResponse (['errore']);


    }


    /**
     * @Route("/api/container/form", name="container_form", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function researchForForm(Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
       ,AssociationContaRepository $associationContaRepository ,GroupRepository $groupRepository , SerializationService $serializationService): JsonResponse
    {
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    $text = $request->query->get('text');
                    dump($serializationService->serialize(['creator'=>$creatorRepository->findByName($text), 'group'=>$groupRepository->findByName($text)],'researchFormContAuthor:read'));
                    return new JsonResponse(
                        $serializationService->serialize(
                            ['creator'=>$creatorRepository->findByName($text), 'group'=>$groupRepository->findByName($text)],
                            'researchFormContAuthor:read')
                    );
                case 'POST':
                    $container = new Container();
                    $containerName = $request->query->get('container');
                    $container->setName($containerName)->setIsAssociated(true);
                    $authorList = json_decode($request->query->get('selectedAuthors'));
                    dump($authorList);
                    $containerRepository->save($container, true);
                    foreach ($authorList as $item){
                        $association= new AssociationConta();
                        switch ($item->type) {
                            case "creator":
                                $association->setCreator($creatorRepository->find($item->id))->setCreation(true);
                                break;
                            case "group":
                                $association->setTeam($groupRepository->find($item->id))->setCreation(true);
                                break;
                        }

                        $association->setContainer($container)->setCreation(true);
                        $associationContaRepository->save($association, true);

                    }
                    return new JsonResponse([true]);
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
     * @Route("/api/container/editor", name="container_editor", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function researchForEditor(Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
        ,SerializationService $serializationService,AssociationCompoRepository $associationCompoRepository, AssociationContaRepository $associationContaRepository ,GroupRepository $groupRepository , SerializerInterface $serializerInterface): JsonResponse
    {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                $id = $request->query->get('id');
                $containerEntity = $containerRepository->find($id);
                $optionBase = [
                    'circular_reference_handler' => function ($object) {
                    return $object->getId();
                },
                    'attributes' => [
                        'id',
                        'name',
                        'datePublish',
                        'compNumber',
                        'description',
                        'genre',
                        'label',
                        'prize_temp',
                        'photo']
                ];
                $optionDeep = [
                    'circular_reference_handler' => function ($object) {
                        return $object->getId();
                    },
                    'attributes' => [
                        'id',
                        'name',
                        'associationCont' => [
                            'id',
                            'team' =>[
                                'id',
                                'name'
                            ],
                            'creator' => [
                              'id',
                              'name'
                            ],
                            'assoChain'=>[
                              'composition'=>[
                                  'id',
                                  'name'
                              ]
                            ]
                        ]
                    ]
                ];


                foreach (json_decode($serializerInterface->serialize($containerEntity, 'json', $optionDeep))->associationCont as $item){


                    if(!isset($data['container'])){
                        $data['container'] = json_decode($serializerInterface->serialize($containerEntity,'json', $optionBase));
                    }

                    if(!isset($data['compositions'])){
                        $data['compositions'] = $item->assoChain;
                    }

                    if($item->team !== null){
                        $data['makers'][] = ['id'=>$item->team->id ,'name'=> $item->team->name,'type' => 'group'];
                    }
                    else if($item->creator !== null){
                        $data['makers'][] = ['id'=>$item->creator->id ,'name'=> $item->creator->name,'type' => 'creator'];
                    }



                }


                return new JsonResponse($serializerInterface->serialize($data,'json'));
            case 'POST':

                return new JsonResponse([true]);
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
