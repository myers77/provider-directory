import React from 'react';

const headerStyle = {
  margin: 36,
  fontSize: 48,
  textAlign: 'center',
  color: 'rgba(0,0,0,0.87)',
  display: 'inline-block',
  height: 102,
  letterSpacing: 1.5,
};

const versionStyle = {
  position: 'relative',
  fontSize: 24,
  width: '2em',
  backgroundColor: '#fff',
  paddingLeft: 12,
  paddingRight: 12,
  margin: 'auto',
  letterSpacing: 2,
  top: -26,
};

const hrStyle = {
  marginTop: 24,
  marginBottom: 12,
  border: 0,
  height: 1,
  backgroundImage: `linear-gradient(to right, 
                    rgba(0, 0, 0, 0),
                    rgba(0, 0, 0, 0.87),
                    rgba(0, 0, 0, 0))`,
};

const Header = () =>
  <div style={headerStyle}>
    <div>Provider Directory</div>
    <hr style={hrStyle} />
    <div style={versionStyle}>2.0</div>
  </div>;

export default Header;
