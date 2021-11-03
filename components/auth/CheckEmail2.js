import classes from "./CheckEmail2.module.scss";
import Slack from "../images/slack";

function CheckEmail2() {
  return (
    <section className={classes.container}>
      <Slack />
      <h2>Check your email!</h2>
      <p className={classes.p1}>
        To login password-free, tap the button in the email we sent
        <br />
        Wrong email address? Please <a>re-enter email address</a>
      </p>
    </section>
  );
}
export default CheckEmail2;
