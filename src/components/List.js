import React from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';

const DirList = ({ data }) =>
  <List>
    {data.map((d, index) =>
      <ListItem
        key={d.email_address}
        primaryText={`${d.last_name}, ${d.first_name}`}
      >
      </ListItem>
    )}
  </List>

const mapStateToProps = state => ({
  ...state,
});

export default connect(
  mapStateToProps,
)(DirList);
