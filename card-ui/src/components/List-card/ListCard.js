import React from 'react'
import "./ListCard.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import AddCard from '../Add-card/AddCard';
import { Link, useNavigate } from "react-router-dom";
import images from '../../assets/images/index';
import Image1 from '../../assets/images/Image1.png';
// material UI
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import DelCard from '../Del-card/DelCard';
import UpdateCard from '../Update-card/UpdateCard';
import NoCard from '../None/NoCard';
import { addRevert, removeRevert, selectRevert } from '../RevertSlice';
import SocialCardsApi from '../../apis/socialCardApi';




export const ListCard = () => {

    const [render, setRender] = useState();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);

    const [del, setDel] = React.useState(false);
    const [edit, setEdit] = React.useState(false);

    const [getId, setGetId] = React.useState("");

    const revert = useSelector(selectRevert);
    const [addCheck, setAddCheck] = React.useState(false);
    const [countRevert, setCountRevert] = useState(0);

    //search
    const [search, setSearch] = useState('')



    // get data and show off
    useEffect(() => {
        setTimeout(() => {
            axios('http://localhost:3032/api/card')
                .then(res => setData(res.data.data))

        }, 500);

    }, [open, del, edit, countRevert])


    const dat = data.length - 1;
    if (addCheck && data.length > 0) {
        setTimeout(() => {
            dispatch(addRevert(data[dat]._id))

        }, 900)
        setAddCheck(false)
    }


    const filterCard = data.filter(post => post.name.includes(search) || post.description.includes(search))

    // Handle pop up form
    // pop up edit
    const handleCickEdit = (id) => {
        setGetId(id)
        setEdit(true);
    }
    // pop up del
    const handleClickDel = (id) => {
        setGetId(id)
        setDel(true);
    }
    //popup add
    const handleClickOpen = () => {
        setOpen(true);
    };


    //Get date created
    const convertDate1 = (day) => {
        const date = new Date(day);
        const dateAt = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return dateAt;
    };

    const handleCloseEditLast = () => {
        setEdit(false);
        setGetId(null);
    }

    const renderedPosts = filterCard.map(post => (
        <>
            {
                !post.deleted &&
                < article className="cards" key={post._id} >
                    <div className="cards_header">
                        <div className="cards_user">
                            <img className="avatar" src={post.avatar} alt='' />
                            <div className='user-header'>
                                <Link className='decoration' to={`/card/` + post._id}>
                                    <div className='cards_name'>{post.name}</div>
                                </Link>
                                <div className='cards_date'>{convertDate1(post.createdAt)}</div>
                            </div>
                        </div>
                        <div className="cards_icon">
                            <img src={images.pencil} alt="pencil" className="pencil-icon"
                                to={`/update/${post._id}`}
                                onClick={() => handleCickEdit(post._id)} />
                            <img src={images.trash} alt="trash" className="trash-icon" onClick={() => handleClickDel(post._id)}
                            />
                        </div>
                    </div>
                    <div className="cards_footer">
                        <div className="cards_desc">{post.description}</div>
                        <img className="cards_image" src={!post.image ? Image1 : post.image} alt='' />
                    </div>
                </article >
            }
        </>
    ))

    const handlerClose = () => {
        setOpen(!open)
    }

    const handleCheckAdd = () => {
        setAddCheck(!addCheck)
    }



    const handleClickRevert = async () => {
        if (revert.length > 0) {
            await SocialCardsApi.revertCard(revert[0]);
            dispatch(removeRevert());
            setCountRevert(countRevert + 1);
        } else alert('Bạn đã ở trạng thái đầu')
    }

    return (
        <section>
            <div className="title">List social card</div>
            {/* Card bar */}
            <div className="group-bar">
                <div className='group-btn'>
                    <Stack id="btns" direction="row" spacing={2}>
                        <Button id="revert-btn"
                            onClick={handleClickRevert}
                            style={{ backgroundColor: '#F1B44C' }} variant="contained">Revert</Button>


                        <Button id="add-btn" onClick={handleClickOpen} style={{ backgroundColor: '#064EBC' }} variant="contained">
                            Add New
                        </Button>
                        {/* Popup */}
                    </Stack>

                    <AddCard id='Popup-show' open={open} render={render} handleCheckAdd={handleCheckAdd} handleClose={handlerClose}
                    />
                </div>
                <div className='search-form'>
                    <Paper
                        id="form-search"
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            id='search-input'
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search name..."
                            inputProps={{ 'aria-label': 'search' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <img className='search-icon' style={{ textColor: 'blue' }} src={images.search} alt="" />
                        </IconButton>
                    </Paper>
                </div>
            </div>
            {/* Card list */}
            <div className="cards-list" >
                {edit && (
                    <UpdateCard id='Popup-edit' getId={getId} edit={edit} handleCloseEdit={handleCloseEditLast} />
                )}
                {del && (
                    <DelCard id='Popup-show' getId={getId} del={del} handleCloseDel={() => setDel(false)} />
                )}
                {filterCard.length > 0 ? renderedPosts : <NoCard />}
            </div>
        </section >
    )
}
