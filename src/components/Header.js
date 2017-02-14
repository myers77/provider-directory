import React from 'react';

const headerStyle = {
  margin: 32,
  fontSize: 48,
  textAlign: 'center',
  color: 'rgba(0,0,0,0.87)',
};

const subheaderStyle = {
  fontSize: 24,
  backgroundColor: '#fff',
  position: 'relative',
  margin: 'auto',
  height: 24,
  width: '40%',
};

const white = {
  backgroundColor: '#fff',
  paddingLeft: 12,
  paddingRight: 12,
  position: 'absolute',
  top: -14,
};

const hrStyle = {
  border: 0,
  height: 1,
  position: 'relative',
  backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.87), rgba(0, 0, 0, 0))',
};

const mediumFontWeight = {
  letterSpacing: 1,
};

const Header = () =>
  <div style={headerStyle}>
    <div style={mediumFontWeight}>Provider Directory</div>
    <div style={subheaderStyle}><hr style={hrStyle} /><span style={white}>2.0</span></div>
  </div>;

export default Header;
