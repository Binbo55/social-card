import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import './UpdateCard.css';
import images from '../../assets/images/index';
import { useParams } from 'react-router-dom';
// Material UI
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { editCard } from '../CardSlice';


UpdateCard.propTypes = {

};

function UpdateCard(props) {
    const { edit, handleCloseEdit, getId } = props

    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    const [description, setDesc] = useState('')
    const [image, setImage] = useState('')

    const [nameError, setNameError] = useState(false)
    const [avatarError, setAvatarError] = useState(false)
    const [descError, setDescError] = useState(false)


    const dispatch = useDispatch();

    // useEffect(() => {
    //     editCard.get(edit)
    //         .then((res) => {
    //             setName(res.name);
    //             setAvatar(res.avatar);
    //             setDesc(res.description);
    //             setImage(res.image);
    //         })
    //         .catch((err) => console.log(err))
    // })

    const onAvatarChanged = (e) => {
        setAvatar(e.target.value)
        setAvatarError("")
        console.log(e.target.value)
        console.log(avatarError)
    }

    const onNameChanged = (e) => {
        setName(e.target.value)
        setNameError('')
    }

    const onDescriptionChanged = (e) => {
        setDesc(e.target.value)
        setDescError('')
    }
    const onImageChanged = (e) => {
        setImage(e.target.value)
    }

    // save card handle\
    const onSavePostClicked = async (event) => {
        let check = true
        const id = getId

        if (check) {

            await dispatch(
                editCard(id, avatar, name, description)
            )
            setAvatar('')
            setName('')
            setDesc('')
            console.log('update thanfh coong')
            window.location.href = "/"
        }
        // validate name
        if (name === "") {
            check = false
            setNameError(true)
            event.preventDefault();
        } else {
            check = true
            setNameError(false)
        }
        // description
        if (description === "") {
            check = false
            setDescError(true)
            event.preventDefault();
        }
        else {
            check = true
            setDescError(false)
        }

        if (avatar === "") {
            check = false
            setAvatarError(true)
            event.preventDefault();
        }
        else {
            check = true
            setAvatarError(false)
        }

    }


    // handlerCloseCancel
    const handlerCloseCancel = () => {
        setAvatar('')
        setName('')
        setDesc('')
        setAvatarError(false)
        setDescError(false)
        setNameError(false)
        handleCloseEdit()
    }

    return (
        <Dialog
            // to={`/update/${post._id}`}
            // onSubmit={handleSubmit(onSubmit)}
            // className="wrap-popup-add"
            BackdropProps={{
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                    boxShadow: 'none',
                },
            }}
            PaperProps={{
                style: {
                    boxShadow: 'none',
                },
            }}
            open={edit}
            onClose={handleCloseEdit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent id="popup-dialog" >
                <div className='add-list-heard'>Edit Card</div>
                <Stack id="stack-add"
                    style={avatarError ? { color: "#F3115E" } : { color: "#000" }}

                    className='stack'
                    direction="row" spacing={6}>
                    <div className='content-title'>Avatar<span>*</span></div>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file"

                            className="stack-input-ava"
                            multiple type="file"
                            name='avatar'
                            value={avatar}
                            onChange={onAvatarChanged} />
                        <div className='stack-upload'>
                            <img src={avatarError ? images.red : images.upload}
                                // style={inputError ? {} : {backgroundImage: url(images.upload)}}
                                className="upload-icon" />
                            <div className='content-upload'>Upload image</div>
                        </div>
                    </label>
                </Stack>
                <Stack id="stack-add"
                    className='stack'
                    style={nameError ? { color: "#F3115E" } : { color: "#000" }}
                    direction="row" spacing={6.3}>
                    <div className='content-title'>Name<span>*</span></div>
                    <InputGroup className="stack-input" style={nameError ? { border: "1px solid #F3115E", borderRadius: "5px" } : { color: "#000" }} >
                        <FormControl
                            placeholder="Name"
                            aria-label="Username"
                            value={name}
                            aria-describedby="basic-addon1"
                            onChange={onNameChanged}
                        />
                    </InputGroup>
                </Stack>
                <Stack id="stack-add"
                    style={descError ? { color: "#F3115E" } : {}}
                    className='stack'
                    direction="row" spacing={1.4}>
                    <div className='content-title'>Description<span>*</span></div>
                    <InputGroup className="stack-input">
                        <TextareaAutosize
                            className='text-area'
                            placeholder="Description"
                            aria-label="Username"
                            value={description}
                            aria-describedby="basic-addon1"
                            onChange={onDescriptionChanged}
                            style={descError ? { border: "1px solid #F3115E" } : {}}
                        />
                    </InputGroup>
                </Stack>
                <Stack id="stack-add" direction="row" spacing={6.8} alignItems="center" >
                    <div className='content-title'> Image:</div>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*"
                            id="contained-button-file"
                            multiple type="file"
                            value={image}
                            onChange={onImageChanged} />
                        <div className='stack-upload'>
                            <img src={images.upload} alt="upload" className="upload-icon" />
                            <div>Upload image</div>
                        </div>
                    </label>
                </Stack>
                <hr className='hr-add' />
                <DialogActions className='btn-group'>
                    <Button id='btn-save'
                        style={{ backgroundColor: '#064EBC' }}
                        variant="contained"
                        onClick={onSavePostClicked}>
                        Save
                    </Button>
                    <Button id='btn-cancel' onClick={handlerCloseCancel}>Cancel</Button>
                </DialogActions>

            </DialogContent>
        </Dialog>


    );
}

export default UpdateCard;