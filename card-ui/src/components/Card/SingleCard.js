import axios from "axios";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Image2x from '../../assets/images/Image1@2x.png';
import images from '../../assets/images/index';
import './SingleCard.css';
import { getCard } from '../CardSlice';
// Material UI
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
function SingleCard() {
    const path = useParams();
    const dispatch = useDispatch();
    const [card, setCard] = useState([]);
    const [comments, setComments] = useState([]);
    const [saveComment, setSaveComment] = useState("");
    const [heart, setHeart] = useState(0);
    const [comentError, setCommentError] = useState(false);
    const navigate = useNavigate();


    // get api to display


    useEffect(() => {

        axios.get(`http://192.168.0.146:3032/api/card/${path.id}`)
            .then((response) => response.data.deleted === false ? setCard(response.data) : navigate('/'))
            .catch((error) => console.log(error));
    }, [heart, comments]);



    useEffect(() => {
        axios.get(`http://192.168.0.146:3032/api/card/${path.id}`)
            .then((res) => setHeart(res.data.heart))
            .catch((err) => console.log(err));
    }, [heart]);

    // get api to display comment
    useEffect(() => {
        axios.get(`http://192.168.0.146:3032/api/comment/card/${path.id}`)
            .then((res) => setComments(res.data))
            .catch((err) => console.log(err));
    }, [comments]);

    // Click like handle
    const handleClickTym = async () => {
        await axios.put(`http://192.168.0.146:3032/api/card/heart/${path.id}`)
            .then((res) => setHeart(res.data.heart))
            .catch((err) => { console.log(err); })
    };

    // convert created date
    const convertDate = (day) => {
        const date = new Date(day);
        const dateAt = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return dateAt;
    };

    // List comment
    const listComments = comments.map((comment, index) => (
        <li className="social-comt" key={index}>
            <div className="comt-date">{convertDate(comment.createdAt)}</div>
            <div className='comt'> {comment.comment}</div>
        </li>
    ));

    const handleSubmitComment = async (e) => {
        let check = true
        const data = { cardId: path.id, comment: saveComment }
        // console.log(saveComment)

        if (saveComment === "") {
            check = false
            setCommentError(true)
        } else {
            check = true
            setCommentError(false)
        }

        if (!check) {
            setCommentError(true)
        } else {
            await axios.post(`http://192.168.0.146:3032/api/comment/add`, data)
                .then((res) => window.location.reload())
                .catch((error) => console.log(error));
            setCommentError(false)
            setComments('')
        }
    }

    return (
        <div className="single-social">
            <div className="social-title">SOCIAL CARD DETAIL</div>
            < article className="socials" >
                <div className="social-header">
                    <img className="social-avatar" src={card.avatar} alt='r' />
                    <div className='social-user-header'>
                        <div className='social-name'>{card.name}</div>
                        <div className='social-date'>{convertDate(card.createdAt)}</div>
                    </div>
                </div>
                <div className="social-body">
                    <div className="social-desc">{card.description}</div>
                    <div className='social-images'>
                        <img
                            className="social-image" src={card.image || Image2x} alt='' />
                    </div>
                    <div className="social-icons">
                        <div className='social-icon1'>
                            <img onClick={() => handleClickTym()}
                                src={images.heart} alt="heart" className="heart-icon" />
                            <div><span>{`${heart}`}</span></div>
                        </div>
                        <div className='social-icon2'>
                            <img src={images.comment} alt="comment" className="comment-icon"
                            />
                            <div><span>{comments.length}</span></div>
                        </div>
                    </div>
                </div>
                <hr className='hr-card' />

                <div className='social-comments'>
                    {listComments}
                </div>

                <hr className='hr-card' />
                <div className='center-footer'>
                    <div className='social-footer'>
                        <div className='footer-title'>Post a new coment</div>
                        <div className='input-base-comt'>
                            <TextareaAutosize
                                id='form-search-cmt'

                                style={comentError ? { border: "1px solid #F3115E" } : {}}
                                placeholder='Add comment...'
                                onChange={(e) => setSaveComment(e.target.value)}
                            />
                            <Button className='btn-add-post'
                                variant="contained"
                                onClick={handleSubmitComment}
                            >
                                Post
                            </Button>
                        </div>
                    </div>
                </div>

            </article >
            <div className="cards-list" >

            </div>
        </div>
    )
}


export default SingleCard
