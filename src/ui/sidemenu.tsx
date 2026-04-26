interface SideMenuProps {
  handleCallback: (menu: string) => void
}

const menuList = ['stat', 'outfit', 'inventory', 'shops', 'schedule']

const SideMenu = ({ handleCallback }: SideMenuProps) => {
  return (
    <div style={{ backgroundColor: 'lightblue', display: 'flex', flexDirection: 'column' }}>
      {menuList.map((menu) => (
        <div key={menu}>
          <button type="button" onClick={() => handleCallback(menu)}>
            {menu}
          </button>
        </div>
      ))}
    </div>
  )
}

export default SideMenu
