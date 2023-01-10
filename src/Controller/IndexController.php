<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class IndexController extends AbstractController
{
     /**
     * @Route("/index/{reactRouting}", name="app_index", priority="-1", defaults={"reactRouting": null}, requirements={"reactRouting"=".+"})
     */
    public function index(TokenStorageInterface $tokenStorage): Response
    {
        //devo passare il token o cambiare tipologia di autenticazione? da capire soprattutto quando faccio le chiamate ajax

        $user = $this->getUser();
        return $this->render('index/main.html.twig', [
            'controller_name' => 'IndexController',
            'user' => $user->getUserIdentifier()
        ]);
    }
}
