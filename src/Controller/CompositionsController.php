<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class CompositionsController extends AbstractController
{
    /**
     * @Route("/api/compositions", name="compositions_index", methods={"GET", "POST", "PUT", "DELETE"})
     */
    public function index(Request $request)
    {


        dump('sei dentro');

        // Gestisci le richieste HTTP in base al metodo utilizzato
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                // Restituisci la lista delle composizioni
                break;
            case 'POST':
                // Crea una nuova composizione
                break;
            case 'PUT':
                dump('sei nel PUT');
                // Aggiorna una composizione esistente
                break;
            case 'DELETE':
                // Elimina una composizione
                break;
        }

         $response = new Response(new JsonResponse (['prova'=>'ciao']));
         $response->headers->set('Content-Type', 'application/json');

          return $response;
        //return new JsonResponse (['prova'=>'ciao']);

    }
}
