<?php

namespace App\Controller;

use App\Entity\AssociationCompo;
use App\Entity\AssociationConta;
use App\Entity\BuildingGroupCreator;
use App\Entity\Group;
use App\Repository\AssociationCompoRepository;
use App\Repository\AssociationContaRepository;
use App\Repository\CompositionRepository;
use App\Repository\ContainerRepository;
use App\Repository\CreatorRepository;
use App\Repository\GroupRepository;
use App\Repository\BuildingGroupCreatorRepository;
use App\Service\SerializationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GroupController extends AbstractController
{
    /**
     * @Route("/api/group", name="group_index", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function index(Request $request, GroupRepository $groupRepository,
                          SerializationService $serializationService,
                          AssociationContaRepository $associationContaRepository,
                          AssociationCompoRepository $associationCompoRepository,
                          ContainerRepository $containerRepository,
                          CompositionRepository $compositionRepository): JsonResponse
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
                dump($text);
                break;
            case 'PUT':
                dump('sei nel PUT modifica una');
                // Aggiorna una composizione esistente
                break;
            case 'DELETE': //--->cascade elimination with research for dissociated container and composition
                $idGroup = $request->query->get('id');
                $groupEntity=$groupRepository->find($idGroup)->setIsAssociated(false);
                $groupRepository->save($groupEntity, true);
                $associationsContainersGroup = $associationContaRepository->findBy(['team' => $idGroup]); //-->take the container associated width the team
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
                        $containerDisass = $containerRepository->find($conModified->getContainer()->getId())->setIsAssociated(false);
                        $containerRepository->save($containerDisass, true);
                    }
                }

                foreach ($assoCompModified as $comModified) {//-->check if the composition is still associated
                    $compositionAssociations = $associationCompoRepository->findBy(['composition'=>$comModified->getComposition()->getId()]);
                    if(count($compositionAssociations) === 0){
                        $compositionDisass = $compositionRepository->find($comModified->getComposition()->getId())->setIsAssociated(false);
                        $compositionRepository->save($compositionDisass, true);
                    }
                }
                return new JsonResponse([true]);
        }
        return new JsonResponse (['error']);


    }


    /**
     * @Route("/api/group/form", name="group_form", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function researchForForm(Request $request, CreatorRepository $creatorRepository
        ,GroupRepository $groupRepository, BuildingGroupCreatorRepository $buildingGroupCreatorRepository, SerializationService $serializationService): JsonResponse
    {

        dump('sei dentro la ricerca del form');

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
