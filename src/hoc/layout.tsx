import React from 'react';
import { Container } from "react-bootstrap";
import { Sidebar, TopBar } from "../components";

export interface LayoutProps {
    children: any
 }

export function Layout({children}: LayoutProps) {
    return (
        <div>
            <Sidebar />
            <Container fluid className="content-wrapper">
                <TopBar />
                {children}
            </Container>
        </div>
    );
}