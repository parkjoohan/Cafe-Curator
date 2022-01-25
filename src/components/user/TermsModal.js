import { buildQueries } from '@testing-library/react';
import React from 'react';
import  { Modal, Button } from 'react-bootstrap';
import './css/Terms.css'

const TermsModal = ( {show, onHide}) => {
  return (
    <Modal
      show = {show}
      onHide = {onHide}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-w"
      centered
    >
      
       
      
      <Modal.Body id = "ModalPadding">
      <div id="navcolor">
          <Button id="NoBgExitTerms" variant="secondary" onClick={onHide}>←뒤로가기</Button>
          <br></br>
        </div>
        <br></br>
       
        <h2 id="TermsMarginUnderline">약관</h2>
        <br></br>
        <br></br>
        <p id="TermsMarginX">이 편지는 영국에서 시작되어 아프리카 까지 이어지는
          타잔의 모험을 담은 편지입니다.
          다음내용이 궁금하시더라도 스포일러 때문에 알려드릴
          수 없는 점을 숙지하고 계신것으로 간주합니다.</p>
        <br></br>
        <br></br>
        <p id="TermsMarginX">하나. 둘 셋 넷 다섯 여섯 일곱 여덟</p>
        <p id="TermsMarginX">둘. 둘 셋 넷 다섯 여섯 일곱 여덟</p>
        <br></br>
        <p id="TermsMarginX"><a id="QlabUnderline">(주) 킹큐랩</a>이 약관한 동의서에 동의 하였으므로
        위 약관을 숙지 하고 있음을 명시합니다.</p>
      </Modal.Body>
      
    </Modal>
  )
}

export default TermsModal
