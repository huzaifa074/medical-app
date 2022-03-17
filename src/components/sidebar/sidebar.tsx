import React from 'react';
import BrandLogo from '../brand-logo/brand-logo';
import MainMenu from '../main-menu/main-menu';

import styles from './sidebar.module.scss';

/* eslint-disable-next-line */
export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <div className={`${styles.sidebar}`}>
      <BrandLogo />
      <MainMenu />
    </div>
  );
}

export default Sidebar;
