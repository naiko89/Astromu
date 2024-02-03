<?php

namespace App\Controller;

use App\Entity\BuildingGroupCreator;
use App\Entity\Group;
use App\Repository\AssociationCompoRepository;
use App\Repository\AssociationContaRepository;
use App\Repository\CompositionRepository;
use App\Repository\ContainerRepository;
use App\Repository\CreatorRepository;
use App\Repository\GroupRepository;
use App\Repository\BuildingGroupCreatorRepository;
use App\Repository\NationRepository;
use App\Repository\SubNationRepository;
use App\Service\SerializationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\SerializerInterface;
use DateTime;
use voku\helper\AntiXSS;
class GroupController extends AbstractController
{
    /**
     * @param Request $request
     * @param GroupRepository $groupRepository
     * @param SerializationService $serializationService
     * @param AssociationContaRepository $associationContaRepository
     * @param AssociationCompoRepository $associationCompoRepository
     * @param ContainerRepository $containerRepository
     * @param CompositionRepository $compositionRepository
     * @param BuildingGroupCreatorRepository $buildingGroupCreatorRepository
     * @Route("/api/group", name="group_index", methods={"GET", "POST", "PUT", "DELETE"})
     * @return JsonResponse
     * @throws ExceptionInterface
     */
    public function index(Request $request, GroupRepository $groupRepository,
                          SerializationService $serializationService,
                          AssociationContaRepository $associationContaRepository,
                          AssociationCompoRepository $associationCompoRepository,
                          ContainerRepository $containerRepository,
                          CompositionRepository $compositionRepository,
                          BuildingGroupCreatorRepository $buildingGroupCreatorRepository): JsonResponse
    {

        $method = $request->getMethod();
        $text = $request->query->get('text');
        switch ($method) {
            case 'GET':
                if($text === null || $text === ''){
                    return new JsonResponse($serializationService->serialize(
                        $groupRepository->findBy(['isAssociated' => true],['name' => 'ASC'],30),'groupList:read')
                    );
                }
                else{
                    return new JsonResponse($serializationService->serialize(
                        $groupRepository->findByName($text.'%'),'groupList:read')
                    );
                }
                break;
            case 'POST':
                // Crea una nuova composizione
                // dump($text);
                break;
            case 'PUT':
                // Aggiorna una composizione esistente
                break;
            case 'DELETE': //--->cascade elimination with research for dissociated container and composition
                $idGroup = $request->query->get('id');
                $groupEntity=$groupRepository->find($idGroup);
                $associationsContainersGroup = $associationContaRepository->findBy(['team' => $idGroup]); //-->take the container associated width the team
                $groupCreatorAssociationsEntity = $buildingGroupCreatorRepository->findBy(['team' => $idGroup]);
                $assoContModified = [];
                $assoCompModified = [];//dump('entità group');dump($groupEntity);dump('associazioni container del gruppo');dump($associationsContainers);

                foreach ($associationsContainersGroup as $associationsContainerGroup){//-->remove all group's associations (containers and compositions)
                    $assoContModified[] = $associationsContainerGroup;
                    $associationsCompositionsContainerGroup = $associationsContainerGroup->getAssoChain()->getValues();
                    foreach ($associationsCompositionsContainerGroup as $associationCompositionContainerGroup){
                        $assoCompModified[] = $associationCompositionContainerGroup; //dump($associationComposition);
                        $associationCompoRepository->remove($associationCompositionContainerGroup, true);
                    }
                    $associationContaRepository->remove($associationsContainerGroup, true);
                }

                foreach ($assoContModified as $conModified) {//-->check if the container is still associated
                    $containerAssociations = $associationContaRepository->findBy(['container' => $conModified->getContainer()->getId()]);
                    if (count($containerAssociations) === 0) {
                        $containerDisass = $containerRepository->find($conModified->getContainer()->getId());
                        $containerRepository->remove($containerDisass, true);
                    }
                }

                foreach ($assoCompModified as $comModified) {//-->check if the composition is still associated
                    $compositionAssociations = $associationCompoRepository->findBy(['composition'=>$comModified->getComposition()->getId()]);
                    if(count($compositionAssociations) === 0){
                        $compositionDisass = $compositionRepository->find($comModified->getComposition()->getId());
                        $compositionRepository->remove($compositionDisass, true);
                    }
                }

                foreach ($groupCreatorAssociationsEntity as $association) {//-->check if the composition is still associated
                    $buildingGroupCreatorRepository->remove($association, true);
                }
                $groupRepository->remove($groupEntity, true);

                return new JsonResponse([true]);
        }
        return new JsonResponse (['error']);


    }


    /**
     * @param Request $request
     * @param CreatorRepository $creatorRepository
     * @param GroupRepository $groupRepository
     * @param BuildingGroupCreatorRepository $buildingGroupCreatorRepository
     * @param SerializationService $serializationService
     * @Route("/api/group/form", name="group_form", methods={"GET", "POST", "PUT", "DELETE"})
     * @return JsonResponse
     * @throws ExceptionInterface
     */
    public function researchForForm(Request $request, CreatorRepository $creatorRepository,
                                    GroupRepository $groupRepository,
                                    BuildingGroupCreatorRepository $buildingGroupCreatorRepository,
                                    SerializationService $serializationService): JsonResponse
    {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                $text = $request->query->get('text');
                return new JsonResponse($serializationService->serialize($creatorRepository->findByName($text),'researchFormCreatorGroup:read'));
            case 'POST':
                $group = new Group();
                $group->setName($request->query->get('group'))->setIsAssociated(true);
                $groupRepository->save($group, true);
                foreach (json_decode($request->query->get('selectedMembers')) as $item){
                    $creatorGroup = new BuildingGroupCreator();
                    $creatorGroup->setCreator($creatorRepository->find($item->id));
                    $creatorGroup->setTeam($group);
                    $buildingGroupCreatorRepository->save($creatorGroup, true);
                }
                return new JsonResponse([true]);
                break;
            case 'PUT':
                // dump('sei nel PUT modifica una');
                // Aggiorna una composizione esistente
                break;
            case 'DELETE':
                // dump('elimina una o forse più vediamo');
                // Elimina una composizione
                break;
        }
        return new JsonResponse (['errore']);


    }


    /**
     * @param Request $request
     * @param GroupRepository $groupRepository
     * @param SerializerInterface $serializerInterface
     * @param NationRepository $nationRepository
     * @param SubNationRepository $subNationRepository
     * @param AntiXSS $antiXSS
     * @Route("/api/group/editor", name="group_editor", methods={"GET", "POST", "PUT", "DELETE"})
     * @return JsonResponse
     */
    public function researchForEditor(Request $request, GroupRepository $groupRepository,
                                      SerializerInterface $serializerInterface, NationRepository $nationRepository,
                                      SubNationRepository $subNationRepository, AntiXSS $antiXSS): JsonResponse
    {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                $idGroup=$request->query->get('id');
                $groupEntity = $groupRepository->find($idGroup);
                $optionBase = [
                    'circular_reference_handler' => function ($object) {
                        return $object->getId();
                    },
                    'attributes' => [
                        'id',
                        'nation'=>['id','name'],
                        'subNation'=>['id', 'name'],
                        'name',
                        'mtype',
                        'dataOn',
                        'dataOff',
                        'labels',
                        'nPublished',
                        'isAssociated',
                        'nCollaborated',
                        'description',
                    ]
                ];

                $options = [
                    'circular_reference_handler' => function ($object) {
                        return $object->getId();
                    },
                    'ignored_attributes' => ['containers', 'associationComp', 'team'],
                    'attributes' => [
                        'id',
                        'associationCreator' => [
                            'id',
                            'creator' =>[
                                'id',
                                'name'
                            ]
                        ],
                        'associationCont' => [
                            'id',
                            'container' =>[
                                'id',
                                'name',
                                'datePublish',
                                'associationCont' => ['id', 'name'],
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



                $data['group']=json_decode($serializerInterface->serialize($groupEntity, 'json', $optionBase));
                $photo = $groupEntity->getPhoto();
                $data['group']->photo = ($photo == null) ? null : 'data:image/png;base64,'.base64_encode(stream_get_contents($photo));
                $tmArray=json_decode($serializerInterface->serialize($groupEntity, 'json', $options));
                $data['creators'] = $tmArray->associationCreator;
                $data['containers'] = $tmArray->associationCont;
                $data['support'] = ['nations' => json_decode($serializerInterface->serialize($nationRepository->findAll(), 'json', $optionSupport))];

                return new JsonResponse($serializerInterface->serialize($data, 'json'));
            case 'POST':

                return new JsonResponse([true]);
                break;
            case 'PUT':
                $data = $request->query->get('data');
                $groupData = json_decode($data);

                $groupEntity = $groupRepository->find($groupData->id);
                $dateOffTime = ($groupData->dataOff === "") ? null : DateTime::createFromFormat('Y-m-d',$groupData->dataOff);


                $groupEntity->setName($groupData->name)
                    ->setSubNation($subNationRepository->find($groupData->subNation->id))
                    ->setNation($nationRepository->find($groupData->nation->id))
                    ->setDataOn(DateTime::createFromFormat('Y-m-d',$groupData->dataOn))
                    ->setDataOff($dateOffTime)
                    ->setDescription($groupData->description);

                if($groupData->photo !== null){
                    $photoBase64Uri = explode(',', $antiXSS->xss_clean($groupData->photo));
                    $photoBlob = base64_decode($photoBase64Uri[1]);
                    $groupEntity->setPhoto($photoBlob);
                }

                $groupRepository->save($groupEntity, true);

                return new JsonResponse([true]);
                break;
            case 'DELETE':
                // dump('elimina una o forse più vediamo');
                // Elimina una composizione
                break;
        }
        return new JsonResponse (['errore']);


    }
}
