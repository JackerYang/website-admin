/**
 * @desc 按需引入ant-design-vue组件
 */

import {
  Row,
  Col,
  LocaleProvider,
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Tree,
  Input,
  Button,
  Table,
  Pagination,
  Select,
  Modal,
  TreeSelect,
  Message,
  Card,
  Upload,
  DatePicker,
  Tabs,
  Checkbox,
  Tag,
  Spin,
  Form,
  Avatar,
  Tooltip,
  Dropdown,
  InputNumber,
  Notification
} from "ant-design-vue";

const antd = {
  install: Vue => {
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);
    Vue.component(LocaleProvider.name, LocaleProvider);
    Vue.component(Layout.name, Layout);
    Vue.component(Layout.Header.name, Layout.Header);
    Vue.component(Layout.Sider.name, Layout.Sider);
    Vue.component(Layout.Content.name, Layout.Content);
    Vue.component(Menu.name, Menu);
    Vue.component(Menu.Item.name, Menu.Item);
    Vue.component(Menu.SubMenu.name, Menu.SubMenu);
    Vue.component(Icon.name, Icon);
    Vue.component(Breadcrumb.name, Breadcrumb);
    Vue.component(Breadcrumb.Item.name, Breadcrumb.Item);
    Vue.component(Tree.name, Tree);
    Vue.component(Input.name, Input);
    Vue.component(Input.Search.name, Input.Search);
    Vue.component(Input.TextArea.name, Input.TextArea);
    Vue.component(Button.name, Button);
    Vue.component(Button.Group.name, Button.Group)
    Vue.component(Table.name, Table);
    Vue.component(Pagination.name, Pagination);
    Vue.component(Select.name, Select);
    Vue.component(Select.Option.name, Select.Option);
    Vue.component(Modal.name, Modal);
    Vue.prototype.$confirm = Modal.confirm;
    Vue.prototype.$info = Modal.info;
    Vue.component(TreeSelect.name, TreeSelect);
    Vue.prototype.$Message = Message;
    Vue.component(Card.name, Card);
    Vue.component(Upload.name, Upload);
    Vue.component(DatePicker.name, DatePicker);
    Vue.component(DatePicker.RangePicker.name, DatePicker.RangePicker);
    Vue.component(Tabs.name, Tabs);
    Vue.component(Tabs.TabPane.name, Tabs.TabPane);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(Checkbox.Group.name, Checkbox.Group);
    Vue.component(Tag.name, Tag);
    Vue.component(Spin.name, Spin);
    Vue.component(Form.name, Form);
    Vue.component(Form.Item.name, Form.Item);
    Vue.component(Avatar.name, Avatar);
    Vue.component(Tooltip.name, Tooltip);
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(InputNumber.name, InputNumber);
    Vue.prototype.$notification = Notification
  }
};

export default antd;
