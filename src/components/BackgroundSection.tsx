import backgroundImage from "../assets/backgroundImage.jpg";

const BackgroundSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="flex-1 bg-cover bg-center flex justify-center items-start pt-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 60%),
          url(${backgroundImage})
        `,
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundSection;
