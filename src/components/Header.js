import React from 'react';

const headerStyle = {
  margin: 32,
  fontSize: 48,
  textAlign: 'center',
  color: 'rgba(0,0,0,0.87)',
};

const mediumFontWeight = {
  letterSpacing: 1,
};

const Header = () => (
  <div style={headerStyle}>
    <div style={mediumFontWeight}>Provider Directory</div>
  </div>
);

export default Header;
