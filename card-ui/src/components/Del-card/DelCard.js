import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from '../CardSlice';
import { addRevert } from '../RevertSlice';
import './DelCard.css';
import images from '../../assets/images/index';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

DelCard.propTypes = {};

function DelCard(props) {

    const dispatch = useDispatch();
    const { del, handleCloseDel, getId } = props

    // handle delete and update
    function handleDelete() {
        dispatch(deleteCard(getId))
        dispatch(addRevert(getId))
        // window.location.reload()
        handleCloseDel()
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
            open={del}
            onClose={handleCloseDel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <div id="popup-delete" >
                <div className='del-list-title'>Your about to delete a item</div>
                <div id="stack-del"
                    direction="row"
                    spacing={6.3}
                    alignItems="center" >
                    <label htmlFor="contained-button-file" className='contained-button-file'>
                        <div className='stack-delete'>
                            <img src={images.bigtrash} alt="upload" className="delete-icon" />
                            <div className="del-content">This will delete your item form list <br /> Are you sure?</div>
                        </div>
                    </label>
                </div>
                <hr className='hr-del' />
                <div className='btn-del'>
                    <Button id='btn-delete'
                        style={{ backgroundColor: '#064EBC' }}
                        variant="contained"
                        onClick={() => handleDelete(getId)}
                    >
                        Delete
                    </Button>
                    <Button id='btn-cancel' onClick={handleCloseDel}>Cancel</Button>
                </div>
            </div>
        </Dialog>
    );
}

export default DelCard;
