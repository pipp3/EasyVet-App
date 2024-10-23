import bgdog from "../../public/bg-dog.webp";

export default function Layout({ children }) {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-opacity-80"
      style={{ backgroundImage: `url(${bgdog})` }}
    >
      <div className="absolute inset-0  bg-opacity-50"></div> {/* Color de superposición de fondo */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
