import { Form, Button } from "react-bootstrap";
import './css/Email.css'

const EmailForm = () => {
  
  return (
      <Form>
        <div id="navcolor">
          <br></br>
          <br></br>
        </div>
        <br></br>
        <br></br>
        <h4 id="EmailMarginLeft">이메일 인증</h4>
        <p id="EmailMarginLeft"> 이메일로 발송된 코드를 입력하세요.</p>
        <Form.Group>
          
          <input
          id ="EmailMarginLeft"
          className="input"
          type="email"
          name="email"
          placeholder="이메일을 입력하세요.."
          />
        <br></br>
        <br></br>
        <a id ="EmailMarginLeft"> 이메일이 발송되기까지 시간이 다소 소요될 수 있습니다.</a>
        <p id ="EmailMarginLeft"> 이메일이 오지 않았다면 <a href="#">재요청</a> 버튼을 눌러주세요.</p>
        <br></br>
        <br></br>
        <br></br>
        <br></br> 
        </Form.Group>
        
        {/* <Form.Group>
          <Form.Control
            type="text"
            placeholder="text"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="password"
            required
          />
        </Form.Group> */}
      </Form>
  )
}
export default EmailForm;