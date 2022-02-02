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
      <div id="navcolor"></div>
      <Modal.Header>
        <h2 id="Terms_Margin_Underline">약관</h2>
      </Modal.Header>

      <Modal.Body id = "Terms_ModalPadding">
        <p id="Terms_Margin_Content">이 편지는 영국에서 시작되어 아프리카 까지 이어지는
          타잔의 모험을 담은 편지입니다.
          다음내용이 궁금하시더라도 스포일러 때문에 알려드릴
          수 없는 점을 숙지하고 계신것으로 간주합니다.</p>
        <p id="Terms_Margin_Footer"><a id="Terms_QlabUnderline">(주) 킹큐랩</a>이 약관한 동의서에 동의 하였으므로
        위 약관을 숙지 하고 있음을 명시합니다.</p>
      </Modal.Body>
      <Modal.Footer style={{ height: "50px", alignContent: "center" }}>
      <Button id="Terms_NoBgButton" onClick={onHide}>닫기</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TermsModal
