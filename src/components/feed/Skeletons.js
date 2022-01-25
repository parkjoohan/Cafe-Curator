import "./css/SkeletonPrint.css";
import React from "react";
import Skeleton from "./Skeleton";
import  { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';

const Skeletons = props => {
    return (
        <div>
            <h1>게시글</h1>
            {props.isLoading
                ? new Array(10).fill(1).map((_, i) => {
                    return <Skeleton key={i} />;
            })
            : props.data.map(item => {
                return (
                    <li key={item.id} className="item">
                        <Col xs={14} md={10}>
                            <img className="img" src={item.avatar} alt="" />
                            <p>
                                <strong>{item.first_name} {item.last_name}</strong>
                            </p>
                            <p>{item.email}</p>
                        </Col>
                        <Col xs={7} md={5}>
                            <div className="info">
                                <img src='image/coffeecong.jpg'/>
                            </div>
                        </Col>
                    </li>
                );
            })}
        </div>
    );
};

export default Skeletons;