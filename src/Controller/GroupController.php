<?php

namespace App\Controller;

use App\Entity\AssociationConta;
use App\Entity\BuildingGroupCreator;
use App\Entity\Group;
use App\Repository\AssociationContaRepository;
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
                          BuildingGroupCreatorRepository $buildingGroupCreatorRepository,
                          AssociationContaRepository $associationContaRepository): JsonResponse
    {

        $method = $request->getMethod();
        $text = $request->query->get('text');
        switch ($method) {
            case 'GET':
                if($text === null || $text === ''){
                    return new JsonResponse($serializationService->serialize(
                        $groupRepository->findBy([],['name' => 'ASC'],30),'groupList:read')
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
            case 'DELETE':
                $idGroup = $request->query->get('id');
                $buildingGroupCreators = $buildingGroupCreatorRepository->findBy(['team' => $idGroup]);
                $associationContainers = $associationContaRepository->findBy(['team' => $idGroup]);
                foreach ($buildingGroupCreators as $buildingGroupCreator) {
                    $buildingGroupCreatorRepository->remove($buildingGroupCreator, true); //->
                }
                foreach ($associationContainers as $associationContainer){
                    $associationContaRepository->remove($associationContainer, true);
                }
                $groupRepository->remove($groupRepository->find($idGroup), true);
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
                $group->setName($request->query->get('group'));
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
