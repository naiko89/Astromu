import React from "react";

const CompositionItem = (props) => {

    const handleDelete = async () => {
        const response = await fetch(`/api/compositions?id=${props.value.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('Elemento eliminato con successo');
            props.childRend()
        } else {
            console.log('Errore durante l\'eliminazione dell\'elemento');
        }
    }


    return (
        <li className="col list-unstyled" key={props.value.id}>
                    <div className="card shadow-sm">

                        <div className="card-body">
                            <p className="card-text">
                                <span>{props.value.name}</span>
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary" >Modifica</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleDelete}>Elimina</button>
                                </div>
                                <div className="d-flex flex-column text-muted">
                                    <small className={'font-bold'}>{props.value.creator.name}</small>
                                    <small>{props.value.container.name}</small>
                                </div>
                            </div>
                        </div>
                    </div>
        </li>
    );
}

export default CompositionItem;