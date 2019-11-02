import React from 'react'

export default function AppFooter() {
    return (
        <div style={{ width: '100%', bottom: '0', position: 'fixed', alignItems: 'Center' }}>
       &copy; Copyright {new Date().getFullYear().toString()} Clinical Management System 
        </div>
    )
}
