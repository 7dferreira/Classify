import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, Link } from 'react-router-dom';

function SideBar() {
  return (
    <div style={{ display: 'flex', overflow: 'scroll initial', minHeight:'80vh'}}>
      <CDBSidebar textColor="#fff" backgroundColor="#000d6b">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
         <h2>Geral</h2>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
          <Link to="/UserProfile" >
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </Link >
            <Link to="/fav" >
              <CDBSidebarMenuItem icon="heart">Favoritos</CDBSidebarMenuItem>
            </Link >
           
            <Link to="/ListInvoice" >
              <CDBSidebarMenuItem icon="chart-line">Faturas</CDBSidebarMenuItem>
            </Link >
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
              <Link to="/home">
              <CDBSidebarMenuItem  icon="sign-out-alt" >Sair</CDBSidebarMenuItem>
            </Link >
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default  SideBar;