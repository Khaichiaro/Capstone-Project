import './NavBar.css';
import logo from '../../assets/logo.svg';
import profileIcon from '../../assets/profile1.svg';  // ใช้ภาพ emoji หน้าคน
import bellIcon from '../../assets/bell.svg';        // ใช้ภาพ emoji กระดิ่ง

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="navbar-center">
        <div className="nav-link-container">
            <a href="/" className="nav-link">หน้าหลัก</a>
        </div>
        <div className="nav-link-container">
            <a href="#" className="nav-link">บันทึกการกินอาหาร</a>
        </div>
        <div className="nav-link-container">
            <a href="#" className="nav-link">แนะนำการกินอาหาร</a>
        </div>
        <div className="nav-link-container">
            <a href="#" className="nav-link">จัดตารางออกกำลังกาย</a>
        </div>
      </div>

      <div className="navbar-right">
        <img src={profileIcon} alt="Profile" className="icon profile" />
        <img src={bellIcon} alt="Notification" className="icon bell" />
      </div>
    </nav>
  );
}

export default NavBar;
