import './layout.css';

const MiniLayout = ({ children }: { children: any }) => {
  return (
    <div className="mini__container">
      <div className="mini__section1" />
      <div className="mini__section2">{children}</div>
    </div>
  );
};

export default MiniLayout;
