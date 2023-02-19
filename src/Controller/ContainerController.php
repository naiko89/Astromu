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




}
