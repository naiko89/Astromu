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
                    $assoGroupsModified = [];
                    $assoContModified = [];
                    $assoCompModified = [];

                    foreach ($associationsCreatorGroups as $associationCreatorGroup){
                        $assoGroupsModified[] = $associationCreatorGroup->getTeam();
                        //$associatonGroup = $buildingGroupCreatorRepository->findBy(['creator'=>$associationCreatorGroup->getCreator()->getId()]);
                        $buildingGroupCreatorRepository->remove($associationCreatorGroup, true);
                    }

                    foreach ($associationsCreatorContainers as $associationCreatorContainer){//-->directly associate to creator
                        $assoContModified[] = $associationCreatorContainer;
                        $associationsCompositionsContainer  = $associationCompoRepository->findBy(['associationConta' =>$associationCreatorContainer->getId()]);

                        foreach ($associationsCompositionsContainer as $associationCompositionContainer){//dump('queste devono essere una e una sola');dump($associationCompositionContainer);
                            $assoCompModified[] = $associationCompositionContainer;
                            $associationCompoRepository->remove($associationCompositionContainer, true); //
                        }
                        $associationContaRepository->remove($associationCreatorContainer,true);
                    }

                    //-->we need a share service for the controllers:D

                    foreach ($assoGroupsModified as $assoGroupModified){ //-->indirectly for a group could be disassociated because there aren't other associations with creator  cascade from group--->container--->composition
                        if(count($buildingGroupCreatorRepository->findBy(["team"=>$assoGroupModified]))===0){
                            $groupDisasEntity=$groupRepository->find($assoGroupModified)->setIsAssociated(false);
                            $groupRepository->save($groupDisasEntity, true);
                            //-->it's like group delete in group controller
                            $associationsContainersGroup = $associationContaRepository->findBy(['team' => $groupDisasEntity->getId()]);
                            foreach ($associationsContainersGroup as $associationsContainerGroup){//-->remove all group's associations (containers and compositions)
                                $assoContModified[] = $associationsContainerGroup;
                                $associationsCompositionsContainerGroup = $associationsContainerGroup->getAssoChain()->getValues();
                                foreach ($associationsCompositionsContainerGroup as $associationCompositionContainerGroup){
                                    $assoCompModified[] = $associationCompositionContainerGroup; //dump($associationComposition);
                                    $associationCompoRepository->remove($associationCompositionContainerGroup, true); //
                                }
                                $associationContaRepository->remove($associationsContainerGroup, true); //
                            }
                        }
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

                    //dump('gli id da verificare sono:');dump($assoGroupModified);dump('--------');dump($assoContModified);dump('--------');dump($assoCompModified);
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
}
