// App.js

import React, { useState } from 'react';
import {
  Layout,
  Menu,
  ConfigProvider,
  theme,
  Button,
  Drawer,
  Radio,
  ColorPicker,
  Divider,
  Space,
  Card,
  Statistic
} from 'antd';
import {
  SettingOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

// The Customizer Component (lives inside a Drawer)
const ThemeCustomizer = ({ open, onClose, themeConfig, setThemeConfig }:any) => {
  const handleThemeModeChange = (e:any) => {
    const newMode = e.target.value;
    setThemeConfig((prevConfig:any) => ({
      ...prevConfig,
      algorithm: newMode === 'dark' ? darkAlgorithm : defaultAlgorithm,
    }));
  };

  const handlePrimaryColorChange = (color:any) => {
    setThemeConfig((prevConfig:any) => ({
      ...prevConfig,
      token: { ...prevConfig.token, colorPrimary: color.toHexString() },
    }));
  };

  return (
    <Drawer
      title="Theme Customizer"
      onClose={onClose}
      open={open}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <b>Theme Mode</b>
        <Radio.Group
          value={themeConfig.algorithm === darkAlgorithm ? 'dark' : 'light'}
          onChange={handleThemeModeChange}
        >
          <Radio value="light">Light</Radio>
          <Radio value="dark">Dark</Radio>
        </Radio.Group>

        <Divider />

        <b>Primary Colors</b>
        <ColorPicker
          showText
          value={themeConfig.token.colorPrimary}
          onChangeComplete={handlePrimaryColorChange}
        />
      </Space>
    </Drawer>
  );
};


// Main App Component
const App = () => {
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [themeConfig, setThemeConfig] = useState({
    token: {
      colorPrimary: '#1677ff', // Default primary color
    },
    algorithm: defaultAlgorithm, // Default to light theme
  });

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible>
          <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)' }} />
          <Menu
            theme={themeConfig.algorithm === darkAlgorithm ? 'dark' : 'light'}
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              { key: '1', icon: <BarChartOutlined />, label: 'Sales' },
              { key: '2', icon: <VideoCameraOutlined />, label: 'CRM Analytics' },
              { key: '3', icon: <ShoppingCartOutlined />, label: 'Orders' },
              { key: '4', icon: <UserOutlined />, label: 'Customers' },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: '0 16px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
             <Button
                type="primary"
                icon={<SettingOutlined />}
                onClick={() => setCustomizerOpen(true)}
              >
                Customize
              </Button>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
             {/* Example Content */}
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Space direction="horizontal" size="large">
                    <Card>
                        <Statistic title="Sales" value={6500} />
                    </Card>
                    <Card>
                        <Statistic title="Customers" value={12000} />
                    </Card>
                    <Card>
                        <Statistic title="Products" value={47000} />
                    </Card>
                </Space>
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
            </Space>
          </Content>
        </Layout>
      </Layout>
      <ThemeCustomizer
        open={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        themeConfig={themeConfig}
        setThemeConfig={setThemeConfig}
      />
    </ConfigProvider>
  );
};

export default App;

