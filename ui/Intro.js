import React from 'react';
import { connect } from 'react-fela';
import Search from './Search';
import logoImg from '../images/logo-white.png';
import bg from '../images/mic_bg.jpg';

const Intro = ({ dispatch, styles }) => {
  return (
    <div className={styles.intro}>
      <div className={styles.bgOverlay} />
      <div className={styles.banner}>
        <h1 className={styles.bannerTitle}>
          <img className={styles.logo} src={logoImg} alt="iHeartRadio" />
        </h1>
        <Search dispatch={dispatch} />
      </div>
    </div>
  );
};

const intro = props => ({
  backgroundColor: '#000',
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  color: '#fff',
  height: 300,
  position: 'relative',
});

const bgOverlay = props => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  backgroundColor: 'rgba(0,0,0,.5)',
});

const banner = props => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  textAlign: 'center',
});

const bannerTitle = props => ({
  margin: 0,
  padding: 10,
  paddingTop: 100,
  fontWeight: 500,
  fontSize: '4em',
  lineHeight: '1em',
});

const bannerDesc = props => ({
  padding: 0,
  color: 'rgba(255, 255, 255, .9)',
  fontSize: '1.75em',
  fontWeight: 300,
  margin: 0,
});

const logo = props => ({
  maxWidth: '100%',
});

const mapStylesToProps = props => renderer => ({
  intro: renderer.renderRule(intro),
  bgOverlay: renderer.renderRule(bgOverlay),
  banner: renderer.renderRule(banner),
  bannerTitle: renderer.renderRule(bannerTitle),
  bannerDesc: renderer.renderRule(bannerDesc),
  logo: renderer.renderRule(logo),
});

export default connect(mapStylesToProps)(Intro);
