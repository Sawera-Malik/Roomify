import { NavLink } from 'react-router-dom'
import { IoHomeSharp } from 'react-icons/io5'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useState } from 'react'
import ThemeSwitcher from '../ThemeSwitcher'
import { googleLogout } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { clearSession } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const links = [
    { label: 'Home', to: '/home' },
    { label: 'Explore', to: '/explore' },
    { label: 'Design Studio', to: '/design-studio' },
    { label: 'Inspirations', to: '/inspirations' },
  ]
  const closeMobileMenu = () => setMobileMenuOpen(false)
  const { user } = useAuth()
  const authenticated = Boolean(user)
  const logOut = () => {
    googleLogout()
    clearSession()
    setMobileMenuOpen(false)
    navigate('/signin')
  }
  return (
    <header className="navbar">
      <NavLink className="brand" to="/home" onClick={closeMobileMenu}>
        <IoHomeSharp className="brand-icon" aria-hidden="true" />
        <span>Roomify</span><b>.</b>
      </NavLink>
      <nav className="navbar-links" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink key={link.to} className="navbar-link" to={link.to}>{link.label}</NavLink>
        ))}
      </nav>
      <div className="navbar-actions">
        <ThemeSwitcher />
        {authenticated ? (
          <button className="navbar-link settings-link navbar-action-button" type="button" onClick={logOut}>Sign Out</button>
        ) : (
          <NavLink className="navbar-link settings-link" to="/signin">Sign In</NavLink>
        )}
      </div>
      <button
        onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
        className="mobile-menu-toggle"
        aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        {mobileMenuOpen ? <HiX aria-hidden="true" /> : <HiMenuAlt3 aria-hidden="true" />}
      </button>
      {mobileMenuOpen && (
        <>
          <div id="mobile-navigation" className="mobile-navigation">
            {links.map((link) => (
              <NavLink key={link.to} className="mobile-nav-link" to={link.to} onClick={closeMobileMenu}>{link.label}</NavLink>
            ))}
            <div className="mobile-navigation-footer">
              <ThemeSwitcher />
              {authenticated ? (
                <button className="mobile-sign-in mobile-action-button" type="button" onClick={logOut}>Sign Out</button>
              ) : (
                <NavLink className="mobile-sign-in" to="/signin" onClick={closeMobileMenu}>Sign In</NavLink>
              )}
            </div>
          </div>
        </>
      )}

    </header>

  )
}

export default Navbar