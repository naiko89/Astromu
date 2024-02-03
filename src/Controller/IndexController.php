<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\VisitesService;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class IndexController extends AbstractController
{
     /**
     * @Route("/index/{reactRouting}", name="app_index", priority="-1", defaults={"reactRouting": null}, requirements={"reactRouting"=".+"})
     */
    public function index(TokenStorageInterface $tokenStorage, VisitesService $visitesService): Response
    {
        $visitesService->trackVisitor(true);
        $user = $this->getUser();
        return $this->render('index/main.html.twig', [
            'controller_name' => 'IndexController',
            'user' => $user->getUserIdentifier()
        ]);
    }
}
