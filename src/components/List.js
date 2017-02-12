import React from 'react';
import { connect } from 'react-redux';

const List = ({ data }) =>
  <div>
    {data.map((d, index) =>
      <div key={index}>{d.last_name}, {d.first_name}</div>
    )}
  </div>

const mapStateToProps = state => ({
  ...state,
});

export default connect(
  mapStateToProps,
)(List);
