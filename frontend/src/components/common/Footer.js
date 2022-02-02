import { Grid, IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import React,{useEffect} from "react";
import "./css/Footer.css";

function Footer(props) {
  useEffect(()=>{
    console.log(props)
  })
  return (
        <Grid container id="footer_container">
          <Grid container md={4} sm={12} alignItems="center" id="footer_center">
            <img
              src={process.env.PUBLIC_URL + "/image/java.png"}
              alt="logo"
              id="footer_logo"
            />
            <span id="footer_logo_name">Cafe Curator</span>
            <div id="footer_logo_description">
              자신의 관심사에 맞는 카페에서<br />
              커피와 디저트를 즐기세요
            </div>
            <hr id="footer_hr" />
          </Grid>

          <Grid container md sm={12}>
            <Grid id="footer_col" xs={12} sm md>
              <div id="footer_col_title">Products</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Pricing
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Teams
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Education
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Refer a friend
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Updates
                </a>
              </div>
            </Grid>
            <Grid id="footer_col" xs={12} sm md>
              <div id="footer_col_title">Features</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Overview
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Design
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Code
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Collaborate
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Sletch Plugin
                </a>
              </div>
            </Grid>
          </Grid>
          <Grid container md sm={12}>
            <Grid id="footer_col" xs={12} sm md>
              <div id="footer_col_title">Get Started</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Tutorials
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Resources
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Guides
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Examples
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Docs
                </a>
              </div>
            </Grid>
            <Grid id="footer_col" xs={12} sm md>
              <div id="footer_col_title">About</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Stories
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Community
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Blog
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Careers
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" id="footer_col_links">
                  Brand Assets
                </a>
              </div>
            </Grid>
          </Grid>
          <Grid md={12} sm={12} id="footer_social">
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
          </Grid>
        </Grid>
  );
}

export default Footer;