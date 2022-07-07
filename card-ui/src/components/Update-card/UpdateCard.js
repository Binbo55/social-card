import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import './UpdateCard.css';
import images from '../../assets/images/index';
// Material UI
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useParams } from 'react-router-dom';
import { editCard } from '../CardSlice';
import axios from 'axios';


UpdateCard.propTypes = {

};

function UpdateCard(props) {
    const { edit, handleCloseEdit, getId } = props
    const path = useParams();
    const [avatar, setAvatar] = useState(null)
    const [name, setName] = useState('')
    const [description, setDesc] = useState('')
    const [image, setImage] = useState('')

    const [nameError, setNameError] = useState(false)
    const [avatarError, setAvatarError] = useState(false)
    const [descError, setDescError] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://192.168.0.146:3032/api/card/${getId}`)
            .then((res) => {
                setName(res.data.name);
                setAvatar(res.data.avatar);
                setDesc(res.data.description);
                setImage(res.data.image);
            })

    }, [getId])



    const onAvatarChanged = async (e) => {
        const files = e.target.files[0]
        const fileTypes = files.type
        console.log(fileTypes)
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
            setAvatar(pre => file.secure_url)
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
            const res = await fetch('https://api.cloudinary.com/v1_1/hieuduke123/image/upload',
                {
                    method: 'POST',
                    body: imgData
                }
            )
            const file = await res.json()

            setImage(file.secure_url)
            setImage(pre => file.secure_url)
        } else {
            alert('File image the not match!!')
            setImage('')
        }


    }


    const onNameChanged = (e) => {
        setName(e.target.value)
        setNameError('')
    }

    const onDescriptionChanged = (e) => {
        setDesc(e.target.value)
        setDescError('')
    }

    // save card handle\
    const onSavePostClicked = async (event) => {
        let check = true
        const id = getId
        if (name === "") {
            check = false
            setNameError(true)
            event.preventDefault();
        } else {
            check = true
            setNameError(false)
        }
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
        if (!check) {
            event.preventDefault();
        } else if (avatar && name && description) {
            await dispatch(
                editCard(getId, avatar, name, description, image)
            )
            setAvatar('')
            setName('')
            setDesc('')
            handlerCloseCancel()
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
                    <label htmlFor="contained-button-file-avatar">
                        <Input accept="image/*" id="contained-button-file-avatar"
                            className="stack-input-ava"
                            multiple type="file"
                            name='file'
                            onChange={onAvatarChanged} />
                        <div className='stack-upload'>
                            <img src={avatarError ? images.red : images.upload}
                                className="upload-icon" />
                            <div className='img-name-edit'>{avatar || 'Upload image'}</div>
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
                            name='image'
                            onChange={onImageChanged} />
                        <div className='stack-upload'>
                            <img src={images.upload} alt="upload" className="upload-icon" />
                            <div className='img-name-edit'> {image !== '' ? image : 'Upload image'}</div>
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