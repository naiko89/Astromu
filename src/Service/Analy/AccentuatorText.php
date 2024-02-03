<?php

namespace App\Service\Analy;
use Symfony\Component\Serializer\SerializerInterface;

class AccentuatorText{
    public $accFragments; // ["selectedHash","text","tempHash","hashes"]
    private $vocalAccReplArr;
    private $dictionaryRepository;
    private $serializer;
    private $entity;

    /**
     * @param array $vocalAccReplArr
     * @param $dictionaryRepository
     * @param SerializerInterface $serializer
     */
    public function __construct(array $vocalAccReplArr, $dictionaryRepository, SerializerInterface $serializer) {
        $this->accFragments = [];
        $this->vocalAccReplArr = $vocalAccReplArr;
        $this->dictionaryRepository = $dictionaryRepository;
        $this->serializer = $serializer;
    }

    /**
     * @param $silFragments
     * @return void
     * @throws \Symfony\Component\Serializer\Exception\ExceptionInterface
     */

    public function setFragment ($silFragments) : void {
        $this->accFragments['text'] = $silFragments;
        $this->accFragments['selectedHash'] = false;
        $tempHash = str_replace($this->vocalAccReplArr['acc'], $this->vocalAccReplArr['hash'], $silFragments);
        $this->accFragments['tempHash'] = $tempHash;
        $this->entity = $this->dictionaryRepository->findBy(['string'=>str_replace(['#','-'],['',''], $tempHash)]);
        $this->accFragments['hashes'] = [];


        if(isset($this->entity[0])){ //--> the word is in the db
            $arrValues = $this->serializer->normalize($this->entity[0], null);
            $this->accFragments['isInDb'] = true;
            $this->accFragments['sillabation'] = $arrValues['sillabation'];
            $this->accFragments['hashes'] = ($arrValues['declination'] === null) ? [] : json_decode($arrValues['declination']);
            $this->engageAccent(); //dump($this->accFragments);
        }

        else{
            $this->accFragments['isInDb'] = false;
            $this->accFragments['sillabation'] = null;

        }


        //dump($this->accFragments);


    }

    /**
     * @return void
     */

    private function engageAccent(){
        if(empty($this->accFragments['hashes']) !== true){
            $cases = $this->accFragments['hashes'];
            $nCases = count($cases);
            $penultimateChara = substr($this->accFragments['tempHash'], strlen($this->accFragments['tempHash']) - 2, 1);
            //dump($cases);

            switch ($nCases){
                case ($nCases === 1) : { //--> one case determinate without accent
                    $this->accFragments['selectedHash'] = $cases[0]; // dump('caso 1');dump($this->accFragments);dump('----------');
                    $this->accFragments['hashes'] = [];
                    break;
                }
                case ($nCases === 2) : { //-->we have two cases, we could determinated  the hash if one of it have hash at penultimate character

                    $caseTerminalHasched = array_values(array_filter(array_values($cases), function ($case) { //--> if one of the cases is end hashed we can define the hash even if we don't have the hash on text
                        if (substr($case, strlen($case) - 2, 1) === '#') {
                            return true;
                        }}));

                    if(empty($caseTerminalHasched) === false && $penultimateChara === '#'){ //-->we have two cases end we need the case with terminal hash
                        $this->accFragments['selectedHash'] = $caseTerminalHasched[0];
                    }
                    else if(empty($caseTerminalHasched) === false && $penultimateChara !== '#'){ //--
                        $this->accFragments['selectedHash'] = array_values(array_filter(array_values($cases), function ($case) { //--> if one of the cases is end hashed we can define the hash even if we don't have the hash on text
                            if (substr($case, strlen($case) - 2, 1) !== '#') {
                                return true;
                            }
                            else if(strlen($case) === 1){ //--->when i have one letter without hash
                                return true;
                            }
                        }))[0];
                    }
                    else{
                        $this->accFragments['selectedHash'] = false;
                    }
                    break;
                }
            }
        }
    }


    /*private function findAccentFromDictionary(): void{ // $entity = $this->dictionaryRepository->findBy(['string'=>str_replace(['#','-'],['',''], $this->accFragments['tempHash'])]);
            if(isset($this->entity[0])) { //---> words finded in db
                if($this->entity[0]->getDeclination() !== null) { //--->words finded in db with declination
                    $arrValues = $this->serializer->normalize($this->entity[0], null); //dump($arrValues);
                    $this->accFragments['hashes'] = $arrValues['declination'];
                    $this->accFragments['sillabation'] = $arrValues['sillabation'];
                    $this->engageAccent();
                }else{
                    $this->accFragments['hashes'] = false;
                    $this->accFragments['sillabation'] = false;
                }
            }
            else { //--->words did't find in db
                $this->accFragments['hashes'] = false;
                $this->accFragments['sillabation'] = false;
            }

    }

    private function findRightHypernationFromDictionary(){
        if(isset($this->entity[0])){
            $entityValues = $this->serializer->normalize($this->entity[0], null);
            if($entityValues['sillabation'] != null){
                if($entityValues['sillabation'] === $this->accFragments['tempHash']){
                    $this->accFragments['sillabation'] = $entityValues['sillabation'];
                }
                else{

                }
            }

        }
        else{
               $this->accFragments['sillabation'] = false;
        }


    }*/
    public function get(){
        return $this->accFragments;
    }


}