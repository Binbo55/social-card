import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { cardAdded } from '../CardSlice';
import './AddCard.css';
import images from '../../assets/images/index';
// Material UI
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import TextareaAutosize from '@mui/base/TextareaAutosize';

AddCard.propTypes = {

};


function AddCard(props) {
    const { open, handleClose, render, handleCheckAdd } = props
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    const [description, setDesc] = useState('')
    const [image, setImage] = useState('')
    const [nameError, setNameError] = useState(false)
    const [avatarError, setAvatarError] = useState(false)
    const [descError, setDescError] = useState(false)

    const dispatch = useDispatch();


    const onNameChanged = (e) => {
        setName(e.target.value)
        setNameError('')
    }

    const onDescriptionChanged = (e) => {
        setDesc(e.target.value)
        setDescError('')
    }
    const onAvatarChanged = async (e) => {
        const files = e.target.files[0]
        const fileTypes = files.type

        const avaData = new FormData()
        avaData.append('file', files)
        avaData.append('upload_preset', 'ava-upload')
        if (fileTypes === 'image/jpeg' || fileTypes === 'image/png') {
            const res
                = await fetch('https://api.cloudinary.com/v1_1/hieuduke123/image/upload',
                    {
                        method: 'POST',
                        body: avaData
                    }
                )

            const file = await res.json()

            setAvatar(file.secure_url)
            setAvatarError(false)
        } else {
            alert('File the not match!!')
            setAvatar('')
            setAvatarError(true)
        }
    }

    const onImageChanged = async (e) => {
        const files = e.target.files[0]
        const fileTypes = files.type
        const imgData = new FormData()
        imgData.append('file', files)
        imgData.append('upload_preset', 'image-upload')
        if (fileTypes === 'image/jpeg' || fileTypes === 'image/png') {
            const res
                = await fetch('https://api.cloudinary.com/v1_1/hieuduke123/image/upload',
                    {
                        method: 'POST',
                        body: imgData
                    }
                )

            const file = await res.json()
            setImage(file.secure_url)

        } else {
            alert('File the not match!!')

            setImage('')
        }
    }



    // save card handle\
    const onSavePostClicked = async (e) => {
        let check = true
        if (avatar && name && description) {
            dispatch(
                await cardAdded(avatar, name, description, image)
            )
            setAvatar('')
            setName('')
            setDesc('')
            handleCheckAdd()
            handleClose()
        }
        // validate name
        if (name === "") {
            check = false
            setNameError(true)
            e.preventDefault();
        } else {
            check = true
            setNameError(false)
        }
        // description
        if (description === "") {
            check = false
            setDescError(true)
            e.preventDefault();
        }
        else {
            check = true
            setDescError(false)
        }
        // avatar
        if (avatar === "") {
            check = false
            setAvatarError(true)
            e.preventDefault();
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
        setImage('')
        setAvatarError(false)
        setDescError(false)
        setNameError(false)
        handleClose()
    }


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent id="popup-dialog" >
                <div className='add-list-heard'>Add New Card</div>
                <Stack id="stack-add"
                    style={avatarError ? { color: "#F3115E" } : { color: "#000" }}
                    className='stack'
                    direction="row" spacing={6}>
                    <div className='content-title'>Avatar<span>*</span></div>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file"
                            className="stack-input-ava"
                            multiple type="file"
                            name='file'
                            onChange={onAvatarChanged}

                        />
                        <div className='stack-upload'>
                            <img src={avatarError ? images.red : images.upload}
                                className="upload-icon" />
                            <div className='content-upload'>{avatar !== '' ? avatar : 'Upload image'}</div>
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
                    <label htmlFor="contained-button-file-img">
                        <Input accept="image/*"
                            id="contained-button-file-img"
                            multiple
                            type="file"
                            name='image'
                            onChange={onImageChanged} />
                        <div className='stack-upload'>
                            <img src={images.upload} alt="upload" className="upload-icon" />
                            <div className='img-name'>{image !== '' ? image : 'Upload image'}</div>
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

export default AddCard;