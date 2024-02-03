import React from 'react';
import {ListGroup, Button, Modal, Form} from "react-bootstrap";

import FormAddHash from "../../forms/editors/FormAddHash"
import FormSetHash from "../../forms/editors/FormSetHash"
import FormDefinedHash from "../../forms/editors/FormDefinedHash";
import queryString from "query-string";
import update from "immutability-helper";

class EditorCompostionHashes extends React.Component{

    constructor(props) {
        super(props)
        /*console.log('dal costruttore') console.log(this.props)*/
        this.state = {hashesPiece : props.valueHashesPiece, word:'', handleValues :{ showForm:false, nverse:'', nword:''}}
        this.handleModal = this.handleModal.bind(this)
        this.handleWord = this.handleWord.bind(this)
        this.selectHash = this.selectHash.bind(this)
        this.removeWord = this.removeWord.bind(this)
        this.redefineWord = this.redefineWord.bind(this)
    }

    componentDidUpdate(prevProps) { // I want to define the state from the parent's props. Because use the state here is better for rendering parent's state
        if (this.props.valueHashesPiece !== prevProps.valueHashesPiece) {
            this.setState({ hashesPiece: this.props.valueHashesPiece });
        }
    }

    handleModal(){
        this.props.handleModal(this.props.id)
    }

    handleWord(nVerse, nWord){
        const word = this.state.hashesPiece[nVerse][nWord]
        this.setState(prevState => ({
            word: word,
            handleValues: {
                showForm: true,
                nVerse: parseInt(nVerse),
                nWord: parseInt(nWord),
            }

        }), () => {})
        this.props.handleHashesPiece(nVerse,nWord,word)
    }

    removeWord(string){
        let tempState = this.state
        let tempString
        let uriFragment = queryString.stringify({data:JSON.stringify({string:string.replace('#',''), cases:null})})


        // alert(string)


        fetch(`/api/composition/editor/dictionary?${uriFragment}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
            .then(data => {
                this.state.hashesPiece.forEach((verse, nVer)=>{
                    verse.forEach((word, nWor)=>{
                        tempString = string.replace('#','')
                        if(tempString.replace('#','') === word.tempHash.replace('#','')){
                            tempState.hashesPiece[nVer][nWor].sillabation = null
                            tempState.hashesPiece[nVer][nWor].hashes = []
                            tempState.hashesPiece[nVer][nWor].selectedHash = false
                        }
                    })
                })
                this.setState(tempState)
            })
            .catch(error => console.error(error))

    }


    selectHash(selHash, nVerse, nWord, cases, isSaved){ //--->select the hash from the hyphenation
        let tempState= this.state
        let areCasesDefinable
        tempState.handleValues.showForm = false
        tempState.handleValues.nVerse = undefined
        tempState.handleValues.nWord = undefined
        let isLastHash = function(cases, findTheLast){
            let lastAcc = false
            if(findTheLast === true){
                lastAcc = cases.find((cas) => cas.charAt(cas.length - 2) === '#');
            }
            else{
                lastAcc = cases.find((cas) => cas.charAt(cas.length - 2) !== '#');
            }
            return lastAcc
        }

        this.state.hashesPiece.forEach((verse, nVer)=>{
            verse.forEach((word, nWor)=>{
                if(selHash.replace('#','') === word.tempHash.replace('#','')){ //--> if we have the same sillabation
                    tempState.hashesPiece[nVer][nWor].sillabation = word.tempHash.replace('#','')
                    tempState.hashesPiece[nVer][nWor].hashes = cases
                    if(nVer === nVerse && nWor === nWord){ //-->modify the selected word
                        tempState.hashesPiece[nVer][nWor].selectedHash = selHash
                    }
                    else if(selHash === word.tempHash){ //-->if the word has redundant repetition
                        tempState.hashesPiece[nVer][nWor].selectedHash = selHash
                    }
                    else if(cases.length === 2 && isLastHash(cases, true)!== undefined){//-->if one of declination is with hash at the and
                        areCasesDefinable = isLastHash(cases, true)
                        if(word.tempHash.charAt(word.tempHash.length-2) === '#'){//-->if it's with hash at the and
                            tempState.hashesPiece[nVer][nWor].selectedHash = areCasesDefinable
                        }
                        else{ //-->if one of the 2 declensions is hashed but you would like the other
                            tempState.hashesPiece[nVer][nWor].selectedHash = isLastHash(cases, false)
                        }
                    }
                }
            })
        })

        if(isSaved === false) { //-->I avoid recalculation if I haven't changed
            let uriFragment = queryString.stringify({data:JSON.stringify({string:selHash, cases:cases})})
            fetch(`/api/composition/editor/dictionary?${uriFragment}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                .catch(error => console.error(error))
        }

        this.setState(tempState)
    }

    redefineWord(){
        alert('se devi redifinirla tutta, tienila in sospeso per ora')
    }


    render(){
        let nVerseSelected = this.state.handleValues.nVerse
        let nWordSelected = this.state.handleValues.nWord
        // console.log(this.state.handleValues.showForm)
        // alert(JSON.stringify(this.state.hashesPiece[nVerseSelected][nWordSelected]))

        let titleModal = this.state.handleValues.showForm === true && (
            this.state.word.hashes.length === 0 ? <h5 className={'mb-0 pb-0'}>Inserisci la Parola</h5> : <h5 className={'mb-0 pb-0'}>Definisci la Parola</h5>)

        let formHash = this.state.handleValues.showForm === true &&
            ( this.state.hashesPiece[nVerseSelected][nWordSelected].selectedHash === false ?
                ( this.state.word.hashes.length === 0 ?
                      <FormAddHash value={this.state.word}
                                   nVerse={nVerseSelected}
                                   nWord={nWordSelected}
                                   redefineWord={this.redefineWord}
                                   selectHash={this.selectHash}>
                      </FormAddHash>
                      :
                      <FormSetHash value={this.state.word}
                                   nVerse={nVerseSelected}
                                   nWord={nWordSelected}
                                   selectHash={this.selectHash}
                                   redefineWord={this.redefineWord}>
                      </FormSetHash>
                ) : <FormDefinedHash value={this.state.word}
                                     removeWord={this.removeWord}>
                    </FormDefinedHash>
            )

        let rowsWordsHashes = Array.isArray(this.state.hashesPiece) === false ?
            <div className={''}>'Se vuoi vedere cosa fa questo tasto, passa in modifica il testo e risalvalo, poi ritorna qui'</div>
            :
            this.state.hashesPiece.map((itemVerse, keyVerse) =>{
                let row = Object.entries(itemVerse).map(([keyWord, word],nWord)=>{
                    if(keyVerse === parseInt(nVerseSelected) && parseInt(keyWord) === nWordSelected){ //--->selected word
                        return <span className={'pe-1 ps-1 bg-primary border my-word'} key={keyWord} data-declin = {JSON.stringify(word.hashes)}
                                     onClick={()=>{this.showDefinedWord(keyVerse,keyWord)}}>
                            {word.text}
                        </span>
                    }
                    else{
                        switch (word.selectedHash) { ///--->iteration of other words
                            case false : {
                                if(word.hashes.length === 0){
                                    return <span className={'pe-1 ps-1 bg-danger border my-word'} key={keyWord}  data-declin = {JSON.stringify(word.hashes)}
                                                 onClick={()=>{this.handleWord(keyVerse,keyWord)}}>
                                    {word.text}
                                </span>
                                }
                                else {
                                    return <span className={'pe-1 ps-1 bg-warning border my-word'} key={keyWord}  data-declin = {JSON.stringify(word.hashes)}
                                                 onClick={()=>{this.handleWord(keyVerse,keyWord)}}>
                                    {word.text}
                                </span>
                                }
                            }
                            default : {
                                return <span className={'pe-1 ps-1 bg-success border my-word'} key={keyWord}  data-declin = {JSON.stringify(word.hashes)}
                                             onClick={()=>{this.handleWord(keyVerse,keyWord)}}>
                                {word.selectedHash}
                            </span>
                            }
                        }
                    }
                })
                return <div className={'pb-1 my-row'} key={keyVerse}>{row}</div>
            })


        return(
            <>
                <Modal size="lg" show={this.props.show} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton className={'small'} onClick={()=>{this.handleModal()}}>{titleModal}</Modal.Header>
                    <Modal.Body>
                        <div className={'container my-piece-composition'}>{ rowsWordsHashes } </div>
                        { formHash }
                    </Modal.Body>
                </Modal>
                <div>
                </div>
            </>
        )
    }
}

export default EditorCompostionHashes