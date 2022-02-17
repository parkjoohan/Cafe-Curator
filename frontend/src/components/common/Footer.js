import { Grid, IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import React,{useEffect} from "react";
import "./css/Footer.css";
import { Row, Col } from 'react-bootstrap';

function Footer(props) {
  useEffect(()=>{
  })
  return (
      <div id="footer_container">
      <Row>
        <Col>
          <img
              src={process.env.PUBLIC_URL + "/image/java.png"}
              alt="logo"
              id="footer_logo"
            />
          <span id="footer_logo_name">Cafe Curator</span>
        </Col>
        <Col>
          <div id="footer_logo_description">
            자신의 관심사에 맞는 카페에서 커피와 디저트를 즐기세요
          </div>
        </Col>
            
      </Row>
        <hr id="footer_hr" />
          <div md={12} sm={12} id="footer_social">
            <hr id="footer_social_hr" />
            <div id="footer_social_tags">
              <IconButton>
                <FacebookIcon id="footer_social_tags_color" />
              </IconButton>
              <IconButton>
                <LinkedInIcon id="footer_social_tags_color" />
              </IconButton>
              <IconButton>
                <TwitterIcon id="footer_social_tags_color" />
              </IconButton>
              <IconButton>
                <GitHubIcon id="footer_social_tags_color" />
              </IconButton>
            </div>
            <div id="footer_social_copyrights">
              © 2022 King Q-Lab. All Rights Reserved.
            </div>
          </div>
        </div>
  );
}

export default Footer;