import React, {useState,useEffect,useContext} from 'react';
import {Table} from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PaginationCustom from './../../pagination'
import  FormComponent from './../../form-component';
import  BlockHeader from './../../block-header';

import chartImage from '../../../assets/images/chart.png'

import './Deal-details.css';

const DealDetails = () => {
    const [edit, setEdit] = useState(true);
    const [page, setPage] = useState(false);
    const data = {
        dealName: 'Largest Summer Cyber Monday Sale',
        servicePicture: '',
        originalPrice: '$500.00',
        discountedPrice: '$300.00',
        dealStartDate: '06/13/2020',
        dealEndDate: '06/13/2020',
        dealPublishDate: '06/13/2020',
        dealDescription: 'Cheaper Than Black Friday iMac + Free 2 Day Shipping'
    }
    return (
        <div className="col-12">
            <div className="d-flex flex-wrap bg-white deal-details overflow-hidden w-100">
                <div className="w-100 main-header d-flex align-items-center">
                    <a href="" className="back text-decoration-none">
                        <i className="icon-angle-left"/>
                        Deals</a>
                    <BlockHeader  title="Largest Summer Cyber Monday Sale" buttonText="Share deal" buttonIcon="icon-share-square" hander={share}/>
                </div>
                <section className="col-md-6 p-0">
                    <div className="deal-details__header">
                        <BlockHeader title="Deal details" buttonText="Edit deal" buttonIcon="icon-pen"/>
                    </div>
                    <FormComponent edit={edit} data={data} page={page}/>
                    <div className="deal-details__header">
                        <BlockHeader title="Sales Summary"/>
                    </div>
                    <div className="total-container">
                        <div className="total-block">
                            <p className="total-block__title m-0">Total sales</p>
                            <h2 className="total-block__count m-0">30</h2>
                        </div>
                        <div className="total-block">
                            <p className="total-block__title m-0">Total revenue</p>
                            <h2 className="total-block__count m-0">$15,000</h2>
                        </div>

                        <div className="total-block">
                            <p className="total-block__title m-0">Invites Sent</p>
                            <h2 className="total-block__count m-0">2,400</h2>
                        </div>
                        <div className="total-block">
                            <p className="total-block__title m-0">Views</p>
                            <h2 className="total-block__count m-0">5,043</h2>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between select-container">
                    <div className="d-flex align-items-center">
                        <p className="m-0 showing-label">Showing for: </p>
                        <FormControl>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={10}
                            >
                                <MenuItem value={10}> calendar  30 June - 5 August 2020 angle-down</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                        <p className="sales d-flex align-items-center m0">Sales</p>
                    </div>
                    <div className="chart-container">
                        <img src={chartImage} className="w-100" alt=""/>
                    </div>
                </section>
                <section className="table-block col-md-6 p-0 d-flex flex-column">
                    <div className="deal-details__header">
                        <BlockHeader title="Customers that purchased this deal"/>
                    </div>
                    <div className="flex-grow-1 deal-table-container h-100">
                        <Table responsive className='deal-table border-0 m-0'>
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="align-middle text-truncate ">07/08/2020 05:20 PM</td>
                                <td className="align-middle ">
                                    <a href=""
                                       className="d-flex align-items-center user text-decoration-none text-truncate bold-text">
                                        <figure
                                            className="rounded-circle overflow-hidden m-0 user__image flex-shrink-0 d-flex align-items-center justify-content-center">
                                            {/*<img className="thumbnail-image img-fluid w-100 h-100"*/}
                                            {/*alt="user pic"*/}
                                            {/*/>*/}
                                            <i className="icon-user"/>
                                        </figure>
                                        <span className="user__name">
                                             {'Steve Rogers'}
                                         </span>
                                    </a></td>
                                <td className="align-middle text-truncate">+1 800 1234 567</td>
                                <td className="align-middle text-truncate">sample@sample.com</td>
                            </tr>
                            <tr>
                                <td className="align-middle text-truncate">07/08/2020 05:20 PM</td>
                                <td className="align-middle ">
                                    <a href=""
                                       className="d-flex align-items-center user text-decoration-none text-truncate bold-text">
                                        <figure
                                            className="rounded-circle overflow-hidden m-0 user__image flex-shrink-0 d-flex align-items-center justify-content-center">
                                            {/*<img className="thumbnail-image img-fluid w-100 h-100"*/}
                                            {/*alt="user pic"*/}
                                            {/*/>*/}
                                            <i className="icon-user"/>
                                        </figure>
                                        <span className="user__name text-truncate">
                                             {'Steve Rogers'}
                                         </span>
                                    </a></td>
                                <td className="align-middle text-truncate">+1 800 1234 567</td>
                                <td className="align-middle text-truncate">sample@sample.com</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="deal-details__footer d-flex justify-content-end">
                        <PaginationCustom/>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DealDetails