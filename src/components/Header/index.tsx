import { signOut } from '@firebase/auth'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { auth } from '../../firebase'
import { useAppSelector } from '../../redux/store'
import device from '../../styles/mediaQueries'
import Button from '../Button'
import ThemeSwitcher from '../ThemeSwitcher'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'

const { sm } = device

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.9375rem; // 15px
  user-select: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.brand};
`

const Brand = styled.div`
  font-size: 1.75rem;
  color: ${(props) => props.theme.colors.brand};
  font-weight: 600;

  display: flex;
  flex-direction: row;
  gap: 0.5ch;

  @media only screen and (${sm}) {
    flex-direction: column;
    gap: 0;
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
`

const Hamburger = styled.div<{
  active: boolean
}>`
  @media only screen and (${sm}) {
    display: flex;
  }

  display: none;
  position: relative;

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    cursor: pointer;

    svg {
      font-size: 1.5rem; // 24px
    }
  }

  .menu {
    position: absolute;
    right: 0;
    bottom: -0.625rem;
    transform: translateY(100%);
    display: ${(props) => (props.active ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    gap: 1em;
    padding: 1em;
    background-color: ${(props) => props.theme.colors.bg};
    border: 2px solid ${(props) => props.theme.colors.text};
    border-radius: 5px;
  }
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: center;
  @media only screen and (${sm}) {
    display: none;
  }
`

interface Props {
  toggleTheme: () => void
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const [hamburgerActive, sethamburgerActive] = useState(false)

  const { user } = useAppSelector((state) => state.auth)

  const onLogoutClick = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Do you want to logout?',
      showCancelButton: true,
      icon: 'question',
    })

    if (isConfirmed) {
      await signOut(auth)
    }
  }

  const location = useLocation()

  return (
    <HeaderContainer>
      <Section>
        <Brand>
          <span>Words to</span> <span>Memorize</span>
        </Brand>

        {user ? (
          location.pathname.includes('exam') ? (
            <Link to={'/'}>
              <Button btnWidth="xs" btnColor="outlineBrand">
                View List
              </Button>
            </Link>
          ) : (
            <Link to={'/exam'}>
              <Button btnWidth="xs" btnColor="outlineBrand">
                Take an Exam
              </Button>
            </Link>
          )
        ) : null}
      </Section>
      <Section>
        {user && (
          <>
            <UserInfo>
              {user.displayName}
              <Button
                type="button"
                btnWidth="xs"
                btnColor="red"
                onClick={async () => await onLogoutClick()}
              >
                Logout
              </Button>
            </UserInfo>
            <Hamburger active={hamburgerActive}>
              <div
                className="button"
                onClick={() => sethamburgerActive(!hamburgerActive)}
              >
                <GiHamburgerMenu />
              </div>
              <div className="menu">
                {user.displayName}
                <Button
                  type="button"
                  btnWidth="xs"
                  btnColor="red"
                  onClick={async () => await onLogoutClick()}
                >
                  Logout
                </Button>
              </div>
            </Hamburger>
          </>
        )}
        <ThemeSwitcher toggleTheme={() => toggleTheme()} />
      </Section>
    </HeaderContainer>
  )
}

export default Header
