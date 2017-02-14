import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TableHeaderColumn, TableRow } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';

import * as Actions from '../actions';

const iconStyle = {
  fontSize: 18,
  margin: 6,
};

const sortingHeader = {
  fontWeight: 500,
  color: '#222',
};

const ListHeaderRow = ({ ...otherProps, list, actions }) => {
  const titleCase = (input) => {
    input = input.replace(/_/, ' ');
    input = input.replace(/\b[a-z](?=[a-z]{2})/g,
      letter => letter.toUpperCase());
    return input;
  };

  const handleOnClickHeader = (e, rowIndex, colIndex) => {
    if (colIndex > 0) {
      if (list.details[colIndex - 1] === list.sorting) {
        actions.reverse();
      } else {
        actions.sort(list.details[colIndex - 1]);
      }
    }
  };

  return (
    <TableRow onCellClick={handleOnClickHeader} {...otherProps}>
      {otherProps.children[0] /* checkbox passed down from Table-Header */}
      {list.details.map(header =>
        <TableHeaderColumn
          key={header}
          style={header === list.sorting ? sortingHeader : null}
        >
        { header === list.sorting &&
          <FontIcon className="material-icons" style={iconStyle}>
            { list.reversed ? 'arrow_downward' : 'arrow_upward' }
          </FontIcon>
        }
          {titleCase(header)}
        </TableHeaderColumn>
      )}
    </TableRow>
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
