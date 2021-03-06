import React, { Component } from 'react';
import moment from 'moment';
import { Menu, Dropdown, Button, Icon, DatePicker, Tag, Row } from 'antd';

import { getSeverityValue } from './../../utils/data';

import Typography from './../Typography';

import styles from './styles.css';

const { H4 } = Typography;

class Filter extends Component {
  constructor() {
    super();

    this.state = {
      isDatePickerOpen: false,
    };
  }

  render() {
    const {
      filters,
      clients,
      engineers,
      leads,
      vendors,
      products,
      onFilterCases,
      onResetFilters,
      onRemoveFilter,
      onSelectVendor,
    } = this.props;

    return (
      <div className={styles.filter}>
        <div className={styles.row}>
          <div className={styles.title}>
            <H4>Filter</H4>
          </div>
          <span className={styles.verticalLine} />

          {
            (Object.entries(filters).length)
            ? <Button onClick={() => onResetFilters()}>All</Button>
            : <Button onClick={() => onResetFilters()} type="primary">All</Button>
          }

          <Dropdown
            overlay={
              <Menu onClick={({ item }) => onFilterCases({ key: 'customer', value: item.props.children })}>
                {
                  clients.map((client, index) => {
                    return <Menu.Item disabled={filters.customer ? filters.customer.includes(client.accountName) : false} key={index}>{client.accountName}</Menu.Item>;
                  })
                }
              </Menu>
            }
          >
            <Button style={{ marginLeft: 8 }} type={filters.customer && filters.customer.length ? 'primary' : 'default'}>
              Client <Icon type="down" />
            </Button>
          </Dropdown>

          <Dropdown
            overlay={
              <Menu onClick={({ item }) => onFilterCases({ key: 'case_status', value: item.props.children })}>
                <Menu.Item disabled={filters.case_status ? filters.case_status.includes('Ongoing') : false} key="Ongoing">Ongoing</Menu.Item>
                <Menu.Item disabled={filters.case_status ? filters.case_status.includes('Resolved') : false} key="Resolved">Resolved</Menu.Item>
                <Menu.Item disabled={filters.case_status ? filters.case_status.includes('Pending (Client)') : false} key="Pending (Client)">Pending (Client)</Menu.Item>
                <Menu.Item disabled={filters.case_status ? filters.case_status.includes('Pending (Glo-cal)') : false} key="Pending (Glo-cal)">Pending (Glo-cal)</Menu.Item>
              </Menu>
            }
          >
            <Button style={{ marginLeft: 8 }} type={filters.case_status && filters.case_status.length ? 'primary' : 'default'}>
              Status <Icon type="down" />
            </Button>
          </Dropdown>

          <Dropdown
            overlay={
              <Menu onClick={({ item }) => onFilterCases({ key: 'assignedSystemsEngineer', value: `{${item.props.children}}` })}>
                {
                  engineers.map((engineer, index) => {
                    return <Menu.Item disabled={filters.assignedSystemsEngineer ? filters.assignedSystemsEngineer.includes(`{${engineer.fullName}}`) : false} key={index}>{engineer.fullName}</Menu.Item>;
                  })
                }
              </Menu>
            }
          >
            <Button style={{ marginLeft: 8 }} type={filters.assignedSystemsEngineer && filters.assignedSystemsEngineer.length ? 'primary' : 'default'}>
              Assigned SE <Icon type="down" />
            </Button>
          </Dropdown>

          <Dropdown
            overlay={
              <Menu onClick={({ item }) => onFilterCases({ key: 'systemsEngineerLead', value: item.props.children })}>
                {
                  leads.map((lead, index) => {
                    return <Menu.Item disabled={filters.systemsEngineerLead ? filters.systemsEngineerLead.includes(lead.systemsEngineerLead) : false} key={index}>{lead.systemsEngineerLead}</Menu.Item>;
                  })
                }
              </Menu>
            }
          >
            <Button style={{ marginLeft: 8 }} type={filters.systemsEngineerLead && filters.systemsEngineerLead.length ? 'primary' : 'default'}>
              SE Lead <Icon type="down" />
            </Button>
          </Dropdown>

          <Dropdown
            overlay={
              <Menu onClick={({ item }) => onFilterCases({ key: 'severity', value: item.props.eventKey })}>
                <Menu.Item disabled={filters.severity ? filters.severity.includes('1') : false} key={1}>1 - Emergency</Menu.Item>
                <Menu.Item disabled={filters.severity ? filters.severity.includes('2') : false} key={2}>2 - Critical</Menu.Item>
                <Menu.Item disabled={filters.severity ? filters.severity.includes('3') : false} key={3}>3 - Major</Menu.Item>
                <Menu.Item disabled={filters.severity ? filters.severity.includes('4') : false} key={4}>4 - Minor</Menu.Item>
              </Menu>
            }
          >
            <Button style={{ marginLeft: 8 }} type={filters.severity && filters.severity.length ? 'primary' : 'default'}>
              Severity <Icon type="down" />
            </Button>
          </Dropdown>

          <Dropdown
            overlay={
              <Menu
                onClick={({ item }) => {
                  onSelectVendor(item.props.children);
                  onFilterCases({ key: 'vendor', value: item.props.children });
                }}
              >
                {
                  vendors.map((vendor, index) => {
                    return <Menu.Item disabled={filters.vendor ? filters.vendor.includes(vendor.principal) : false} key={index}>{vendor.principal}</Menu.Item>;
                  })
                }
              </Menu>
            }
          >
            <Button style={{ marginLeft: 8 }} type={filters.vendor && filters.vendor.length ? 'primary' : 'default'}>
              Vendor <Icon type="down" />
            </Button>
          </Dropdown>

          <Dropdown
            overlay={
              <Menu onClick={({ item }) => onFilterCases({ key: 'productName', value: item.props.children })}>
                {
                  products.map((product, index) => {
                    return <Menu.Item disabled={filters.productName ? filters.productName.includes(product.productName) : false} key={index}>{product.productName}</Menu.Item>;
                  })
                }
              </Menu>
            }
          >
            <Button style={{ marginLeft: 8 }} type={filters.productName && filters.productName.length ? 'primary' : 'default'}>
              Product <Icon type="down" />
            </Button>
          </Dropdown>

          <Dropdown
            onVisibleChange={(isVisible) => this.setState({ isDatePickerOpen: isVisible }) }
            visible={this.state.isDatePickerOpen}
            overlay={
              <div>
                <If condition={this.state.isDatePickerOpen}>
                  <div>
                    <DatePicker.RangePicker
                      open
                      allowClear={false}
                      onChange={([to, from]) => onFilterCases({ key: 'dateRaised', value: [moment(from).format('MM/DD/YYYY'), moment(to).format('MM/DD/YYYY')] })}
                      onOpenChange={(isVisible) => this.setState({ isDatePickerOpen: isVisible })}
                      format={'MM/DD/YYYY'}
                    />
                  </div>
                </If>
              </div>
            }
          >
            <Button style={{ marginLeft: 8 }} type={filters.dateRaised && filters.dateRaised.length ? 'primary' : 'default'}>
              Date Raised <Icon type="down" />
            </Button>
          </Dropdown>
        </div>

        <div className={styles.row}>
          <For each="entry" of={Object.entries(filters)} index="i">
            <If condition={filters[entry[0]] && filters[entry[0]].length}>
              <For each="item" of={filters[entry[0]]} index="i">
                <Tag
                  key={item}
                  closable
                  onClose={() => onRemoveFilter({ key: entry[0], value: item })}
                >
                  <Choose>
                    <When condition={entry[0] === 'assignedSystemsEngineer'}>
                      <span>{item.replace(/[{()}]/g, '')}</span>
                    </When>
                    <When condition={entry[0] === 'severity'}>
                      <span>{getSeverityValue(item)}</span>
                    </When>
                    <When condition={entry[0] === 'dateRaised'}>
                      <span>{item[0]} - {item[1]}</span>
                    </When>
                    <Otherwise>
                      <span>{item}</span>
                    </Otherwise>
                  </Choose>
                </Tag>
              </For>
            </If>
          </For>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {};

export default Filter;
