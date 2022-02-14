import React,{useState,useEffect} from 'react'
import {TextField} from '@material-ui/core';

export default function Search(props) {

  const [keyword,setKeyword] = useState("")

  const onChange = e => {
    setKeyword(e.target.value)
  }

  const search = e => {
    // console.log(e)
    if(e._reactName=="onKeyDown"){
      if(e.key=="Enter"){
        // console.log(e)
        props.setKeyword(e.target.value)
      }
    }
  }

  return (
    <div>
      <TextField label="계정" placeholder='ID를 입력하세요.' onChange={e => onChange(e)} onKeyDown={e=>search(e)}></TextField>
    </div>
  )
}
