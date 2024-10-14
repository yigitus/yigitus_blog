import styles from "./Footer.module.css";
import { AiFillMail, AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <h3>Contact</h3>
        <div>
          <div className={styles.mail}>
            <AiFillMail />
            <a href="mailto: yigitszengin@gmail.com">yigitszengin@gmail.com</a>
          </div>
          <div className={styles.socials}>
            <a href="https://github.com/yigitus/">
              <AiFillGithub />
            </a>

            <a href="https://www.linkedin.com/in/yi%C4%9Fit-sefa-zengin-b96443237/">
              <AiFillLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.popular_tags}>
        <h3>Popular Tags</h3>
        <a href="">Tag1</a>
        <a href="">Tag2</a>
        <a href="">Tag3</a>
        <a href="">Tag4</a>
        <a href="">Tag5</a>
        <a href="">Tag6</a>
      </div>
      <div className={styles.quick_links}>
        <h3>Quick Links</h3>
        <a href="">Home</a>
        <a href="">All Posts</a>
        <a href="">Contact</a>
        <a href="">Popular Posts</a>
      </div>
    </footer>
  );
}
