<?php

namespace App\Service;
use Symfony\Component\HttpFoundation\Request;
use DateTime;

class VisitesService
{
    /**
     * @param $enty
     * @param $repo
     * @param $req
     * @param $parserBrowser
     */
    public function __construct($enty, $repo, $req, $parserBrowser) {
        $this->repo = $repo;
        $this->enty = $enty;
        $this->request = $req;
        $this->parser = new $parserBrowser($_SERVER['HTTP_USER_AGENT']);
    }

    private function getInfo(): void{
        $browserVersion = '';
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $this->ipAddress = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $this->ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $this->ipAddress = $_SERVER['REMOTE_ADDR'];
        }

        if($this->parser->browser->version->value){
            $browserVersion = $this->parser->browser->version->value;
        }

        $this->userAgent = $this->parser->browser->name.' ('.$this->parser->browser->version->value.')---'
            .$this->parser->engine->name.' ('.$browserVersion.')---'
            .$this->parser->os->name.'---'
            .$this->parser->device->type;
    }

    /**
     * @param $isLogged
     * @return void
     */

    public function trackVisitor($isLogged): void{
        $this->getInfo();
        $this->enty->setDate(DateTime::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s')))->setIp($this->ipAddress)->setSystem($this->userAgent)->setLogin($isLogged);
        $this->repo->save($this->enty, true);
    }

}