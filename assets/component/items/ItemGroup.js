import React from "react";

const ItemContainer = (props) => {

    const handleDelete = async () => {

       // alert('Elimino il Group e le Associazioni ai Container, Composition e Alle Associazioni Con i Creator')

        const response = await fetch(`/api/group?id=${props.value.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
           // alert('Elemento eliminato con successo');
            props.childRend('')
        } else {
            console.log('Errore durante l\'eliminazione dell\'elemento');
        }
    }

    const handleModify = () => {
        console.log(props)
        props.showEditGroup(props.value.id)
    }


    return (
        <li className="col list-unstyled" key={props.value.id}>
                    <div className="card shadow-sm">

                        <div className="card-body">
                            <p className="card-text text-capitalize">
                                <span>{props.value.name}</span>
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleModify}>Modifica</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleDelete}>Elimina</button>
                                </div>
                                <div className="d-flex flex-column text-muted">
                                    <small className={'font-bold'}></small>
                                </div>
                            </div>
                        </div>
                    </div>
        </li>
    );
}

export default ItemContainer;