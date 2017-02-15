import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontIcon from 'material-ui/FontIcon';

import * as Actions from '../actions';

const iconStyle = {
  fontSize: 18,
  margin: 6,
  left: -6,
  top: 14,
  position: 'absolute',
};

const headerStyle = {
  position: 'relative',
  cursor: 'pointer',
};

const sortingHeaderstyle = {
  fontWeight: 500,
  color: '#222',
  cursor: 'pointer',
};

const rowStyle = {
  userSelect: 'none',
};

const ListHeaderRow = ({ list, actions }) => {
  const titleCase = (input) => {
    let title = input.replace(/_/, ' ');
    title = title.replace(/\b[a-z](?=[a-z]{2})/g,
      letter => letter.toUpperCase());
    return title;
  };

  const handleOnClickHeader = (header) => {
      if (header === list.sorting) {
        actions.reverse();
      } else {
        actions.sort(header);
      }
  };

  return (
    <tr style={rowStyle}>
      <th />
      {list.details.map(header =>
        <th
          key={header}
          onClick={() => handleOnClickHeader(header)}
          style={header === list.sorting ? sortingHeaderstyle : headerStyle}
        >
          {header === list.sorting &&
            <FontIcon className="material-icons" style={iconStyle}>
              { list.reversed ? 'arrow_downward' : 'arrow_upward' }
            </FontIcon>
          }
          {titleCase(header)}
        </th>,
      )}
    </tr>
  );
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListHeaderRow);
