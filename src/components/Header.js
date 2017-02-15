import React from 'react';

const headerStyle = {
  margin: 32,
  fontSize: 48,
  textAlign: 'center',
  color: 'rgba(0,0,0,0.87)',
  display: 'inline-block',
  height: 102,
  letterSpacing: 1.5,
};

const subheaderStyle = {
  backgroundColor: '#fff',
  margin: 'auto',
  height: 24,
  width: '40%',
};

const white = {
  position: 'relative',
  fontSize: 24,
  backgroundColor: '#fff',
  paddingLeft: 12,
  paddingRight: 12,
  margin: 'auto',
  top: -62,
};

const hrStyle = {
  border: 0,
  height: 1,
  position: 'relative',
  backgroundImage: `linear-gradient(to right, 
                    rgba(0, 0, 0, 0),
                    rgba(0, 0, 0, 0.87),
                    rgba(0, 0, 0, 0))`,
};

const mediumFontWeight = {
  letterSpacing: 1,
};

const Header = () =>
  <div style={headerStyle}>
    <div style={mediumFontWeight}>Provider Directory</div>
    <hr style={hrStyle} />
    <span style={white}>2.0</span>
  </div>;

export default Header;
