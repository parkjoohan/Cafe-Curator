import React,{useState,useEffect} from 'react';
import './css/Account.css';
import Search from './Search';
import axios from 'axios'

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
    return (
        <div>
            <Search setKeyword={setKeyword}/>
            {
                data.map((account,index)=>(
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <hr/>
                        {
                            account.picture?
                            <img src={account.picture}></img>:
                            <img id ="fix_profile_pic" src={process.env.PUBLIC_URL + "/image/map.png"}></img>
                        }
                        <p>{account.userId}</p>
                        <p>팔로워{account.followerCount}</p>
                        <p>팔로잉{account.followingCount}</p>
                        <hr/>
                    </div>
                ))
            }
        </div>
    );
}
