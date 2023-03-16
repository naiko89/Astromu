<?php

namespace App\Controller;

use App\Entity\Creator;
use App\Repository\AssociationCompoRepository;
use App\Repository\AssociationContaRepository;
use App\Repository\BuildingGroupCreatorRepository;
use App\Repository\CompositionRepository;
use App\Repository\ContainerRepository;
use App\Repository\CreatorRepository;
use App\Repository\GroupRepository;
use App\Repository\NationRepository;
use App\Repository\SubNationRepository;
use App\Service\SerializationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use DateTime;

class CreatorController extends AbstractController
{
    /**
     * @Route("/api/creator", name="creator_index", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function index(Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
        ,AssociationContaRepository $associationContaRepository, SerializationService $serializationService
        ,BuildingGroupCreatorRepository $buildingGroupCreatorRepository, AssociationCompoRepository $associationCompoRepository,
        GroupRepository $groupRepository): JsonResponse
    {
            $method = $request->getMethod();
            $text = $request->query->get('text');
            switch ($method) {
                case 'GET': //dump($serializationService->serialize($creatorRepository->findByName($text),'creatorList:read'));
                    if($text === null || $text === ''){
                        return new JsonResponse($serializationService->serialize(
                            $creatorRepository->findBy(['isAssociated' => true],['name' => 'ASC'],30),'creatorList:read')
                        );
                    }
                    else{
                        return new JsonResponse($serializationService->serialize(
                            $creatorRepository->findByName($text.'%'),'creatorList:read')
                        );
                    }
                case 'POST':
                    // Crea una nuova composizione
                    dump($text);
                    break;
                case 'PUT':
                    dump('sei nel PUT modifica una');
                    // Aggiorna una composizione esistente
                    break;
                case 'DELETE':

                    $associationsCreatorGroups = $buildingGroupCreatorRepository->findBy(['creator'=>$request->query->get('id')]);
                    $associationsCreatorContainers = $associationContaRepository->findBy(['creator'=>$request->query->get('id')]); ///--->dovrai anche cercare di togliere i container che sono legati a gruppi che tolti i creatori si dissociano
                    $creatorEntity = $creatorRepository->find($request->query->get('id'))->setIsAssociated(false);
                    $creatorRepository->save($creatorEntity, true);
                    $entitiesModified = ['groups'=>[],'containers'=>[],'compositions'=>[]];


                    foreach ($associationsCreatorGroups as $associationCreatorGroup){ //-->groups associated with the creator
                        $entitiesModified['groups'][] = $associationCreatorGroup->getTeam();
                        //$associatonGroup = $buildingGroupCreatorRepository->findBy(['creator'=>$associationCreatorGroup->getCreator()->getId()]);
                        $buildingGroupCreatorRepository->remove($associationCreatorGroup, true);
                    }

                    foreach ($associationsCreatorContainers as $associationCreatorContainer){//-->directly associate to creator
                        $entitiesModified['containers'][] = $associationCreatorContainer;
                        $associationsCompositionsContainer  = $associationCompoRepository->findBy(['associationConta' =>$associationCreatorContainer->getId()]);

                        foreach ($associationsCompositionsContainer as $associationCompositionContainer){//dump('queste devono essere una e una sola');dump($associationCompositionContainer);
                            $entitiesModified['compositions'][] = $associationCompositionContainer;
                            $associationCompoRepository->remove($associationCompositionContainer, true); //
                        }
                        $associationContaRepository->remove($associationCreatorContainer,true);
                    }

                    //-->we need a share service for the controllers:D

                    foreach ($entitiesModified['groups'] as $assoGroupModified){ //-->indirectly for a group could be disassociated because there aren't other associations with creator  cascade from group--->container--->composition
                        if(count($buildingGroupCreatorRepository->findBy(["team"=>$assoGroupModified]))===0){
                            $groupDisasEntity=$groupRepository->find($assoGroupModified)->setIsAssociated(false);
                            $groupRepository->save($groupDisasEntity, true);
                            //-->it's like group delete in group controller
                            $associationsContainersGroup = $associationContaRepository->findBy(['team' => $groupDisasEntity->getId()]);
                            foreach ($associationsContainersGroup as $associationsContainerGroup){//-->remove all group's associations (containers and compositions)
                                $entitiesModified['containers'][] = $associationsContainerGroup;
                                $associationsCompositionsContainerGroup = $associationsContainerGroup->getAssoChain()->getValues();
                                foreach ($associationsCompositionsContainerGroup as $associationCompositionContainerGroup){
                                    $entitiesModified['compositions'][] = $associationCompositionContainerGroup; //dump($associationComposition);
                                    $associationCompoRepository->remove($associationCompositionContainerGroup, true); //
                                }
                                $associationContaRepository->remove($associationsContainerGroup, true); //
                            }
                        }
                    }


                    foreach ($entitiesModified['containers'] as $conModified) {//-->check if the container is still associated
                        $containerAssociations = $associationContaRepository->findBy(['container' => $conModified->getContainer()->getId()]);
                        if (count($containerAssociations) === 0) {
                            $containerDisass = $containerRepository->find($conModified->getContainer()->getId())->setIsAssociated(false);
                            $containerRepository->save($containerDisass, true);
                        }
                    }

                    foreach ($entitiesModified['compositions'] as $comModified) {//-->check if the composition is still associated
                        $compositionAssociations = $associationCompoRepository->findBy(['composition'=>$comModified->getComposition()->getId()]);
                        if(count($compositionAssociations) === 0){
                            $compositionDisass = $compositionRepository->find($comModified->getComposition()->getId())->setIsAssociated(false);
                            $compositionRepository->save($compositionDisass, true);
                        }
                    }

                    //dump('the  ids to verify are:');dump($assoGroupModified);dump('--------');dump($assoContModified);dump('--------');dump($assoCompModified);
                    return new JsonResponse([true]);
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
                    break;
                case 'POST':
                    $creator = new Creator();
                    $creator->setName($request->query->get('creator'))->setIsAssociated(true);
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

    /**
     * @Route("/api/creator/editor", name="creator_editor", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function researchForEditor(Request $request, CompositionRepository $compositionRepository, ContainerRepository $containerRepository, CreatorRepository $creatorRepository
        , SerializationService $serializationService,SerializerInterface $serializerInterface, NationRepository $nationRepository, SubNationRepository $subNationRepository): JsonResponse
    {

        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                $id = $request->query->get('id');
                $creatorEntity=$creatorRepository->find($id);
                $optionBase = [
                    'circular_reference_handler' => function ($object) {
                        return $object->getId();
                    },
                    'attributes' => [
                        'id',
                        'subNation'=>['id'],
                        'nation' => ['id'],
                        'name',
                        'firstname',
                        'surname',
                        'description',
                        'photo',
                        'dateBirth',
                        'compNumber',
                        'contNumber',
                        'isAssociated',
                        'nPublished',
                        'nCollaborated'
                    ]
                ];

                $options = [
                    'circular_reference_handler' => function ($object) {
                        return $object->getId();
                    },
                    'attributes' => [
                        'associationGroup' => [
                            'id',
                            'team' =>[
                                'id',
                                'name',
                                'associationCont' =>[
                                    'id',
                                    'container' => [
                                        'id',
                                        'name'
                                    ]
                                ]
                            ]
                        ],
                        'associationCont' => [
                            'id',
                            'container' =>[
                                'id',
                                'name',
                                'associationCont' => [
                                    'id',
                                    'creator' =>['id','name']
                                ]
                            ]
                        ]
                    ]
                ];

                $optionSupport = [
                    'circular_reference_handler' => function ($object) {
                        return $object->getId();
                    },
                    'attributes' => [
                          'id',
                          'name',
                          'subnations' => ['id', 'name']
                        ]
                ];

                // dump($creatorEntity);dump($serializerInterface->serialize($creatorEntity, 'json', $options));

                $data['creator'] = json_decode($serializerInterface->serialize($creatorEntity, 'json', $optionBase));
                $tmArray=json_decode($serializerInterface->serialize($creatorEntity, 'json', $options));
                $data['groups'] = $tmArray->associationGroup;
                $data['containers'] = $tmArray->associationCont;
                $data['support'] = ['nations' => json_decode($serializerInterface->serialize($nationRepository->findAll(), 'json', $optionSupport))];


                return new JsonResponse($serializerInterface->serialize($data, 'json'));
            case 'POST':



                //$creator->setName($request->query->get('creator'))->setIsAssociated(true);
                //$creatorRepository->save($creator, true);
                return new JsonResponse([true]);
                break;
            case 'PUT':

                $data = $request->query->get('data');
                $creatorData = json_decode($data);
                $creatorEntity = $creatorRepository->find($creatorData->id);

                dump($creatorData->nation);
                dump($creatorData->subNation);



                $creatorEntity->setName($creatorData->name)
                    ->setFirstname($creatorData->firstname)
                    ->setSurname($creatorData->surname)
                    ->setDateBirth(DateTime::createFromFormat('Y-m-d', $creatorData->dateBirth))
                    ->setNation($nationRepository->find($creatorData->nation->id))
                    ->setSubNation($subNationRepository->find($creatorData->subNation->id))
                    ->setDescription($creatorData->description);

                $creatorRepository->save($creatorEntity, true);
                return  new JsonResponse([true]);
            case 'DELETE':
                dump('elimina una o forse più vediamo');
                // Elimina una composizione
                break;
        }
        return new JsonResponse (['error']);


    }

}
