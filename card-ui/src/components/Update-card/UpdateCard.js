import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editCard } from '../CardSlice';
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


UpdateCard.propTypes = {

};

function UpdateCard(props) {
    const { edit, editId, handleCloseEdit } = props
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    const [description, setDesc] = useState('')
    const [image, setImage] = useState('')

    const [editCard, setEditCard] = useState([])

    const [nameEditErr, setNameEditErr] = useState(false)
    const [descEditErr, setDescEditErr] = useState(false)
    const [avatarEditErr, setAvatarEditErr] = useState(false)
    const dispatch = useDispatch();


    // get Api to display
    function handleUpdate() {
        dispatch(editCard(editId))
        window.location.reload()
    }

    const onAvatarChanged = (e) => {
        setAvatar(e.target.value)
        setAvatarEditErr('')
    }

    const onNameChanged = (e) => {
        setName(e.target.value)
        setNameEditErr('')
    }

    const onDescriptionChanged = (e) => {
        setDesc(e.target.value)
        setDescEditErr('')
    }
    const onImageChanged = (e) => {
        setImage(e.target.value)
    }

    // useEffect(() => {
    //     axios.get(`http://192.168.0.146:3032/api/card/${path.id}`)
    //         .then((response) => setCard(response.data))
    //         .catch((error) => console.log(error));
    // }, []);


    // save card handle
    const onSavePostClicked = async (e) => {
        let check = true
        if (avatar && name && description) {
            dispatch(
                editCard(avatar, name, description)
            )
            setAvatar('')
            setName('')
            setDesc('')
            window.location.href = "/"
        }
        // avatar
        if (avatar === "") {
            check = false
            setAvatarEditErr(true)
        }
        else {
            check = true
            setAvatarEditErr(false)
        }
        // name
        if (name === "") {
            check = false
            setNameEditErr(true)
        }
        else {
            check = true
            setNameEditErr(false)
        }
        // description
        if (description === "") {
            check = false
            setDescEditErr(true)
        }
        else {
            check = true
            setDescEditErr(false)
        }
        e.preventDefault();
    }




    const handleCancelEdit = () => {
        setAvatar('')
        setName('')
        setDesc('')

        setAvatarEditErr(false)
        setDescEditErr(false)
        setNameEditErr(false)
        handleCloseEdit()
    }

    return (
        <Dialog
            className="wrap-popup-add-edit"
            open={edit}
            onClose={handleCloseEdit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent id="popup-dialog-edit" >
                <div className='add-list-heard-edit'>Edit Card</div>
                <Stack id="stack-add-edit"
                    direction="row"
                    spacing={6}
                    style={avatarEditErr ? { color: "#F3115E" } : { color: "#000" }}
                >
                    <div className='content-title-edit'>Avatar<span>*</span></div>
                    <label htmlFor="contained-button-file-edit">
                        <Input accept="image/*" id="contained-button-file-edit" multiple type="file"
                            value={avatar}
                            onChange={onAvatarChanged}
                        />
                        <div className='stack-upload-edit' >
                            <img src={avatarEditErr ? images.red : images.upload} alt="upload" className="upload-icon" />
                            <div className='content-upload' >{avatar || 'image'}</div>
                        </div>
                    </label>
                </Stack>
                <Stack id="stack-add-edit" direction="row" spacing={6.3}
                    style={nameEditErr ? { color: "#F3115E" } : { color: "#000" }}
                >
                    <div className='content-title-edit'>Name<span>*</span></div>
                    <InputGroup className="stack-input-edit"
                        style={nameEditErr ? { border: "1px solid #F3115E", borderRadius: "5px" } : { color: "#000" }}
                    >
                        <FormControl
                            placeholder="Name"
                            aria-label="Username"
                            value={name}
                            aria-describedby="basic-addon1"
                            onChange={onNameChanged}
                        />
                    </InputGroup>
                </Stack>
                <Stack id="stack-add-edit"
                    direction="row"
                    spacing={1.4}
                    style={descEditErr ? { color: "#F3115E" } : { color: "#000" }}
                >
                    <div className='content-title-edit'>Description<span>*</span></div>
                    <InputGroup className="">
                        <TextareaAutosize
                            className='edit-text-area'
                            style={descEditErr ? { border: "1px solid #F3115E" } : { color: "#000" }}
                            placeholder="Description"
                            aria-label="Username"
                            value={description}
                            aria-describedby="basic-addon1"
                            onChange={onDescriptionChanged}
                        />
                    </InputGroup>
                </Stack>
                <Stack id="stack-add-edit" direction="row" spacing={6.8} alignItems="center" >
                    <div className='content-title-edit'> Image:</div>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" value={image} onChange={onImageChanged} />
                        <div className='stack-upload-edit'>
                            <img src={images.upload} alt="upload" className="upload-icon-edit" />
                            <div>Upload image</div>
                        </div>
                    </label>
                </Stack>
                <hr className='hr-add-edit' />
                <DialogActions className='btn-group-edit'>
                    <Button id='btn-save'
                        style={{ backgroundColor: '#064EBC' }}
                        variant="contained"
                        onClick={onSavePostClicked}>
                        Save
                    </Button>
                    <Button id='btn-cancel-edit' onClick={handleCancelEdit}>Cancel</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateCard;