import React from 'react';
import moment from 'moment';
import { Menu, Dropdown, Button, Icon, DatePicker } from 'antd';

import styles from './styles.css';

function ViewReportsFilter(props) {
  const { filters, clients, onFilter, onResetFilters } = props;

  return (
    <div className={styles.viewReportsFilter}>
      <div className={styles.timePeriodFilter}>
        <div className={styles.title}>SELECT TIME PERIOD</div>
        <DatePicker.RangePicker
          allowClear={false}
          onChange={([to, from]) => onFilter({ key: 'timePeriod', value: [moment(from).format('MM/DD/YYYY'), moment(to).format('MM/DD/YYYY')] })}
          format={'MM/DD/YYYY'}
        />
      </div>

      <div className={styles.clientsFilter}>
        <div className={styles.title}>FILTERS</div>
        <div className={styles.filters}>
          {
            (Object.entries(filters).length)
            ? <Button onClick={() => onResetFilters()}>All</Button>
            : <Button onClick={() => onResetFilters()} type="primary">All</Button>
          }

          <Dropdown
            overlay={
              <Menu onClick={({ item }) => onFilter({ key: 'customer', value: item.props.children })}>
                {
                  clients.map((client, index) => {
                    return <Menu.Item disabled={filters.customer ? filters.customer.includes(client.accountName) : false} key={index}>{client.accountName}</Menu.Item>;
                  })
                }
              </Menu>
            }
          >
            <Button style={{ marginLeft: 8 }} type={filters.customer && filters.customer.length ? 'primary' : 'default'}>
              {filters.customer && filters.customer.length ? filters.customer[0] : 'Client'} <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
      </div>

    </div>
  );
}

ViewReportsFilter.propTypes = {};

export default ViewReportsFilter;
