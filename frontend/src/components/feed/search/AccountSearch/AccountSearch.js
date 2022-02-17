import React,{useState,useEffect} from 'react';
import './css/Account.css';
import Search from './Search';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Switch,Route } from '@mui/material';
import UserProfile from '../../../user/UserProfile';
export default function AccountSearch() {
    const [keyword,setKeyword] = useState("")
    const [data,setData] = useState([])
    useEffect(()=>{
        setData([])
        if (keyword.length==0){
            console.log('아직 입력 안함.')
        }else if(keyword.length<1){
            alert('4글자 이상 입력하세요!')
        }else{
            const url = `http://i6c104.p.ssafy.io:8080/search/${keyword}`
            axios.get(url).then(res=>{
                setData(res.data);
                console.log(res.data)
            })
        }
    },[keyword])

    const onClick = (e)=>{
        document.location.href=`/profile/${e}`
    }
    return (
        <div>
            <Search setKeyword={setKeyword}/>
            {
                data.map((account,index)=>(
                    <div className='accountslist' onClick={()=>onClick(account.userId)}>
                        <div className='imagebox'>
                            <div className='box'>
                                {
                                    account.picture?
                                    <img className="account_image" src={account.picture}></img>:
                                    <img className="account_image" id ="fix_profile_pic" src={process.env.PUBLIC_URL + "/image/map.png"}></img>
                                }
                            </div>
                        </div>
                        <p className='account_userId'>{account.userId}</p>
                        <span className='account_follow'>팔로워{account.followerCount}</span>
                        <span className='account_follow'>팔로잉{account.followingCount}</span>
                        <hr/>
                    </div>
                ))
            }
        </div>
    );
}