import React, { Component, useState } from "react";

import TutorialDataService from "../services/tutorial.service";

const AddTutorial = () =>  {
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [published, setPublished] = useState(true)
    const [submitted, setSubmitted] = useState(false)

    function handleTitleChange(e){
        setTitle(e.target.value)
    }

    function handleDescriptionChange(e){
        setDescription(e.target.value)
    }

    function handleSaveTutorial(){
        var data = {
            id: id,
            title: title,
            description: description
        }

        TutorialDataService.create(data)
        .then(response => {
            setId(id)
            setTitle(title)
            setDescription(description)
            setPublished(published)
            setSubmitted(true)
            // this.setState({
            // id: id,
            // title: title,
            // description: description,
            // published: published,
            // submitted: true
            
            // });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    function handleNewTutorial(){
        setId('')
        setTitle('')
        setDescription('')
        setPublished(false)
        setSubmitted(false)
    }


    return (
        <div className="submit-form">
        {submitted ? (
            <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={handleNewTutorial}>
                Add
            </button>
            </div>
        ) : (
            <div>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={handleTitleChange}
                name="title"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={handleDescriptionChange}
                name="description"
                />
            </div>

            <button onClick={handleSaveTutorial} className="btn btn-success">
                Submit
            </button>
            </div>
        )}
        </div>
    )
}

export default AddTutorial