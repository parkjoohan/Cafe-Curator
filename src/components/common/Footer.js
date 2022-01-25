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
        <Grid container className="footer__container">
          <Grid container md={4} sm={12} alignItems="center" className="center">
            <img
              src={process.env.PUBLIC_URL + "/image/java.png"}
              alt="logo"
              className="logo"
            />
            <span className="logo__name">Cafe Curator</span>
            <div className="logo__description">
              자신의 관심사에 맞는 카페에서<br />
              커피와 디저트를 즐기세요
            </div>
            <hr className="hr" />
          </Grid>

          <Grid container md sm={12}>
            <Grid className="col" xs={12} sm md>
              <div className="col__title">Products</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Pricing
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Teams
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Education
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Refer a friend
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Updates
                </a>
              </div>
            </Grid>
            <Grid className="col" xs={12} sm md>
              <div className="col__title">Features</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Overview
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Design
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Code
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Collaborate
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Sletch Plugin
                </a>
              </div>
            </Grid>
          </Grid>
          <Grid container md sm={12}>
            <Grid className="col" xs={12} sm md>
              <div className="col__title">Get Started</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Tutorials
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Resources
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Guides
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Examples
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Docs
                </a>
              </div>
            </Grid>
            <Grid className="col" xs={12} sm md>
              <div className="col__title">About</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Stories
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Community
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Blog
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Careers
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <a href="www.google.com" className="col__links">
                  Brand Assets
                </a>
              </div>
            </Grid>
          </Grid>
          <Grid md={12} sm={12} className="social">
            <hr className="social__hr" />
            <div className="social__tags">
              <IconButton>
                <FacebookIcon className="social__tags__color" />
              </IconButton>
              <IconButton>
                <LinkedInIcon className="social__tags__color" />
              </IconButton>
              <IconButton>
                <TwitterIcon className="social__tags__color" />
              </IconButton>
              <IconButton>
                <GitHubIcon className="social__tags__color" />
              </IconButton>
            </div>
            <div className="social__copyrights">
              © 2022 King Q-Lab. All Rights Reserved.
            </div>
          </Grid>
        </Grid>
  );
}

export default Footer;

// import React from "react";
// import "./css/Footer.css";
// import Button from "react-bootstrap/Button";
// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <div className="footer-container">
//       <section className="footer-subscription">
//         <p className="footer-subscription-heading">
//           카페 큐레이터에 오신걸 환영합니다
//         </p>
//         <p className="footer-subscription-text">
//           관심사에 맞게 카페를 찾아보세요!
//         </p>
//       </section>
//       <div class="footer-links">
//         <div className="footer-link-wrapper">
//           <div class="footer-link-items">
//             <h2>About Us</h2>
//             <Link to="/">사이트 기능</Link>
//             <Link to="/">사이트 목적</Link>
//           </div>
//           <div class="footer-link-items">
//             <h2>Contact Us</h2>
//             <Link to="/">Contact</Link>
//             <Link to="/">Support</Link>
//           </div>
//         </div>
//         <div className="footer-link-wrapper">
//           <div class="footer-link-items">
//             <h2>Nothing</h2>
//             <Link to="/">Nothing</Link>
//             <Link to="/">Nothing</Link>
//           </div>
//           <div class="footer-link-items">
//             <h2>Social Media</h2>
//             <Link to="/">Instagram</Link>
//             <Link to="/">Facebook</Link>
//             <Link to="/">Youtube</Link>
//             <Link to="/">Twitter</Link>
//           </div>
//         </div>
//       </div>
//       <section class="social-media">
//         <div class="social-media-wrap">
//           <div class="footer-logo">
//             <Link to="/" className="social-logo">
//               King Q-Lab
//               <i class="fab fa-typo3" />
//             </Link>
//           </div>
//           <small class="website-rights">KingQ-Lab © 2022</small>
//           <div class="social-icons">
//             <Link
//               class="social-icon-link facebook"
//               to="/"
//               target="_blank"
//               aria-label="Facebook"
//             >
//               <i class="fab fa-facebook-f" />
//             </Link>
//             <Link
//               class="social-icon-link instagram"
//               to="/"
//               target="_blank"
//               aria-label="Instagram"
//             >
//               <i class="fab fa-instagram" />
//             </Link>
//             <Link
//               class="social-icon-link youtube"
//               to="/"
//               target="_blank"
//               aria-label="Youtube"
//             >
//               <i class="fab fa-youtube" />
//             </Link>
//             <Link
//               class="social-icon-link twitter"
//               to="/"
//               target="_blank"
//               aria-label="Twitter"
//             >
//               <i class="fab fa-twitter" />
//             </Link>
//             <Link
//               class="social-icon-link twitter"
//               to="/"
//               target="_blank"
//               aria-label="LinkedIn"
//             >
//               <i class="fab fa-linkedin" />
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Footer;
