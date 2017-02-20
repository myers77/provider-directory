import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import classNames from 'classnames';
import FontIcon from 'material-ui/FontIcon';

import * as Actions from '../actions';

const iconStyle = {
  fontSize: 18,
  margin: 6,
  left: -6,
  top: 16,
  position: 'absolute',
};

const headerStyle = {
  position: 'relative',
  cursor: 'pointer',
};

const sortingHeaderstyle = {
  fontWeight: 600,
  color: '#222',
  cursor: 'pointer',
};

const rowStyle = {
  userSelect: 'none',
};

const buttonStyle = {
  position: 'absolute',
  color: '#9e9e9e',
  top: 0,
  left: 0,
  background: 'none',
  border: 'none',
  outline: 0,
  padding: 24,
  height: '100%',
  content: '',
  cursor: 'pointer',
};

const checkboxColStyle = {
  width: '12%',
};

const ListHeaderRow = ({ list, actions }) => {
  // const newIconClass = classNames({
  //   'material-icons': true,
  //   enabledIcon: !isEmpty(list.selectedEntries),
  //   disabledIcon: isEmpty(list.selectedEntries),
  // });

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
      <th
        style={checkboxColStyle}
      />
      {list.details.map(header =>
        <th
          key={header}
          style={header === list.sorting ? sortingHeaderstyle : headerStyle}
        >
          {header === list.sorting &&
            <FontIcon
              className="material-icons"
              style={iconStyle}
            >
              { list.reversed ? 'arrow_downward' : 'arrow_upward' }
            </FontIcon>
          }
          <button
            style={{ ...buttonStyle, ...header === list.sorting ? sortingHeaderstyle : null }}
            onClick={() => handleOnClickHeader(header)}
          >
            {titleCase(header)}
          </button>
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
