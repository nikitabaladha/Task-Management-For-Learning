const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; {currentYear} Task Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
