import React, {useEffect} from "react";
import Article from "../article";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../loader";
import {Pagination} from "antd";
import styles from "../../styles/pagination.module.scss";
import {fetchDispatch, setCurrentPage} from "../../redux/actions/articles";
import {isLiked, isLikeDelete} from "../../redux/actions/likes";
import {useNavigate} from "react-router-dom";

const ArticlesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const articlesList = useSelector(state => state.articles.articlesData); // массив со всеми статьями
    const newResponse = articlesList.map(el => ({...el, id: el.slug})) // с уникальным айди
    const loading = useSelector(state => state.articles.isLoading)
    const isErrorLike = useSelector(state => state.likes.isError);
    const totalCount = useSelector(state => state.articles.totalCount);
    const currentPage = useSelector(state => state.articles.currentPage) // по дефолту 1
    const isToken = JSON.parse(localStorage.getItem('token')) !== null;
    const isLogin = useSelector(state => state.userLogin.isLogin) // false по дефолту

    const statusLike = useSelector(state => state.likes.isLike);
    const statusUnLike = useSelector(state => state.likes.isUnlike);

    useEffect( () => {
        dispatch(fetchDispatch(5, currentPage, dispatch))
        if (statusLike || statusUnLike) {
            dispatch(isLiked(null))
        } if (statusLike === false || statusUnLike === false) {
            dispatch(isLikeDelete(null));
        }
    }, [currentPage, statusLike, statusUnLike, isToken, isErrorLike])

    // const handleLike = (el) => {
    //     if (isToken) {
    //         if (!el.favorited) {
    //             dispatch(likeArticle(el.slug))
    //         } if(el.favorited) {
    //             dispatch(deleteLike(el.slug))
    //         }
    //     } else {
    //         return notification['warning']({
    //             message: 'Error',
    //             description: 'You should sign in'
    //         })
    //     }
    // }

    const loader = loading ? <Loader /> : null;

    const article = newResponse.map(el => { // возвращается массив с артиклями
        return (
                <Article
                key={el.id}
                id={el.slug}
                title={el.title}
                info={el.description}
                date={el.createdAt}
                tag={el.tagList}
                num={el.favoritesCount}
                fav={el.favorited}
                profile={el.author.username}
                avatar={el.author.image}
                // likeArticle={() => handleLike(el)}
            />
        )
    })

    const updatePage = async (curr) => {
        dispatch(setCurrentPage(curr))
    }

    return (
        <div>
            {loader}
            {article}
            <Pagination size="small"
                        onChange={updatePage}
                        className={styles['pagination-list']}
                        current={currentPage}
                        total={totalCount}/>
        </div>
    )
}

export default ArticlesList;