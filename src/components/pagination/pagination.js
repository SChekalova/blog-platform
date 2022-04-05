import React from "react";
import { Pagination } from "antd";
import 'antd/dist/antd.css';
import styles from '../../styles/pagination.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getArticles, setCurrentPage} from "../../redux/actions";
import ApiService from "../../utilities/api-service/api-service";

const PaginationArticles = () => {
    const dispatch = useDispatch()
    const api = new ApiService();
    const totalCount = useSelector(state => state.articles.totalCount);
    console.log(totalCount)
    const perPage = useSelector(state => state.articles.perPage);
    const currentPage = useSelector(state => state.articles.currentPage)

    const updatePage = async (curr) => {
        dispatch(setCurrentPage(curr))
        const res = await api.getPagination(5, curr) // получаем пять статей
        // dispatch(getArticles(res))
        console.log(curr)
        console.log(currentPage)
    }

    console.log(currentPage)

    return (
        <Pagination size="small"
                    onChange={updatePage}
                    className={styles['pagination-list']}
                    current={currentPage}
                    total={totalCount}/>
    )
}

export default PaginationArticles;